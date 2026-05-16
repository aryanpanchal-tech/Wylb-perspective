import { useEffect, useMemo, useRef, useState } from 'react'

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
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const [heroSlide, setHeroSlide] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [photoType, setPhotoType] = useState('all')
  const [sortType, setSortType] = useState('default')

  const [viewerOpen, setViewerOpen] = useState(false)
  const [photoNumber, setPhotoNumber] = useState(0)

  const [pickerOpen, setPickerOpen] = useState(false)
  const [slideshowPhotos, setSlideshowPhotos] = useState([])
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
      stopSlideshow()
      document.body.style.overflow = ''
    }
  }, [])

  const getCategory = (category) => {
    const fixedCategory = category.toLowerCase().trim()

    if (fixedCategory === 'senery' || fixedCategory === 'cenery') {
      return 'scenery'
    }

    return fixedCategory
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
      const category = getCategory(photo.category)

      let matchesType = photoType === 'all'

      if (photoType !== 'all' && category.includes(photoType)) {
        matchesType = true
      }

      return words.includes(typed) && matchesType
    })
  }, [searchText, photoType, sortType])

  const visiblePhotos = usingSlideshow && slideshowPhotos.length > 0
    ? slideshowPhotos
    : filteredPhotos.length > 0
      ? filteredPhotos
      : photoCards

  const currentPhoto = visiblePhotos[photoNumber] || visiblePhotos[0]

  useEffect(() => {
    if (photoNumber >= visiblePhotos.length) {
      setPhotoNumber(0)
    }
  }, [photoNumber, visiblePhotos.length])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!viewerOpen) {
        return
      }

      if (event.key === 'Escape') {
        closeViewer()
      } else if (event.key === 'ArrowLeft') {
        showPreviousPhoto()
      } else if (event.key === 'ArrowRight') {
        showNextPhoto()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  const stopSlideshow = () => {
    if (slideshowTimer.current) {
      clearInterval(slideshowTimer.current)
      slideshowTimer.current = null
    }

    setUsingSlideshow(false)
    setSlideshowPhotos([])
  }

  const openViewer = (photo) => {
    stopSlideshow()

    const selectedIndex = filteredPhotos.indexOf(photo)

    if (selectedIndex >= 0) {
      setPhotoNumber(selectedIndex)
    } else {
      setPhotoNumber(0)
    }

    setViewerOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeViewer = () => {
    stopSlideshow()

    setViewerOpen(false)
    document.body.style.overflow = ''
  }

  const showPreviousPhoto = () => {
    setPhotoNumber((current) => {
      if (current - 1 < 0) {
        return visiblePhotos.length - 1
      }

      return current - 1
    })
  }

  const showNextPhoto = () => {
    setPhotoNumber((current) => {
      if (current + 1 >= visiblePhotos.length) {
        return 0
      }

      return current + 1
    })
  }

  const startSlideshow = (selectedType) => {
    const photos = photoCards.filter((photo) => {
      const category = getCategory(photo.category)

      if (selectedType === 'all') {
        return true
      }

      return category.includes(selectedType)
    })

    if (photos.length === 0) {
      setPickerOpen(false)
      return
    }

    stopSlideshow()

    setSlideshowPhotos(photos)
    setUsingSlideshow(true)
    setPhotoNumber(0)
    setPickerOpen(false)
    setViewerOpen(true)

    document.body.style.overflow = 'hidden'

    slideshowTimer.current = setInterval(() => {
      setPhotoNumber((current) => {
        if (current + 1 >= photos.length) {
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
          <li><a href="/#featured">Featured</a></li>
          <li><a href="/#media">Media</a></li>
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
              <input
                className="drawer-search"
                type="text"
                placeholder="Search..."
                autoFocus
              />
            </div>

            <a href="/photos" className="drawer-item" onClick={() => setDrawerOpen(false)}>Photos</a>
            <a href="/videos" className="drawer-item" onClick={() => setDrawerOpen(false)}>Videos</a>
            <a href="/events" className="drawer-item" onClick={() => setDrawerOpen(false)}>Events</a>
            <a href="/art" className="drawer-item" onClick={() => setDrawerOpen(false)}>Art</a>
            <a href="/tech" className="drawer-item" onClick={() => setDrawerOpen(false)}>Tech</a>
          </div>
        )}
      </nav>

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
              className="hero-btn-primary"
              onClick={() => setPickerOpen(true)}
            >
              View Gallery
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
              </div>
            </div>
          ))}
        </div>
      </section>

      {pickerOpen && (
        <div className="slideshow-picker open">
          <div className="slideshow-picker-box">
            <h2>Choose a slideshow category</h2>
            <p>Pick what type of photos you want to see.</p>

            <div className="slideshow-picker-buttons">
              <button type="button" className="slideshow-choice" onClick={() => startSlideshow('all')}>
                All Photos
              </button>

              <button type="button" className="slideshow-choice" onClick={() => startSlideshow('scenery')}>
                Scenery
              </button>

              <button type="button" className="slideshow-choice" onClick={() => startSlideshow('person')}>
                Person
              </button>

              <button type="button" className="slideshow-choice" onClick={() => startSlideshow('animal')}>
                Animal
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

      {viewerOpen && currentPhoto && (
        <div className="photo-viewer open" aria-hidden="false">
          <div className="photo-viewer-header">
            <div>
              <span className="hero-tag">Wylb Perspective</span>
              <h2>{currentPhoto.title}</h2>
            </div>

            <button
              type="button"
              className="photo-viewer-button"
              onClick={closeViewer}
            >
              Back to Photos
            </button>
          </div>

          <div className="photo-viewer-main">
            <button
              type="button"
              className="photo-viewer-arrow photo-viewer-arrow-left"
              onClick={showPreviousPhoto}
            >
              &#10094;
            </button>

            <img src={currentPhoto.src} alt={currentPhoto.alt} />

            <button
              type="button"
              className="photo-viewer-arrow photo-viewer-arrow-right"
              onClick={showNextPhoto}
            >
              &#10095;
            </button>
          </div>

          <div className="photo-viewer-footer">
            <p>{currentPhoto.description}</p>
          </div>
        </div>
      )}

      <footer className="footer" id="footer">
        <p className="footer-copy">
          © 2026 Wylb Perspective. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default Photos