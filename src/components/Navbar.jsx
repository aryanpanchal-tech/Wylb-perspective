import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

function Navbar() {
  const { t } = useLanguage()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar-logo">Wylb</div>

      <ul className="navbar-links">
        <li><Link to="/">{t.navbar.home}</Link></li>
        <li><a href="/#featured">{t.navbar.featured}</a></li>
        <li><a href="/#media">{t.navbar.media}</a></li>
        <li><Link to="/contact">{t.navbar.contact}</Link></li>
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
              placeholder={t.navbar.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>

          <Link to="/photos" className="drawer-item" onClick={() => setDrawerOpen(false)}>
            {t.navbar.photos}
          </Link>

          <Link to="/videos" className="drawer-item" onClick={() => setDrawerOpen(false)}>
            {t.navbar.videos}
          </Link>

          <Link to="/events" className="drawer-item" onClick={() => setDrawerOpen(false)}>
            {t.navbar.events}
          </Link>

          <Link to="/art" className="drawer-item" onClick={() => setDrawerOpen(false)}>
            {t.navbar.art}
          </Link>

          <Link to="/tech" className="drawer-item" onClick={() => setDrawerOpen(false)}>
            {t.navbar.tech}
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar