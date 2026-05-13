import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

function Navbar() {
  const { t } = useLanguage()
  const [drawerOpen,  setDrawerOpen]  = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled,    setScrolled]    = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>

      <div className="navbar-logo">Wylb</div>

      <ul className="navbar-links">
        <li><a href="#hero">{t.navbar.home}</a></li>
        <li><a href="#featured">{t.navbar.featured}</a></li>
        <li><a href="#media">{t.navbar.media}</a></li>
        <li><a href="#footer">{t.navbar.contact}</a></li>
      </ul>

      <button className="navbar-menu-icon" onClick={() => setDrawerOpen(!drawerOpen)}>
        <span></span><span></span><span></span>
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
          <a href="/photos.html"  className="drawer-item" onClick={() => setDrawerOpen(false)}>{t.navbar.photos}</a>
          <a href="/videos.html"  className="drawer-item" onClick={() => setDrawerOpen(false)}>{t.navbar.videos}</a>
          <a href="/events.html"  className="drawer-item" onClick={() => setDrawerOpen(false)}>{t.navbar.events}</a>
          <a href="/Art.html"     className="drawer-item" onClick={() => setDrawerOpen(false)}>{t.navbar.art}</a>
          <a href="/tech.html"    className="drawer-item" onClick={() => setDrawerOpen(false)}>{t.navbar.tech}</a>
        </div>
      )}

    </nav>
  )
}

export default Navbar
