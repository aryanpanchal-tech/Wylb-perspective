import { useState, useEffect } from 'react'

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>

      {/* ── LOGO - left ── */}
      <div className="navbar-logo">
        Wylb
      </div>

      {/* ── LINKS - center ── */}
      <ul className="navbar-links">
        <li><a href="/#hero">Home</a></li>
        <li><a href="/#featured">Featured</a></li>
        <li><a href="/#media">Media</a></li>
        <li><a href="/contact.html">Contact</a></li>
      </ul>

      {/* ── THREE LINE MENU ICON - right ── */}
      <button
        className="navbar-menu-icon"
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* ── DROPDOWN DRAWER ── */}
      {drawerOpen && (
        <div className="navbar-drawer">

          {/* SEARCH - first item */}
          <div className="drawer-search-row">
            <input
              className="drawer-search"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>

          {/* SHORTCUT LINKS */}
          <a href="/photos.html" className="drawer-item">Photos </a>
          <a href="/videos.html" className="drawer-item">Videos</a>
          <a href="/events.html" className="drawer-item">Events</a>
          <a href="/Art.html" className="drawer-item">Art</a>
          <a href="/tech.html" className="drawer-item">Tech</a>

        </div>
      )}

    </nav>
  )
}

export default Navbar
