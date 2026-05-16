import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const techCards = [
  {
    category: 'Title',
    title: 'Title',
    description: 'Description here',
  },
  {
    category: 'Title',
    title: 'Title',
    description: 'Description here',
  },
  {
    category: 'Title',
    title: 'Title',
    description: 'Description here',
  },
]

function Tech() {
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

      <section className="hero" id="tech">
        <div className="hero-video-placeholder">
          [ Tech showcase goes here ]
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="hero-tag">Wylb Perspective</span>

          <h1 className="hero-title">
            Tech Meets <br />
            Creative Media
          </h1>

          <p className="hero-subtitle">
            Here you will be able to see the tools we use at wyld perspective to understand how we create our wonders of work
          </p>

          <div className="hero-buttons">
            <button className="hero-btn-primary">
              Explore Tech
            </button>
          </div>
        </div>
      </section>

      <section className="featured" id="featured">
        <h2 className="section-title">Featured Tech</h2>

        <div className="featured-card">
          <div className="featured-thumbnail">
            [ Tech feature goes here ]
          </div>

          <div className="featured-info">
            <span className="featured-tag">Technology</span>

            <h3 className="featured-title">
              Title
            </h3>

            <p className="featured-description">
              Tech goes here
            </p>

            <button className="featured-button">
              View Setup
            </button>
          </div>
        </div>
      </section>

      <section className="media-grid-section" id="media">
        <h2 className="section-title">Tech Categories</h2>

        <div className="media-grid">
          {techCards.map((item, index) => (
            <div className="media-card" key={index}>
              <div className="card-thumbnail">
                [ Tech goes here ]
              </div>

              <div className="card-content">
                <span className="card-category">{item.category}</span>

                <h3 className="card-title">
                  {item.title}
                </h3>

                <p className="card-description">
                  {item.description}
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

export default Tech