import { useEffect, useMemo, useRef, useState } from 'react'

const heroImages = [
  { src: '/Art/1-34.jpg', alt: 'Tools of art' },
  { src: '/Art/1-57.jpg', alt: 'Art piece in project' },
  { src: '/Art/1-83.jpg', alt: 'Choosing the right piece' },
  { src: '/Art/1-106.jpg', alt: 'Completed Art Piece' },
  { src: '/Art/IMG_9564.jpg', alt: 'Handy wrapped art piece' },
  { src: '/Art/IMG_9659.jpg', alt: 'Manmade Tree of plastic' },
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
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const [searchText, setSearchText] = useState('')
  const [category, setCategory] = useState('all')
  const [sortType, setSortType] = useState('default')

  const [viewerOpen, setViewerOpen] = useState(false)
  const [imageNumber, setImageNumber] = useState(0)

  const [pickerOpen, setPickerOpen] = useState(false)
  const [slideshowImages, setSlideshowImages] = useState([])
  const [usingSlideshow, setUsingSlideshow] = useState(false)

  const slideshowTimer = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
      const cardType = card.category.toLowerCase()

      let matchesCategory = category === 'all'

      if (category !== 'all' && cardType === category) {
        matchesCategory = true
      }

      return words.includes(typed) && matchesCategory
    })
  }, [searchText, category, sortType])

  const visibleImages = usingSlideshow && slideshowImages.length > 0
    ? slideshowImages
    : filteredCards.length > 0
      ? filteredCards
      : artCards

  const currentImage = visibleImages[imageNumber] || visibleImages[0]

  useEffect(() => {
    if (imageNumber >= visibleImages.length) {
      setImageNumber(0)
    }
  }, [imageNumber, visibleImages.length])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!viewerOpen) {
        return
      }

      if (event.key === 'Escape') {
        closeViewer()
      } else if (event.key === 'ArrowLeft') {
        showPreviousImage()
      } else if (event.key === 'ArrowRight') {
        showNextImage()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  const clearArtTimer = () => {
    if (slideshowTimer.current) {
      clearInterval(slideshowTimer.current)
      slideshowTimer.current = null
    }
  }

  const openViewer = (card) => {
    clearArtTimer()

    setUsingSlideshow(false)
    setSlideshowImages([])

    const selectedIndex = filteredCards.indexOf(card)

    if (selectedIndex >= 0) {
      setImageNumber(selectedIndex)
    } else {
      setImageNumber(0)
    }

    setViewerOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeViewer = () => {
    clearArtTimer()

    setViewerOpen(false)
    setUsingSlideshow(false)
    setSlideshowImages([])
    document.body.style.overflow = ''
  }

  const showPreviousImage = () => {
    setImageNumber((current) => {
      if (current - 1 < 0) {
        return visibleImages.length - 1
      }

      return current - 1
    })
  }

  const showNextImage = () => {
    setImageNumber((current) => {
      if (current + 1 >= visibleImages.length) {
        return 0
      }

      return current + 1
    })
  }

  const startSlideshow = (selectedCategory) => {
    const selectedImages = artCards.filter((card) => {
      if (selectedCategory === 'all') {
        return true
      }

      return card.category.toLowerCase() === selectedCategory
    })

    if (selectedImages.length === 0) {
      setPickerOpen(false)
      return
    }

    clearArtTimer()

    setSlideshowImages(selectedImages)
    setUsingSlideshow(true)
    setImageNumber(0)
    setPickerOpen(false)
    setViewerOpen(true)

    document.body.style.overflow = 'hidden'

    slideshowTimer.current = setInterval(() => {
      setImageNumber((current) => {
        if (current + 1 >= selectedImages.length) {
          return 0
        }

        return current + 1
      })
    }, 3000)
  }

  return (
    <div className="app">
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar-logo">Wylb</div>

        <ul className="navbar-links">
          <li><a href="/#hero">Home</a></li>
          <li><a href="/contact.html">Contact</a></li>
        </ul>

        <button
          className="navbar-menu-icon"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {drawerOpen && (
          <div className="navbar-drawer">
            <div className="drawer-search-row">
              <input className="drawer-search" type="text" placeholder="Search..." />
            </div>

            <a href="/photos.html" className="drawer-item">Photos</a>
            <a href="/videos.html" className="drawer-item">Videos</a>
            <a href="/events.html" className="drawer-item">Events</a>
            <a href="/Art.html" className="drawer-item">Art</a>
            <a href="/tech.html" className="drawer-item">Tech</a>
          </div>
        )}
      </nav>

      <section className="hero" id="Art">
        <div className="art-hero-scroll">
          <div className="art-hero-track">
            {[...heroImages, ...heroImages].map((image, index) => (
              <img key={`${image.src}-${index}`} src={image.src} alt={image.alt} />
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
              className="hero-btn-primary"
              onClick={() => setPickerOpen(true)}
            >
              View Images
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
              </div>
            </div>
          ))}
        </div>
      </section>

      {pickerOpen && (
        <div className="slideshow-picker">
          <div className="slideshow-picker-box">
            <h2>Choose an art category</h2>
            <p>Pick what type of art images you want to see.</p>

            <div className="slideshow-picker-buttons">
              <button
                type="button"
                className="slideshow-choice"
                onClick={() => startSlideshow('all')}
              >
                All Images
              </button>

              <button
                type="button"
                className="slideshow-choice"
                onClick={() => startSlideshow('art shop')}
              >
                Art shop
              </button>

              <button
                type="button"
                className="slideshow-choice"
                onClick={() => startSlideshow('constructing art')}
              >
                Constructing Art
              </button>

              <button
                type="button"
                className="slideshow-choice"
                onClick={() => startSlideshow('art piece')}
              >
                Art piece
              </button>

              <button
                type="button"
                className="slideshow-choice"
                onClick={() => startSlideshow('completed art')}
              >
                Completed Art
              </button>
            </div>

            <button
              type="button"
              className="slideshow-cancel"
              onClick={() => setPickerOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {viewerOpen && currentImage && (
        <div className="photo-viewer open" aria-hidden="false">
          <div className="photo-viewer-header">
            <div>
              <span className="hero-tag">Wylb Perspective</span>
              <h2>{currentImage.title}</h2>
            </div>

            <button
              type="button"
              className="photo-viewer-button"
              onClick={closeViewer}
            >
              Back to Images
            </button>
          </div>

          <div className="photo-viewer-main">
            <button
              type="button"
              className="photo-viewer-arrow photo-viewer-arrow-left"
              onClick={showPreviousImage}
            >
              &#10094;
            </button>

            <img src={currentImage.src} alt={currentImage.alt} />

            <button
              type="button"
              className="photo-viewer-arrow photo-viewer-arrow-right"
              onClick={showNextImage}
            >
              &#10095;
            </button>
          </div>

          <div className="photo-viewer-footer">
            <p>{currentImage.description}</p>
          </div>
        </div>
      )}

      <footer className="footer" id="footer">
        <p className="footer-copy">
          © 2026 Wyld Perspective. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default Art