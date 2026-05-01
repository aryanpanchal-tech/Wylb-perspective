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
        <li><a href="#hero">Home</a></li>
        <li><a href="#featured">Featured</a></li>
        <li><a href="#media">Media</a></li>
        <li><a href="#footer">Contact</a></li>
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
          <a href="#photos" className="drawer-item" onClick={() => setDrawerOpen(false)}>Photos</a>
          <a href="#videos" className="drawer-item" onClick={() => setDrawerOpen(false)}>Videos</a>
          <a href="#events" className="drawer-item" onClick={() => setDrawerOpen(false)}>Events</a>
          <a href="#films"  className="drawer-item" onClick={() => setDrawerOpen(false)}>Films</a>
          <a href="#tech"   className="drawer-item" onClick={() => setDrawerOpen(false)}>Tech</a>

        </div>
      )}

    </nav>
  )
}

export default Navbar
