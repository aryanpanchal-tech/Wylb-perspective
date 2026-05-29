import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SaveButton from '../components/SaveButton'

const heroImages = [
  {
    src: '/Images/SuspenceinSerenity.jpg',
    alt: 'Suspence In Serenity',
  },
  {
    src: '/Images/Timeless Toronto 2.0.jpg',
    alt: 'Timeless Toronto 2.0',
  },
  {
    src: '/Images/Timeless Toronto.jpg',
    alt: 'Timeless Toronto',
  },
  {
    src: '/Images/Toronto_CN Tower.jpg',
    alt: 'Toronto CN Tower',
  },
  {
    src: "/Images/Vibrance Beneath the Lion's Gaze.jpg",
    alt: "Vibrance Beneath the Lion's Gaze",
  },
]

const photoCards = [
  {
    src: '/Images/SuspenceinSerenity.jpg',
    alt: 'Suspence In Serenity',
    category: 'scenery',
    title: 'Suspence In Serenity',
    description: 'Personal, studio, and creative portrait photography.',
  },
  {
    src: '/Images/Timeless Toronto 2.0.jpg',
    alt: 'Timeless Toronto 2.0',
    category: 'scenery',
    title: 'Timeless Toronto 2.0',
    description: 'Capturing moments from gatherings, celebrations, and live events.',
  },
  {
    src: '/Images/Timeless Toronto.jpg',
    alt: 'Timeless Toronto',
    category: 'scenery',
    title: 'Timeless Toronto',
    description: 'Stylized photos, artistic visuals, and experimental photography.',
  },
  {
    src: '/Images/Toronto_CN Tower.jpg',
    alt: 'Toronto CN Tower',
    category: 'scenery',
    title: 'Toronto CN Tower',
    description: 'Natural moments, city visuals, and real-life scenes captured through the lens.',
  },
  {
    src: "/Images/Vibrance Beneath the Lion's Gaze.jpg",
    alt: 'Golden Hour',
    category: 'scenery',
    title: "Vibrance Beneath the Lion's Gaze",
    description: 'A warm portrait-style photo focused on natural lighting and atmosphere.',
  },
  {
    src: '/Images/Family Photo.jpg',
    alt: 'City Motion',
    category: 'Person',
    title: 'Family photo',
    description: 'A photo showing a happy family moment',
  },
  {
    src: '/Images/Smiling in the sunset.jpg',
    alt: 'Smiling in the sunset',
    category: 'Person',
    title: 'Smiling in the sunset',
    description: 'A photo showing a happy individual embracing the suns warmth and light',
  },
  {
    src: '/Images/Playing in the beach.jpg',
    alt: 'Downtown Lights',
    category: 'Person',
    title: 'Playing in the beach',
    description: 'A young girl enjoying a sunny day at the beach playing in the sand',
  },
  {
    src: '/Images/Camera shot.jpg',
    alt: 'Studio Detail',
    category: 'Person',
    title: 'Camera shot',
    description: 'A clear view of 2 young boys',
  },
  {
    src: '/Images/Playing at the park.jpg',
    alt: 'Night Perspective',
    category: 'Person',
    title: 'Playing at the park',
    description: 'A child having a fun day at an indoor park',
  },
  {
    src: '/Images/Playful puppy.jpg',
    alt: 'Night Perspective',
    category: 'Animal',
    title: 'Playful puppy',
    description: 'A playful puppy engaging in a friendly game of fetch',
  },
  {
    src: '/Images/Freedom and Justice monument.png',
    alt: 'Night Perspective',
    category: 'Senery',
    title: 'Freedom and Justice monument',
    description: 'Clear shot of the freedom and justice monument',
  },
  {
    src: '/Images/Raining fish.jpg',
    alt: 'Raining fish',
    category: 'Person | Animal',
    title: 'Raining fish',
    description: 'A clear shot of a woman collecting fish from the ground',
  },
  {
    src: '/Images/Professional confidence.png',
    alt: 'Professional confidence',
    category: 'Person',
    title: 'Professional confidence',
    description: 'A photo shoot showcasing a casual and confident pose in a professional setting',
  },
  {
    src: '/Images/Family gathering.jpg',
    alt: 'Family gathering',
    category: 'Person',
    title: 'Family gathering',
    description: 'A photo showing a family getting together for a family photo',
  },
  {
    src: '/Images/IMG_3616.png',
    alt: 'Smile for the camera!',
    category: 'Person',
    title: 'Smile for the camera!',
    description: 'Smiling for a quick photo',
  },
  {
    src: '/Images/IMG_9871.jpg',
    alt: 'Brothers having fun',
    category: 'Person',
    title: 'Brothers having fun',
    description: '2 brothers spending quality time together',
  },
  {
    src: '/Images/IMG_9915.jpg',
    alt: 'Net fishing',
    category: 'Person',
    title: 'Net fishing',
    description: 'A boy playing around with a fishing net',
  },
  {
    src: '/Images/IMG_9977.jpg',
    alt: 'Preparing to fish',
    category: 'Person',
    title: 'Preparing to fish',
    description: 'A boy getting ready to go fishing with his hook and rope',
  },
  {
    src: '/Images/MZS09459.jpg',
    alt: 'Posing for Justice',
    category: 'Person',
    title: 'Posing for Justice',
    description: 'A person posing for a photo shoot in front of the justice building',
  },
  {
    src: '/Images/Dog with a blue bg.jpg',
    alt: 'Night Perspective',
    category: 'Animal',
    title: 'Dog with a blue bg',
    description: 'A dog doing a photo shoot with a blue bg',
  },
  {
    src: '/Images/MZS09877.jpg',
    alt: 'Robotic hand',
    category: 'Person',
    title: 'Robotic hand',
    description: 'A person showing off their custom robotic hand in a photo shoot',
  },
  {
    src: '/Images/MZS09656.jpg',
    alt: 'Sleeping for the camera',
    category: 'Person',
    title: 'Sleeping for the camera',
    description: 'A person sleeping for a photo shoot while lying on the grass',
  },
  {
    src: '/Images/MZS09511.jpg',
    alt: 'Embracing natures grass',
    category: 'Person',
    title: 'Embracing natures grass',
    description: "A person embracing the beauty of nature's grass",
  },
]

