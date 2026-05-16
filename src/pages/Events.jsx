import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const eventCards = [
  {
    category: 'Live Events',
    title: 'Live event title',
    description: 'Description',
  },
  {
    category: 'Live Events',
    title: 'Live event title',
    description: 'Description',
  },
  {
    category: 'Live Events',
    title: 'Live event title',
    description: 'Description',
  },
]

function Events() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="app">
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar-logo">
          Wylb
        </div>

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
                autoFocus
              />
            </div>

            <Link to="/photos" className="drawer-item" onClick={() => setDrawerOpen(false)}>
              Photos
            </Link>

            <Link to="/videos" className="drawer-item" onClick={() => setDrawerOpen(false)}>
              Videos
            </Link>

            <Link to="/events" className="drawer-item" onClick={() => setDrawerOpen(false)}>
              Events
            </Link>

            <Link to="/art" className="drawer-item" onClick={() => setDrawerOpen(false)}>
              Art
            </Link>

            <Link to="/tech" className="drawer-item" onClick={() => setDrawerOpen(false)}>
              Tech
            </Link>
          </div>
        )}
      </nav>

      <section className="hero" id="events">
        <div className="hero-video-placeholder">
          [ Event showcase goes here ]
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="hero-tag">Wylb Perspective</span>

          <h1 className="hero-title">
            Ongoing Events <br />
          </h1>

          <p className="hero-subtitle">
            Events and updates to Wylb Perspective Studios can be found here.
          </p>
        </div>
      </section>

      <section className="media-grid-section" id="media">
        <h2 className="section-title">Event Categories</h2>

        <div className="media-grid">
          {eventCards.map((event, index) => (
            <div className="media-card" key={index}>
              <div className="card-thumbnail">
                [ Live event image ]
              </div>

              <div className="card-content">
                <span className="card-category">{event.category}</span>

                <h3 className="card-title">
                  {event.title}
                </h3>

                <p className="card-description">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer" id="footer">
        <p className="footer-copy">
          © 2026 Wylb Perspective. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default Events