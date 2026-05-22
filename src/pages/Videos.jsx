import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const heroVideos = [
  {
    src: '/Videos/Adebayor - Teaser.mp4',
    title: 'Adebayor - Teaser',
  },
  {
    src: '/Videos/Asante Kente - Aaron Ashitey.mp4',
    title: 'Asante Kente - Aaron Ashitey',
  },
  {
    src: '/Videos/Keke @ 40 60fps.mp4',
    title: 'Keke',
  },
  {
    src: '/Videos/Prince & Susana 2024.mp4',
    title: 'Prince & Susana 2024',
  },
]

const videoCards = [
  {
    src: '/Videos/Adebayor - Teaser.mp4',
    category: 'Film',
    title: 'Adebayor - Teaser',
    description: 'Description here',
  },
  {
    src: '/Videos/Asante Kente - Aaron Ashitey.mp4',
    category: 'Film',
    title: 'Asante Kente - Aaron Ashitey',
    description: 'Description here',
  },
  {
    src: '/Videos/Keke @ 40 60fps.mp4',
    category: 'Film',
    title: 'Keke',
    description: 'Description here',
  },
  {
    src: '/Videos/Prince & Susana 2024.mp4',
    category: 'Film',
    title: 'Prince & Susana 2024',
    description: 'Description here',
  },
]