function Photos() {
  const [heroSlide, setHeroSlide] = useState(0)

  const [searchText, setSearchText] = useState('')
  const [photoType, setPhotoType] = useState('all')
  const [sortType, setSortType] = useState('default')
  const [displayMode, setDisplayMode] = useState('carousel')

  const [viewerOpen, setViewerOpen] = useState(false)
  const [photoNumber, setPhotoNumber] = useState(0)
  const [viewerAutoPlay, setViewerAutoPlay] = useState(false)

  const [sliderIndex, setSliderIndex] = useState(0)
  const [sliderAutoPlay, setSliderAutoPlay] = useState(false)

  const [carouselDragging, setCarouselDragging] = useState(false)
  const [autoScroll, setAutoScroll] = useState(false)

  const carouselRef = useRef(null)
  const autoScrollFrame = useRef(null)
  const sliderTimer = useRef(null)
  const viewerTimer = useRef(null)

  const isDragging = useRef(false)
  const didDrag = useRef(false)
  const clickedPhoto = useRef(null)

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
    if (viewerTimer.current) {
      clearInterval(viewerTimer.current)
      viewerTimer.current = null
    }

    setViewerAutoPlay(false)
  }

  const getFixedCategory = (category) => {
    const fixed = category.toLowerCase().trim()

    if (fixed === 'senery' || fixed === 'cenery') {
      return 'scenery'
    }

    return fixed
  }

  const filteredPhotos = useMemo(() => {
    const typed = searchText.toLowerCase().trim()
    let list = [...photoCards]

    if (sortType === 'az') {
      list.sort((first, second) => {
        return first.title.toLowerCase().localeCompare(second.title.toLowerCase())
      })
    }

    return list.filter((photo) => {
      const words = `${photo.category} ${photo.title} ${photo.description}`.toLowerCase()
      const category = getFixedCategory(photo.category)

      const matchesSearch = words.includes(typed)
      const matchesType = photoType === 'all' || category.includes(photoType)

      return matchesSearch && matchesType
    })
  }, [searchText, photoType, sortType])

  const visiblePhotos = filteredPhotos.length > 0 ? filteredPhotos : photoCards
  const currentPhoto = visiblePhotos[photoNumber] || visiblePhotos[0]
  const sliderPhoto = filteredPhotos[sliderIndex] || filteredPhotos[0]

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((current) => {
        if (current + 1 >= heroImages.length) {
          return 0
        }

        return current + 1
      })
    }, 3500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    return () => {
      stopAutoScroll()
      stopSliderAutoPlay()
      stopViewerAutoPlay()
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (photoNumber >= visiblePhotos.length) {
      setPhotoNumber(0)
    }
  }, [photoNumber, visiblePhotos.length])

  useEffect(() => {
    if (sliderIndex >= filteredPhotos.length) {
      setSliderIndex(0)
    }
  }, [sliderIndex, filteredPhotos.length])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!viewerOpen || viewerAutoPlay) {
        return
      }

      if (event.key === 'Escape') {
        closeViewer()
      }

      if (event.key === 'ArrowLeft') {
        showPreviousPhoto()
      }

      if (event.key === 'ArrowRight') {
        showNextPhoto()
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
  }, [autoScroll, filteredPhotos.length])

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
        if (filteredPhotos.length === 0) {
          return 0
        }

        if (current + 1 >= filteredPhotos.length) {
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
  }, [sliderAutoPlay, displayMode, filteredPhotos.length])

  useEffect(() => {
    if (!viewerAutoPlay || !viewerOpen) {
      if (viewerTimer.current) {
        clearInterval(viewerTimer.current)
        viewerTimer.current = null
      }

      return
    }

    viewerTimer.current = setInterval(() => {
      setPhotoNumber((current) => {
        if (visiblePhotos.length === 0) {
          return 0
        }

        if (current + 1 >= visiblePhotos.length) {
          return 0
        }

        return current + 1
      })
    }, 2500)

    return () => {
      if (viewerTimer.current) {
        clearInterval(viewerTimer.current)
        viewerTimer.current = null
      }
    }
  }, [viewerAutoPlay, viewerOpen, visiblePhotos.length])

  const openViewer = (photo) => {
    setAutoScroll(false)
    stopSliderAutoPlay()
    stopViewerAutoPlay()

    const selectedIndex = visiblePhotos.indexOf(photo)

    if (selectedIndex >= 0) {
      setPhotoNumber(selectedIndex)
    } else {
      setPhotoNumber(0)
    }

    setViewerOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeViewer = () => {
    if (viewerAutoPlay) {
      return
    }

    stopViewerAutoPlay()
    setViewerOpen(false)
    document.body.style.overflow = ''
  }

  const showPreviousPhoto = () => {
    if (viewerAutoPlay) {
      return
    }

    setPhotoNumber((current) => {
      if (current - 1 < 0) {
        return visiblePhotos.length - 1
      }

      return current - 1
    })
  }

  const showNextPhoto = () => {
    if (viewerAutoPlay) {
      return
    }

    setPhotoNumber((current) => {
      if (current + 1 >= visiblePhotos.length) {
        return 0
      }

      return current + 1
    })
  }

  const showPreviousSliderPhoto = () => {
    if (sliderAutoPlay || filteredPhotos.length === 0) {
      return
    }

    setSliderIndex((current) => {
      if (current - 1 < 0) {
        return filteredPhotos.length - 1
      }

      return current - 1
    })
  }

  const showNextSliderPhoto = () => {
    if (sliderAutoPlay || filteredPhotos.length === 0) {
      return
    }

    setSliderIndex((current) => {
      if (current + 1 >= filteredPhotos.length) {
        return 0
      }

      return current + 1
    })
  }

  const startPhotoDrag = (event) => {
    if (autoScroll || displayMode !== 'carousel' || !carouselRef.current) {
      return
    }

    isDragging.current = true
    didDrag.current = false
    dragStartX.current = event.clientX
    dragStartScroll.current = carouselRef.current.scrollLeft
    setCarouselDragging(true)
  }

  const movePhotoDrag = (event) => {
    if (autoScroll || !isDragging.current || !carouselRef.current) {
      return
    }

    const distance = event.clientX - dragStartX.current

    if (Math.abs(distance) > 8) {
      didDrag.current = true
    }

    carouselRef.current.scrollLeft = dragStartScroll.current - distance
  }

  const endPhotoDrag = () => {
    if (autoScroll || !isDragging.current) {
      return
    }

    isDragging.current = false
    setCarouselDragging(false)

    if (!didDrag.current && clickedPhoto.current) {
      openViewer(clickedPhoto.current)
    }

    clickedPhoto.current = null
    didDrag.current = false
  }

  const toggleAutoScroll = () => {
    isDragging.current = false
    didDrag.current = false
    clickedPhoto.current = null
    setCarouselDragging(false)

    setAutoScroll((current) => !current)
  }

  const changeDisplayMode = (mode) => {
    setAutoScroll(false)
    stopSliderAutoPlay()
    stopViewerAutoPlay()

    isDragging.current = false
    didDrag.current = false
    clickedPhoto.current = null

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

  return (
    <div className="app">
      <Navbar />

      <section className="hero" id="photos">
        <div className="photo-hero-slideshow">
          {heroImages.map((image, index) => (
            <img
              key={image.src}
              className={`photo-hero-slide ${heroSlide === index ? 'active' : ''}`}
              src={image.src}
              alt={image.alt}
            />
          ))}
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="hero-tag">Wylb Perspective</span>

          <h1 className="hero-title">
            Capturing Moments <br />
            Through the Lens
          </h1>

          <p className="hero-subtitle">
            Explore creative photography, visual stories, and captured moments from Wylb Perspective Studios.
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
        <h2 className="section-title">Photo Categories</h2>

        <div className="photo-controls">
          <input
            type="text"
            className="photo-search"
            placeholder="Search photos..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <select
            className="photo-filter"
            value={photoType}
            onChange={(event) => setPhotoType(event.target.value)}
          >
            <option value="all">Show All</option>
            <option value="scenery">Scenery</option>
            <option value="person">Person</option>
            <option value="animal">Animal</option>
          </select>

          <select
            className="photo-filter"
            value={sortType}
            onChange={(event) => setSortType(event.target.value)}
          >
            <option value="default">Default Order</option>
            <option value="az">A-Z</option>
          </select>
        </div>

        {filteredPhotos.length === 0 && (
          <p className="no-photo-results" style={{ display: 'block' }}>
            No photos found.
          </p>
        )}

        {displayMode === 'carousel' && (
          <div className={`photo-carousel-area ${autoScroll ? 'photo-carousel-area--auto' : ''}`}>
            <button
              type="button"
              className={`photo-carousel-autoplay-button ${autoScroll ? 'photo-carousel-autoplay-button--active' : ''}`}
              onClick={toggleAutoScroll}
            >
              {autoScroll ? 'Stop Auto Play' : 'Auto Play'}
            </button>

            <div
              className={`photo-carousel ${carouselDragging ? 'photo-carousel--dragging' : ''} ${autoScroll ? 'photo-carousel--auto' : ''}`}
              ref={carouselRef}
              onPointerDown={startPhotoDrag}
              onPointerMove={movePhotoDrag}
              onPointerUp={endPhotoDrag}
              onPointerLeave={endPhotoDrag}
              onPointerCancel={endPhotoDrag}
            >
              {filteredPhotos.map((photo) => (
                <div className="media-card photo-carousel-card" key={photo.src}>
                  <div
                    className="card-thumbnail"
                    onPointerDown={() => {
                      if (!autoScroll) {
                        clickedPhoto.current = photo
                      }
                    }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      draggable="false"
                    />

                    <div className="photo-name">{photo.title}</div>
                  </div>

                  <div className="card-content">
                    <span className="card-category">{photo.category}</span>
                    <h3 className="card-title">{photo.title}</h3>
                    <p className="card-description">{photo.description}</p>

                    <SaveButton item={photo} type="photo" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {displayMode === 'grid' && (
          <div className="media-grid">
            {filteredPhotos.map((photo) => (
              <div className="media-card" key={photo.src}>
                <div
                  className="card-thumbnail"
                  onClick={() => openViewer(photo)}
                >
                  <img src={photo.src} alt={photo.alt} />
                  <div className="photo-name">{photo.title}</div>
                </div>

                <div className="card-content">
                  <span className="card-category">{photo.category}</span>
                  <h3 className="card-title">{photo.title}</h3>
                  <p className="card-description">{photo.description}</p>

                  <SaveButton item={photo} type="photo" />
                </div>
              </div>
            ))}
          </div>
        )}

        {displayMode === 'slider' && sliderPhoto && (
          <div className={`photo-slider-gallery ${sliderAutoPlay ? 'photo-slider-gallery--auto' : ''}`}>
            <button
              type="button"
              className="photo-slider-arrow photo-slider-arrow-left"
              onClick={showPreviousSliderPhoto}
              disabled={sliderAutoPlay}
            >
              &#10094;
            </button>

            <div className="photo-slider-main">
              <button
                type="button"
                className={`photo-slider-autoplay-button ${sliderAutoPlay ? 'photo-slider-autoplay-button--active' : ''}`}
                onClick={toggleSliderAutoPlay}
              >
                {sliderAutoPlay ? 'Stop Auto Play' : 'Auto Play'}
              </button>

              <div
                className="photo-slider-image-box"
                onClick={() => {
                  if (!sliderAutoPlay) {
                    openViewer(sliderPhoto)
                  }
                }}
              >
                <img src={sliderPhoto.src} alt={sliderPhoto.alt} />
              </div>

              <div className="photo-slider-info">
                <span>{sliderPhoto.category}</span>
                <h3>{sliderPhoto.title}</h3>
                <p>{sliderPhoto.description}</p>

                <SaveButton item={sliderPhoto} type="photo" />
              </div>

              <div className="photo-slider-thumbnails">
                {filteredPhotos.map((photo, index) => (
                  <button
                    type="button"
                    key={photo.src}
                    className={`photo-slider-thumb ${sliderIndex === index ? 'photo-slider-thumb--active' : ''}`}
                    onClick={() => {
                      if (!sliderAutoPlay) {
                        setSliderIndex(index)
                      }
                    }}
                    disabled={sliderAutoPlay}
                  >
                    <img src={photo.src} alt={photo.alt} />
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="photo-slider-arrow photo-slider-arrow-right"
              onClick={showNextSliderPhoto}
              disabled={sliderAutoPlay}
            >
              &#10095;
            </button>
          </div>
        )}

        <section className="photo-packages-section">
          <div className="packages-header">
            <h2>Photo Packages</h2>

            <p>
              Choose a photo package based on the amount of coverage, editing, and final images needed for your project.
            </p>
          </div>

          <div className="packages-wrapper">
            <div className="package-card">
              <h3>Photo Package One</h3>

              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>

              <Link to="/contact" className="package-button">
                Contact us
              </Link>
            </div>

            <div className="package-card">
              <h3>Photo Package Two</h3>

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
              <h3>Photo Package Three</h3>

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

      {viewerOpen && currentPhoto && (
        <div className={`photo-viewer-fullscreen ${viewerAutoPlay ? 'photo-viewer-fullscreen--auto' : ''}`}>
          <button
            type="button"
            className={`photo-viewer-autoplay-button ${viewerAutoPlay ? 'photo-viewer-autoplay-button--active' : ''}`}
            onClick={toggleViewerAutoPlay}
          >
            {viewerAutoPlay ? 'Stop Auto Play' : 'Auto Play'}
          </button>

          <img
            className="photo-viewer-bg-image"
            src={currentPhoto.src}
            alt={currentPhoto.alt}
          />

          <div className="photo-viewer-dark-tint"></div>

          <button
            type="button"
            className="photo-viewer-back-top"
            onClick={closeViewer}
            disabled={viewerAutoPlay}
          >
            Back to Photos
          </button>

          <button
            type="button"
            className="photo-viewer-side-arrow photo-viewer-side-arrow-left"
            onClick={showPreviousPhoto}
            disabled={viewerAutoPlay}
          >
            &#10094;
          </button>

          <button
            type="button"
            className="photo-viewer-side-arrow photo-viewer-side-arrow-right"
            onClick={showNextPhoto}
            disabled={viewerAutoPlay}
          >
            &#10095;
          </button>

          <div className="photo-viewer-bottom-info">
            <span>{currentPhoto.category}</span>
            <h2>{currentPhoto.title}</h2>
            <p>{currentPhoto.description}</p>

            <SaveButton item={currentPhoto} type="photo" />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Photos