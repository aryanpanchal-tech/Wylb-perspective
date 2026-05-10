/**
 * Navbar.jsx — Fixed top navigation bar
 *
 * Behaviour:
 * - Transparent at the top of the page, overlaying the hero section
 * - Becomes solid dark (#111) once the user scrolls past 80px
 * - Three-line icon on the right opens a drawer with a search bar
 *   and category shortcut links (Photos, Videos, Events, Films, Tech)
 * - Smooth CSS transition between transparent and scrolled states
 */

import { useState, useEffect } from 'react'

function Navbar() {
  const [drawerOpen,   setDrawerOpen]   = useState(false)
  const [searchQuery,  setSearchQuery]  = useState('')
  // true once the user has scrolled more than 80px down
  const [scrolled,     setScrolled]     = useState(false)

  // Attach a scroll listener on mount, clean it up on unmount
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>

      {/* Logo — left side */}
      <div className="navbar-logo">Wylb</div>

      {/* Anchor links — centered via absolute positioning in CSS */}
      <ul className="navbar-links">
        <li><a href="/#hero">Home</a></li>
        <li><a href="/#featured">Featured</a></li>
        <li><a href="/#media">Media</a></li>
        <li><a href="/contact.html">Contact</a></li>
      </ul>

      {/* Three-line icon — toggles the drawer */}
      <button
        className="navbar-menu-icon"
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Dropdown drawer — only rendered when drawerOpen is true */}
      {drawerOpen && (
        <div className="navbar-drawer">

          {/* Search input — autoFocus opens keyboard immediately */}
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
          <a href="/photos.html" className="drawer-item">Photos</a>
          <a href="/videos.html" className="drawer-item">Videos</a>
          <a href="/events.html" className="drawer-item">Events</a>
          <a href="/Art.html"    className="drawer-item">Art</a>
          <a href="/tech.html"   className="drawer-item">Tech</a>

        </div>
      )}

    </nav>
  )
}

export default Navbar
