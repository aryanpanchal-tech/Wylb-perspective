import { useState } from 'react'

function Navbar({ searchQuery, setSearchQuery }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">

      {/* ── LOGO ── */}
      <div className="navbar-logo">
        Wylb
      </div>

      {/* ── NAVIGATION LINKS ── */}
      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li><a href="#hero">Home</a></li>
        <li><a href="#featured">Featured</a></li>
        <li><a href="#media">Media</a></li>
        <li><a href="#footer">Contact</a></li>
      </ul>

      {/* ── SEARCH BAR ── */}
      <input
        className="navbar-search"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* ── LOGIN BUTTON ── */}
      <button className="navbar-login">
        Login
      </button>

      {/* ── HAMBURGER - mobile only ── */}
      <button
        className="navbar-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

    </nav>
  )
}

export default Navbar