function Videos() {
  const [heroVideoNumber, setHeroVideoNumber] = useState(0)

  const [searchText, setSearchText] = useState('')
  const [category, setCategory] = useState('all')
  const [sortType, setSortType] = useState('default')
  const [displayMode, setDisplayMode] = useState('carousel')

  const [viewerOpen, setViewerOpen] = useState(false)
  const [videoNumber, setVideoNumber] = useState(0)
  const [viewerAutoPlay, setViewerAutoPlay] = useState(false)

  const [sliderIndex, setSliderIndex] = useState(0)
  const [sliderAutoPlay, setSliderAutoPlay] = useState(false)

  const [carouselDragging, setCarouselDragging] = useState(false)
  const [autoScroll, setAutoScroll] = useState(false)

  const heroVideoRefs = useRef([])
  const viewerVideoRef = useRef(null)

  const carouselRef = useRef(null)
  const autoScrollFrame = useRef(null)
  const sliderTimer = useRef(null)

  const isDragging = useRef(false)
  const didDrag = useRef(false)
  const clickedVideo = useRef(null)

  const dragStartX = useRef(0)
  const dragStartScroll = useRef(0)

  const stopAutoScroll = () => {
    if (autoScrollFrame.current) {
      cancelAnimationFrame(autoScrollFrame.current)
      autoScrollFrame.current = null
    }
  }

  const stopSliderAutoPlay = () => {
    if (sliderTimer.current) {
      clearInterval(sliderTimer.current)
      sliderTimer.current = null
    }

    setSliderAutoPlay(false)
  }

  const stopViewerAutoPlay = () => {
    setViewerAutoPlay(false)

    if (viewerVideoRef.current) {
      viewerVideoRef.current.pause()
    }
  }

  const filteredVideos = useMemo(() => {
    const typed = searchText.toLowerCase().trim()
    let list = [...videoCards]

    if (sortType === 'az') {
      list.sort((first, second) => {
        return first.title.toLowerCase().localeCompare(second.title.toLowerCase())
      })
    }

    return list.filter((video) => {
      const words = `${video.category} ${video.title} ${video.description}`.toLowerCase()
      const videoCategory = video.category.toLowerCase()

      const matchesSearch = words.includes(typed)
      const matchesCategory = category === 'all' || videoCategory === category

      return matchesSearch && matchesCategory
    })
  }, [searchText, category, sortType])

  const videosShowing = filteredVideos.length > 0 ? filteredVideos : videoCards
  const currentVideo = videosShowing[videoNumber] || videosShowing[0]
  const sliderVideo = filteredVideos[sliderIndex] || filteredVideos[0]

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroVideoNumber((current) => {
        if (current + 1 >= heroVideos.length) {
          return 0
        }

        return current + 1
      })
    }, 2500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    heroVideoRefs.current.forEach((video, index) => {
      if (!video) {
        return
      }

      video.pause()
      video.currentTime = 0
      video.muted = true
      video.volume = 0

      if (index === heroVideoNumber) {
        const playAttempt = video.play()

        if (playAttempt) {
          playAttempt.catch(() => {})
        }
      }
    })
  }, [heroVideoNumber])

  useEffect(() => {
    return () => {
      stopAutoScroll()
      stopSliderAutoPlay()
      stopViewerAutoPlay()
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (videoNumber >= videosShowing.length) {
      setVideoNumber(0)
    }
  }, [videoNumber, videosShowing.length])

  useEffect(() => {
    if (sliderIndex >= filteredVideos.length) {
      setSliderIndex(0)
    }
  }, [sliderIndex, filteredVideos.length])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!viewerOpen || viewerAutoPlay) {
        return
      }

      if (event.key === 'Escape') {
        closeViewer()
      }

      if (event.key === 'ArrowLeft') {
        showPreviousVideo()
      }

      if (event.key === 'ArrowRight') {
        showNextVideo()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  useEffect(() => {
    if (!autoScroll) {
      stopAutoScroll()
      return
    }

    let lastTime = performance.now()
    const scrollSpeed = 110

    const moveCarousel = (currentTime) => {
      const carousel = carouselRef.current

      if (carousel) {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth
        const timePassed = currentTime - lastTime
        const moveAmount = (scrollSpeed * timePassed) / 1000

        lastTime = currentTime

        if (maxScroll > 0) {
          if (carousel.scrollLeft >= maxScroll - 2) {
            carousel.scrollLeft = 0
          } else {
            carousel.scrollLeft += moveAmount
          }
        }
      }

      autoScrollFrame.current = requestAnimationFrame(moveCarousel)
    }

    autoScrollFrame.current = requestAnimationFrame(moveCarousel)

    return () => {
      stopAutoScroll()
    }
  }, [autoScroll, filteredVideos.length])

  useEffect(() => {
    if (!sliderAutoPlay || displayMode !== 'slider') {
      if (sliderTimer.current) {
        clearInterval(sliderTimer.current)
        sliderTimer.current = null
      }

      return
    }

    sliderTimer.current = setInterval(() => {
      setSliderIndex((current) => {
        if (filteredVideos.length === 0) {
          return 0
        }

        if (current + 1 >= filteredVideos.length) {
          return 0
        }

        return current + 1
      })
    }, 2500)

    return () => {
      if (sliderTimer.current) {
        clearInterval(sliderTimer.current)
        sliderTimer.current = null
      }
    }
  }, [sliderAutoPlay, displayMode, filteredVideos.length])

  useEffect(() => {
    if (!viewerVideoRef.current || !viewerOpen || !currentVideo) {
      return
    }

    viewerVideoRef.current.load()

    if (viewerAutoPlay) {
      const playAttempt = viewerVideoRef.current.play()

      if (playAttempt) {
        playAttempt.catch(() => {})
      }
    }
  }, [currentVideo, viewerOpen, viewerAutoPlay])

  const openViewer = (video) => {
    setAutoScroll(false)
    stopSliderAutoPlay()
    stopViewerAutoPlay()

    const selectedIndex = videosShowing.indexOf(video)

    if (selectedIndex >= 0) {
      setVideoNumber(selectedIndex)
    } else {
      setVideoNumber(0)
    }

    setViewerOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeViewer = () => {
    if (viewerAutoPlay) {
      return
    }

    stopViewerAutoPlay()

    if (viewerVideoRef.current) {
      viewerVideoRef.current.pause()
    }

    setViewerOpen(false)
    document.body.style.overflow = ''
  }

  const showPreviousVideo = () => {
    if (viewerAutoPlay) {
      return
    }

    setVideoNumber((current) => {
      if (current - 1 < 0) {
        return videosShowing.length - 1
      }

      return current - 1
    })
  }

  const showNextVideo = () => {
    if (viewerAutoPlay) {
      return
    }

    setVideoNumber((current) => {
      if (current + 1 >= videosShowing.length) {
        return 0
      }

      return current + 1
    })
  }

  const showNextVideoAuto = () => {
    setVideoNumber((current) => {
      if (current + 1 >= videosShowing.length) {
        return 0
      }

      return current + 1
    })
  }

  const showPreviousSliderVideo = () => {
    if (sliderAutoPlay || filteredVideos.length === 0) {
      return
    }

    setSliderIndex((current) => {
      if (current - 1 < 0) {
        return filteredVideos.length - 1
      }

      return current - 1
    })
  }

  const showNextSliderVideo = () => {
    if (sliderAutoPlay || filteredVideos.length === 0) {
      return
    }

    setSliderIndex((current) => {
      if (current + 1 >= filteredVideos.length) {
        return 0
      }

      return current + 1
    })
  }

  const startVideoDrag = (event) => {
    if (autoScroll || displayMode !== 'carousel' || !carouselRef.current) {
      return
    }

    isDragging.current = true
    didDrag.current = false
    dragStartX.current = event.clientX
    dragStartScroll.current = carouselRef.current.scrollLeft
    setCarouselDragging(true)
  }

  const moveVideoDrag = (event) => {
    if (autoScroll || !isDragging.current || !carouselRef.current) {
      return
    }

    const distance = event.clientX - dragStartX.current

    if (Math.abs(distance) > 8) {
      didDrag.current = true
    }

    carouselRef.current.scrollLeft = dragStartScroll.current - distance
  }

  const endVideoDrag = () => {
    if (autoScroll || !isDragging.current) {
      return
    }

    isDragging.current = false
    setCarouselDragging(false)

    if (!didDrag.current && clickedVideo.current) {
      openViewer(clickedVideo.current)
    }

    clickedVideo.current = null
    didDrag.current = false
  }

  const toggleAutoScroll = () => {
    isDragging.current = false
    didDrag.current = false
    clickedVideo.current = null
    setCarouselDragging(false)

    setAutoScroll((current) => !current)
  }

  const changeDisplayMode = (mode) => {
    setAutoScroll(false)
    stopSliderAutoPlay()
    stopViewerAutoPlay()

    isDragging.current = false
    didDrag.current = false
    clickedVideo.current = null

    setCarouselDragging(false)
    setDisplayMode(mode)
  }

  const chooseHeroDisplayMode = (mode) => {
    changeDisplayMode(mode)

    setTimeout(() => {
      document.getElementById('media')?.scrollIntoView({
        behavior: 'smooth',
      })
    }, 100)
  }

  const toggleSliderAutoPlay = () => {
    setSliderAutoPlay((current) => !current)
  }

  const toggleViewerAutoPlay = () => {
    setViewerAutoPlay((current) => !current)
  }

  const handlePreviewPlay = (event) => {
    if (autoScroll || sliderAutoPlay) {
      return
    }

    const preview = event.currentTarget.querySelector('video')

    if (preview) {
      preview.muted = true
      preview.volume = 0

      const playAttempt = preview.play()

      if (playAttempt) {
        playAttempt.catch(() => {})
      }
    }
  }

  const handlePreviewStop = (event) => {
    const preview = event.currentTarget.querySelector('video')

    if (preview) {
      preview.pause()
      preview.currentTime = 0
    }
  }

  return (
    <div className="app videos-page">
      <Navbar />

      <section className="hero" id="videos">
        <div className="video-hero-slideshow">
          {heroVideos.map((video, index) => (
            <video
              key={video.src}
              ref={(element) => {
                heroVideoRefs.current[index] = element
              }}
              className={`video-hero-slide ${heroVideoNumber === index ? 'active' : ''}`}
              muted
              playsInline
              preload="metadata"
            >
              <source src={video.src} type="video/mp4" />
            </video>
          ))}
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="hero-tag">Wylb Perspective</span>

          <h1 className="hero-title">
            Videos That <br />
            Tell the Story
          </h1>

          <p className="hero-subtitle">
            Watch creative videos, visual projects, and media work produced through Wylb Perspective Studios.
          </p>

          <div className="hero-buttons">
            <button
              type="button"
              className={`hero-btn-primary photo-hero-view-button ${displayMode === 'carousel' ? 'photo-hero-view-button--active' : ''}`}
              onClick={() => chooseHeroDisplayMode('carousel')}
            >
              Carousel View
            </button>

            <button
              type="button"
              className={`hero-btn-primary photo-hero-view-button ${displayMode === 'grid' ? 'photo-hero-view-button--active' : ''}`}
              onClick={() => chooseHeroDisplayMode('grid')}
            >
              Grid View
            </button>

            <button
              type="button"
              className={`hero-btn-primary photo-hero-view-button ${displayMode === 'slider' ? 'photo-hero-view-button--active' : ''}`}
              onClick={() => chooseHeroDisplayMode('slider')}
            >
              Slider Gallery
            </button>
          </div>
        </div>
      </section>

      <section className="media-grid-section" id="media">
        <h2 className="section-title">Videos</h2>

        <div className="video-controls">
          <input
            type="text"
            className="video-search"
            placeholder="Search videos..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <select
            className="video-filter"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="all">Show All</option>
            <option value="film">Film</option>
          </select>

          <select
            className="video-filter"
            value={sortType}
            onChange={(event) => setSortType(event.target.value)}
          >
            <option value="default">Default Order</option>
            <option value="az">A-Z</option>
          </select>
        </div>

        {filteredVideos.length === 0 && (
          <p className="no-video-results" style={{ display: 'block' }}>
            No videos found.
          </p>
        )}

        {displayMode === 'carousel' && (
          <div className={`video-carousel-area ${autoScroll ? 'video-carousel-area--auto' : ''}`}>
            <button
              type="button"
              className={`video-carousel-autoplay-button ${autoScroll ? 'video-carousel-autoplay-button--active' : ''}`}
              onClick={toggleAutoScroll}
            >
              {autoScroll ? 'Stop Auto Play' : 'Auto Play'}
            </button>

            <div
              className={`video-carousel ${carouselDragging ? 'video-carousel--dragging' : ''} ${autoScroll ? 'video-carousel--auto' : ''}`}
              ref={carouselRef}
              onPointerDown={startVideoDrag}
              onPointerMove={moveVideoDrag}
              onPointerUp={endVideoDrag}
              onPointerLeave={endVideoDrag}
              onPointerCancel={endVideoDrag}
            >
              {filteredVideos.map((video) => (
                <div
                  className="video-carousel-card"
                  key={video.src}
                  onMouseEnter={handlePreviewPlay}
                  onMouseLeave={handlePreviewStop}
                >
                  <div
                    className="video-carousel-thumbnail"
                    onPointerDown={() => {
                      if (!autoScroll) {
                        clickedVideo.current = video
                      }
                    }}
                  >
                    <video className="video-preview" muted loop playsInline preload="metadata">
                      <source src={video.src} type="video/mp4" />
                    </video>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {displayMode === 'grid' && (
          <div className="video-grid-wall">
            {filteredVideos.map((video) => (
              <div
                className="video-grid-item"
                key={video.src}
                onMouseEnter={handlePreviewPlay}
                onMouseLeave={handlePreviewStop}
              >
                <div
                  className="video-grid-thumbnail"
                  onClick={() => openViewer(video)}
                >
                  <video className="video-preview" muted loop playsInline preload="metadata">
                    <source src={video.src} type="video/mp4" />
                  </video>
                </div>
              </div>
            ))}
          </div>
        )}

        {displayMode === 'slider' && sliderVideo && (
          <div className={`video-slider-gallery ${sliderAutoPlay ? 'video-slider-gallery--auto' : ''}`}>
            <button
              type="button"
              className="video-slider-arrow video-slider-arrow-left"
              onClick={showPreviousSliderVideo}
              disabled={sliderAutoPlay}
            >
              &#10094;
            </button>

            <div className="video-slider-main">
              <button
                type="button"
                className={`video-slider-autoplay-button ${sliderAutoPlay ? 'video-slider-autoplay-button--active' : ''}`}
                onClick={toggleSliderAutoPlay}
              >
                {sliderAutoPlay ? 'Stop Auto Play' : 'Auto Play'}
              </button>

              <div
                className="video-slider-screen-box"
                onClick={() => {
                  if (!sliderAutoPlay) {
                    openViewer(sliderVideo)
                  }
                }}
              >
                <video className="video-slider-screen" muted loop playsInline controls={!sliderAutoPlay}>
                  <source src={sliderVideo.src} type="video/mp4" />
                </video>
              </div>

              <div className="video-slider-info">
                <span>{sliderVideo.category}</span>
                <h3>{sliderVideo.title}</h3>
                <p>{sliderVideo.description}</p>
              </div>

              <div className="video-slider-thumbnails">
                {filteredVideos.map((video, index) => (
                  <button
                    type="button"
                    key={video.src}
                    className={`video-slider-thumb ${sliderIndex === index ? 'video-slider-thumb--active' : ''}`}
                    onClick={() => {
                      if (!sliderAutoPlay) {
                        setSliderIndex(index)
                      }
                    }}
                    disabled={sliderAutoPlay}
                  >
                    <video muted playsInline preload="metadata">
                      <source src={video.src} type="video/mp4" />
                    </video>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="video-slider-arrow video-slider-arrow-right"
              onClick={showNextSliderVideo}
              disabled={sliderAutoPlay}
            >
              &#10095;
            </button>
          </div>
        )}

        <section className="photo-packages-section">
          <div className="packages-header">
            <h2>Video Packages</h2>

            <p>
              Choose a video package based on the amount of coverage, editing, and final video content needed for your project.
            </p>
          </div>

          <div className="packages-wrapper">
            <div className="package-card">
              <h3>Video Package One</h3>

              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>

              <Link to="/contact" className="package-button">
                Contact us
              </Link>
            </div>

            <div className="package-card">
              <h3>Video Package Two</h3>

              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>

              <Link to="/contact" className="package-button">
                Contact us
              </Link>
            </div>

            <div className="package-card">
              <h3>Video Package Three</h3>

              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>

              <Link to="/contact" className="package-button">
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </section>

      {viewerOpen && currentVideo && (
        <div className={`video-viewer-fullscreen ${viewerAutoPlay ? 'video-viewer-fullscreen--auto' : ''}`}>
          <button
            type="button"
            className={`video-viewer-autoplay-button ${viewerAutoPlay ? 'video-viewer-autoplay-button--active' : ''}`}
            onClick={toggleViewerAutoPlay}
          >
            {viewerAutoPlay ? 'Stop Auto Play' : 'Auto Play'}
          </button>

          <video
            ref={viewerVideoRef}
            className="video-viewer-bg-screen"
            controls={!viewerAutoPlay}
            playsInline
            onEnded={() => {
              if (viewerAutoPlay) {
                showNextVideoAuto()
              }
            }}
          >
            <source src={currentVideo.src} type="video/mp4" />
          </video>

          <button
            type="button"
            className="video-viewer-back-top"
            onClick={closeViewer}
            disabled={viewerAutoPlay}
          >
            Back to Videos
          </button>

          <button
            type="button"
            className="video-viewer-side-arrow video-viewer-side-arrow-left"
            onClick={showPreviousVideo}
            disabled={viewerAutoPlay}
          >
            &#10094;
          </button>

          <button
            type="button"
            className="video-viewer-side-arrow video-viewer-side-arrow-right"
            onClick={showNextVideo}
            disabled={viewerAutoPlay}
          >
            &#10095;
          </button>

          <div className="video-viewer-bottom-info">
            <span>{currentVideo.category}</span>
            <h2>{currentVideo.title}</h2>
            <p>{currentVideo.description}</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Videos
