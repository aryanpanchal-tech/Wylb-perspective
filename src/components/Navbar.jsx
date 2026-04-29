function Navbar({ searchQuery, setSearchQuery }) {
  return (
    <nav className="navbar">

      {/* ── LOGO ── */}
      <div className="navbar-logo">
        YourLogo
      </div>

      {/* ── NAVIGATION LINKS ── */}
      <ul className="navbar-links">
        <li>Home</li>
        <li>Videos</li>
        <li>Photos</li>
        <li>About</li>
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

    </nav>
  )
}

export default Navbar
