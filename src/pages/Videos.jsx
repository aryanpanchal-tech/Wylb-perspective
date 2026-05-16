import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

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
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  const [searchText, setSearchText] = useState('')
  const [sortType, setSortType] = useState('default')

  const [viewerOpen, setViewerOpen] = useState(false)
  const [videoNumber, setVideoNumber] = useState(0)
  const [playAll, setPlayAll] = useState(false)

  const [heroVideoNumber, setHeroVideoNumber] = useState(0)

  const heroVideoRefs = useRef([])
  const viewerVideoRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
      return words.includes(typed)
    })
  }, [searchText, sortType])

  const videosShowing = filteredVideos.length > 0 ? filteredVideos : videoCards
  const currentVideo = videosShowing[videoNumber] || videosShowing[0]

  useEffect(() => {
    if (videoNumber >= videosShowing.length) {
      setVideoNumber(0)
    }
  }, [videoNumber, videosShowing.length])

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
        video.play()
      }
    })
  }, [heroVideoNumber])

  useEffect(() => {
    if (!viewerVideoRef.current || !viewerOpen || !currentVideo) {
      return
    }

    viewerVideoRef.current.load()

    if (playAll) {
      viewerVideoRef.current.play()
    }
  }, [currentVideo, viewerOpen, playAll])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!viewerOpen) {
        return
      }

      if (event.key === 'Escape') {
        closeViewer()
      } else if (event.key === 'ArrowLeft') {
        showPreviousVideo()
      } else if (event.key === 'ArrowRight') {
        showNextVideo()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const openViewer = (video) => {
    const selectedIndex = videosShowing.indexOf(video)

    if (selectedIndex >= 0) {
      setVideoNumber(selectedIndex)
    } else {
      setVideoNumber(0)
    }

    setPlayAll(false)
    setViewerOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const startVideoShow = () => {
    setVideoNumber(0)
    setPlayAll(true)
    setViewerOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeViewer = () => {
    setPlayAll(false)

    if (viewerVideoRef.current) {
      viewerVideoRef.current.pause()
    }

    setViewerOpen(false)
    document.body.style.overflow = ''
  }

  const showPreviousVideo = () => {
    setVideoNumber((current) => {
      if (current - 1 < 0) {
        return videosShowing.length - 1
      }

      return current - 1
    })
  }

  const showNextVideo = () => {
    setVideoNumber((current) => {
      if (current + 1 >= videosShowing.length) {
        return 0
      }

      return current + 1
    })
  }

  const handlePreviewPlay = (event) => {
    const preview = event.currentTarget.querySelector('video')

    if (preview) {
      preview.muted = true
      preview.volume = 0
      preview.play()
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
    <div className="app">
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar-logo">Wylb</div>

        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
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
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                autoFocus
              />
            </div>

            <Link to="/photos" className="drawer-item" onClick={() => setDrawerOpen(false)}>Photos</Link>
            <Link to="/videos" className="drawer-item" onClick={() => setDrawerOpen(false)}>Videos</Link>
            <Link to="/events" className="drawer-item" onClick={() => setDrawerOpen(false)}>Events</Link>
            <Link to="/art" className="drawer-item" onClick={() => setDrawerOpen(false)}>Art</Link>
            <Link to="/tech" className="drawer-item" onClick={() => setDrawerOpen(false)}>Tech</Link>
          </div>
        )}
      </nav>

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
              className="hero-btn-primary"
              onClick={startVideoShow}
            >
              Watch Videos
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

        <div className="media-grid">
          {filteredVideos.map((video) => (
            <div
              className="media-card"
              key={video.src}
              onMouseEnter={handlePreviewPlay}
              onMouseLeave={handlePreviewStop}
            >
              <div
                className="card-thumbnail"
                onClick={() => openViewer(video)}
              >
                <video className="video-preview" muted loop playsInline preload="metadata">
                  <source src={video.src} type="video/mp4" />
                </video>

                <div className="video-name">{video.title}</div>
              </div>

              <div className="card-content">
                <span className="card-category">{video.category}</span>
                <h3 className="card-title">{video.title}</h3>
                <p className="card-description">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {viewerOpen && currentVideo && (
        <div className="video-viewer open" aria-hidden="false">
          <div className="video-viewer-header">
            <div>
              <span className="hero-tag">Wylb Perspective</span>
              <h2>{currentVideo.title}</h2>
            </div>

            <button
              type="button"
              className="video-viewer-button"
              onClick={closeViewer}
            >
              Back to Videos
            </button>
          </div>

          <div className="video-viewer-main">
            <button
              type="button"
              className="video-viewer-arrow video-viewer-arrow-left"
              onClick={showPreviousVideo}
            >
              &#10094;
            </button>

            <video
              ref={viewerVideoRef}
              className="video-viewer-screen"
              controls
              onEnded={() => {
                if (playAll) {
                  showNextVideo()
                }
              }}
            >
              <source src={currentVideo.src} type="video/mp4" />
            </video>

            <button
              type="button"
              className="video-viewer-arrow video-viewer-arrow-right"
              onClick={showNextVideo}
            >
              &#10095;
            </button>
          </div>

          <div className="video-viewer-footer">
            <p>{currentVideo.description}</p>
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

export default Videos