import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SaveButton from '../components/SaveButton'

const heroImages = [
  {
    src: '/Art/1-34.jpg',
    alt: 'Tools of art',
  },
  {
    src: '/Art/1-57.jpg',
    alt: 'Art piece in project',
  },
  {
    src: '/Art/1-83.jpg',
    alt: 'Choosing the right piece',
  },
  {
    src: '/Art/1-106.jpg',
    alt: 'Completed Art Piece',
  },
  {
    src: '/Art/IMG_9564.jpg',
    alt: 'Handy wrapped art piece',
  },
  {
    src: '/Art/IMG_9659.jpg',
    alt: 'Manmade Tree of plastic',
  },
]

const artCards = [
  {
    src: '/Art/1-34.jpg',
    alt: 'Tools of art',
    category: 'Art shop',
    title: 'Tools of art',
    description: 'A clear shot of arts most finest tools, captured with a cinematic feel.',
  },
  {
    src: '/Art/1-35.jpg',
    alt: 'Workshop of art',
    category: 'Art shop',
    title: 'Workshop of art',
    description: 'An enhanced photo of another photo, "Tools Of Art", with a more wider shot.',
  },
  {
    src: '/Art/1-38.jpg',
    alt: 'Different angle of a workshop',
    category: 'Art shop',
    title: 'Different angle of a workshop',
    description: 'A still image showing a moment from the creative process.',
  },
  {
    src: '/Art/1-57.jpg',
    alt: 'Art piece in project',
    category: 'Constructing Art',
    title: 'Art piece in project',
    description: 'A shot of Aaron showing the process of constructing a peice of art',
  },
  {
    src: '/Art/1-59.jpg',
    alt: 'A different constructing angle',
    category: 'Constructing Art',
    title: 'A different constructing angle',
    description: 'A clear shot of Aaron constructing a peice of art at a different angle',
  },
  {
    src: '/Art/1-66.jpg',
    alt: 'Relocating art piece',
    category: 'Constructing Art',
    title: 'Relocating art piece',
    description: 'A shot of Aaron moving a constructed art piece from one location to another.',
  },
  {
    src: '/Art/1-71.jpg',
    alt: 'Completing the art piece',
    category: 'Constructing Art',
    title: 'Completing the art piece',
    description: 'A shot of Aaron finishing a constructed art piece.',
  },
  {
    src: '/Art/1-83.jpg',
    alt: 'Choosing the right piece',
    category: 'Art piece',
    title: 'Choosing the right piece',
    description: 'A shot of Aaron selecting the appropriate materials for his art project.',
  },
  {
    src: '/Art/1-86.jpg',
    alt: 'Drilling the Art',
    category: 'Art piece',
    title: 'Drilling the Art',
    description: 'A shot of Aaron drilling into a constructed art piece.',
  },
  {
    src: '/Art/1-87.jpg',
    alt: 'Up close drilling shot',
    category: 'Art piece',
    title: 'Up close drilling shot',
    description: 'A close-up image of Aaron drilling into a constructed art piece.',
  },
  {
    src: '/Art/1-90.jpg',
    alt: 'Clean drilling shot',
    category: 'Art piece',
    title: 'Clean drilling shot',
    description: 'A clean full image of Aaron drilling into a constructed art piece.',
  },
  {
    src: '/Art/1-106.jpg',
    alt: 'Completed Art Piece',
    category: 'Completed Art',
    title: 'Artistic tire',
    description: 'A finished constructed tire with deep meaning.',
  },
  {
    src: '/Art/IMG_9564.jpg',
    alt: 'Handy wrapped art piece',
    category: 'Completed Art',
    title: 'Handy wrapped art piece',
    description: 'A shot of a completed art peice all wrapped up',
  },
  {
    src: '/Art/IMG_9659.jpg',
    alt: 'Manmade Tree of plastic',
    category: 'Completed Art',
    title: 'Manmade Tree of plastic',
    description: 'A shot of a completed art piece, a manmade tree made out of plastic.',
  },
]

function Art() {
  const [searchText, setSearchText] = useState('')
  const [category, setCategory] = useState('all')
  const [sortType, setSortType] = useState('default')
  const [displayMode, setDisplayMode] = useState('carousel')

  const [viewerOpen, setViewerOpen] = useState(false)
  const [imageNumber, setImageNumber] = useState(0)
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
  const clickedImage = useRef(null)

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

  const filteredCards = useMemo(() => {
    const typed = searchText.toLowerCase().trim()
    let list = [...artCards]

    if (sortType === 'az') {
      list.sort((first, second) => {
        return first.title.toLowerCase().localeCompare(second.title.toLowerCase())
      })
    }

    return list.filter((card) => {
      const words = `${card.category} ${card.title} ${card.description}`.toLowerCase()
      const cardCategory = card.category.toLowerCase()

      const matchesSearch = words.includes(typed)
      const matchesCategory = category === 'all' || cardCategory === category

      return matchesSearch && matchesCategory
    })
  }, [searchText, category, sortType])

  const visibleImages = filteredCards.length > 0 ? filteredCards : artCards
  const currentImage = visibleImages[imageNumber] || visibleImages[0]
  const sliderImage = filteredCards[sliderIndex] || filteredCards[0]

  useEffect(() => {
    return () => {
      stopAutoScroll()
      stopSliderAutoPlay()
      stopViewerAutoPlay()
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (imageNumber >= visibleImages.length) {
      setImageNumber(0)
    }
  }, [imageNumber, visibleImages.length])

  useEffect(() => {
    if (sliderIndex >= filteredCards.length) {
      setSliderIndex(0)
    }
  }, [sliderIndex, filteredCards.length])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!viewerOpen || viewerAutoPlay) {
        return
      }

      if (event.key === 'Escape') {
        closeViewer()
      }

      if (event.key === 'ArrowLeft') {
        showPreviousImage()
      }

      if (event.key === 'ArrowRight') {
        showNextImage()
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
  }, [autoScroll, filteredCards.length])

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
        if (filteredCards.length === 0) {
          return 0
        }

        if (current + 1 >= filteredCards.length) {
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
  }, [sliderAutoPlay, displayMode, filteredCards.length])

  useEffect(() => {
    if (!viewerAutoPlay || !viewerOpen) {
      if (viewerTimer.current) {
        clearInterval(viewerTimer.current)
        viewerTimer.current = null
      }

      return
    }

    viewerTimer.current = setInterval(() => {
      setImageNumber((current) => {
        if (visibleImages.length === 0) {
          return 0
        }

        if (current + 1 >= visibleImages.length) {
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
  }, [viewerAutoPlay, viewerOpen, visibleImages.length])

  const openViewer = (image) => {
    setAutoScroll(false)
    stopSliderAutoPlay()
    stopViewerAutoPlay()

    const selectedIndex = visibleImages.indexOf(image)

    if (selectedIndex >= 0) {
      setImageNumber(selectedIndex)
    } else {
      setImageNumber(0)
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

  const showPreviousImage = () => {
    if (viewerAutoPlay) {
      return
    }

    setImageNumber((current) => {
      if (current - 1 < 0) {
        return visibleImages.length - 1
      }

      return current - 1
    })
  }

  const showNextImage = () => {
    if (viewerAutoPlay) {
      return
    }

    setImageNumber((current) => {
      if (current + 1 >= visibleImages.length) {
        return 0
      }

      return current + 1
    })
  }

  const showPreviousSliderImage = () => {
    if (sliderAutoPlay || filteredCards.length === 0) {
      return
    }

    setSliderIndex((current) => {
      if (current - 1 < 0) {
        return filteredCards.length - 1
      }

      return current - 1
    })
  }

  const showNextSliderImage = () => {
    if (sliderAutoPlay || filteredCards.length === 0) {
      return
    }

    setSliderIndex((current) => {
      if (current + 1 >= filteredCards.length) {
        return 0
      }

      return current + 1
    })
  }

  const startImageDrag = (event) => {
    if (autoScroll || displayMode !== 'carousel' || !carouselRef.current) {
      return
    }

    isDragging.current = true
    didDrag.current = false
    dragStartX.current = event.clientX
    dragStartScroll.current = carouselRef.current.scrollLeft
    setCarouselDragging(true)
  }

  const moveImageDrag = (event) => {
    if (autoScroll || !isDragging.current || !carouselRef.current) {
      return
    }

    const distance = event.clientX - dragStartX.current

    if (Math.abs(distance) > 8) {
      didDrag.current = true
    }

    carouselRef.current.scrollLeft = dragStartScroll.current - distance
  }

  const endImageDrag = () => {
    if (autoScroll || !isDragging.current) {
      return
    }

    isDragging.current = false
    setCarouselDragging(false)

    if (!didDrag.current && clickedImage.current) {
      openViewer(clickedImage.current)
    }

    clickedImage.current = null
    didDrag.current = false
  }

  const toggleAutoScroll = () => {
    isDragging.current = false
    didDrag.current = false
    clickedImage.current = null
    setCarouselDragging(false)

    setAutoScroll((current) => !current)
  }

  const changeDisplayMode = (mode) => {
    setAutoScroll(false)
    stopSliderAutoPlay()
    stopViewerAutoPlay()

    isDragging.current = false
    didDrag.current = false
    clickedImage.current = null

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

      <section className="hero" id="Art">
        <div className="art-hero-scroll">
          <div className="art-hero-track">
            {[...heroImages, ...heroImages].map((image, index) => (
              <img
                key={`${image.src}-${index}`}
                src={image.src}
                alt={image.alt}
              />
            ))}
          </div>
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="hero-tag">Wylb Perspective</span>

          <h1 className="hero-title">
            Art gallery <br />
          </h1>

          <p className="hero-subtitle">
            A collecting of art shoots with the highest quality from Wyld Perspective tudios.
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
        <h2 className="section-title">Art collection</h2>

        <div className="photo-controls">
          <input
            type="text"
            className="photo-search"
            placeholder="Search images..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <select
            className="photo-filter"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="all">Show All</option>
            <option value="art shop">Art shop</option>
            <option value="constructing art">Constructing Art</option>
            <option value="art piece">Art piece</option>
            <option value="completed art">Completed Art</option>
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

        {filteredCards.length === 0 && (
          <p className="no-photo-results" style={{ display: 'block' }}>
            No images found.
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
              onPointerDown={startImageDrag}
              onPointerMove={moveImageDrag}
              onPointerUp={endImageDrag}
              onPointerLeave={endImageDrag}
              onPointerCancel={endImageDrag}
            >
              {filteredCards.map((card) => (
                <div className="media-card photo-carousel-card" key={card.src}>
                  <div
                    className="card-thumbnail"
                    onPointerDown={() => {
                      if (!autoScroll) {
                        clickedImage.current = card
                      }
                    }}
                  >
                    <img
                      src={card.src}
                      alt={card.alt}
                      draggable="false"
                    />

                    <div className="photo-name">{card.title}</div>
                  </div>

                  <div className="card-content">
                    <span className="card-category">{card.category}</span>
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-description">{card.description}</p>

                    <SaveButton item={card} type="art" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {displayMode === 'grid' && (
          <div className="media-grid">
            {filteredCards.map((card) => (
              <div className="media-card" key={card.src}>
                <div
                  className="card-thumbnail"
                  onClick={() => openViewer(card)}
                >
                  <img src={card.src} alt={card.alt} />
                  <div className="photo-name">{card.title}</div>
                </div>

                <div className="card-content">
                  <span className="card-category">{card.category}</span>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.description}</p>

                  <SaveButton item={card} type="art" />
                </div>
              </div>
            ))}
          </div>
        )}

        {displayMode === 'slider' && sliderImage && (
          <div className={`photo-slider-gallery ${sliderAutoPlay ? 'photo-slider-gallery--auto' : ''}`}>
            <button
              type="button"
              className="photo-slider-arrow photo-slider-arrow-left"
              onClick={showPreviousSliderImage}
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
                    openViewer(sliderImage)
                  }
                }}
              >
                <img src={sliderImage.src} alt={sliderImage.alt} />
              </div>

              <div className="photo-slider-info">
                <span>{sliderImage.category}</span>
                <h3>{sliderImage.title}</h3>
                <p>{sliderImage.description}</p>

                <SaveButton item={sliderImage} type="art" />
              </div>

              <div className="photo-slider-thumbnails">
                {filteredCards.map((card, index) => (
                  <button
                    type="button"
                    key={card.src}
                    className={`photo-slider-thumb ${sliderIndex === index ? 'photo-slider-thumb--active' : ''}`}
                    onClick={() => {
                      if (!sliderAutoPlay) {
                        setSliderIndex(index)
                      }
                    }}
                    disabled={sliderAutoPlay}
                  >
                    <img src={card.src} alt={card.alt} />
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="photo-slider-arrow photo-slider-arrow-right"
              onClick={showNextSliderImage}
              disabled={sliderAutoPlay}
            >
              &#10095;
            </button>
          </div>
        )}

        <section className="photo-packages-section">
          <div className="packages-header">
            <h2>Art Packages</h2>

            <p>
              Choose an art package based on the creative direction, documentation, and final visuals needed for your project.
            </p>
          </div>

          <div className="packages-wrapper">
            <div className="package-card">
              <h3>Art Package One</h3>

              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
              <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>

              <Link to="/contact" className="package-button">
                Contact us
              </Link>
            </div>

            <div className="package-card">
              <h3>Art Package Two</h3>

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
              <h3>Art Package Three</h3>

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

      {viewerOpen && currentImage && (
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
            src={currentImage.src}
            alt={currentImage.alt}
          />

          <div className="photo-viewer-dark-tint"></div>

          <button
            type="button"
            className="photo-viewer-back-top"
            onClick={closeViewer}
            disabled={viewerAutoPlay}
          >
            Back to Art
          </button>

          <button
            type="button"
            className="photo-viewer-side-arrow photo-viewer-side-arrow-left"
            onClick={showPreviousImage}
            disabled={viewerAutoPlay}
          >
            &#10094;
          </button>

          <button
            type="button"
            className="photo-viewer-side-arrow photo-viewer-side-arrow-right"
            onClick={showNextImage}
            disabled={viewerAutoPlay}
          >
            &#10095;
          </button>

          <div className="photo-viewer-bottom-info">
            <span>{currentImage.category}</span>
            <h2>{currentImage.title}</h2>
            <p>{currentImage.description}</p>

            <SaveButton item={currentImage} type="art" />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Art