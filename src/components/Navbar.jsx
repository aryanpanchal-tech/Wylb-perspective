import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const DEFAULT_THEME = 'photo-display'

const themeOptions = [
  {
    label: 'Main',
    value: 'main',
  },
  {
    label: 'Wyld Brown',
    value: 'wyld-brown',
  },
  {
    label: 'Classic Modern Style',
    value: 'classic-modern',
  },
  {
    label: 'Rose Gold',
    value: 'rose-gold',
  },
  {
    label: 'Clean Light',
    value: 'clean-light',
  },
  {
    label: 'Photo Display',
    value: 'photo-display',
  },
]

function Navbar() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState(DEFAULT_THEME)
  const [currentUser, setCurrentUser] = useState(null)
  const [logoutMessage, setLogoutMessage] = useState('')

  const setDefaultTheme = () => {
    setSelectedTheme(DEFAULT_THEME)
    document.documentElement.setAttribute('data-theme', DEFAULT_THEME)
  }

  const checkLoginStatus = async () => {
    try {
      const response = await fetch('/.netlify/functions/status', {
        method: 'GET',
        credentials: 'include',
      })

      const result = await response.json()

      if (response.ok && result.user) {
        setCurrentUser(result.user)

        const savedTheme = localStorage.getItem('siteTheme') || DEFAULT_THEME

        setSelectedTheme(savedTheme)
        document.documentElement.setAttribute('data-theme', savedTheme)
      } else {
        setCurrentUser(null)
        setDefaultTheme()
      }
    } catch (error) {
      setCurrentUser(null)
      setDefaultTheme()
    }
  }

  useEffect(() => {
    setDefaultTheme()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    checkLoginStatus()
  }, [location.pathname])

  useEffect(() => {
    const refreshUser = () => {
      checkLoginStatus()
    }

    window.addEventListener('accountUpdated', refreshUser)

    return () => {
      window.removeEventListener('accountUpdated', refreshUser)
    }
  }, [])

  const changeTheme = (event) => {
    if (!currentUser) {
      setDefaultTheme()
      return
    }

    const newTheme = event.target.value

    setSelectedTheme(newTheme)
    localStorage.setItem('siteTheme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/.netlify/functions/logout', {
        method: 'POST',
        credentials: 'include',
      })

      if (!response.ok) {
        setLogoutMessage('Could not log out. Please try again.')
        return
      }

      setCurrentUser(null)
      setDrawerOpen(false)
      setLogoutMessage('You have been logged out.')
      setDefaultTheme()

      window.dispatchEvent(new Event('accountUpdated'))

      setTimeout(() => {
        setLogoutMessage('')
        navigate('/')
      }, 900)
    } catch (error) {
      setLogoutMessage('Could not log out. Please try again.')
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link
        to="/"
        className="navbar-logo"
        onClick={() => setDrawerOpen(false)}
      >
        <img
          src="/Images/a470fad6-dfdf-4bcd-b175-596483965b1c_rwc_0x0x1916x1096x4096.png"
          alt="Wylb Perspective Studios logo"
        />
      </Link>

      <ul className="navbar-links">
        <li>
          <Link to="/">
            {t.navbar.home}
          </Link>
        </li>

        <li>
          <a href="/#featured">
            {t.navbar.featured}
          </a>
        </li>

        <li>
          <a href="/#media">
            {t.navbar.media}
          </a>
        </li>

        <li>
          <Link to="/contact">
            {t.navbar.contact}
          </Link>
        </li>

        <li>
          {currentUser ? (
            <button
              type="button"
              className="navbar-auth-button"
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
            <Link to="/login">
              Sign In
            </Link>
          )}
        </li>

        {currentUser && (
          <li className="theme-dropdown-item">
            <select
              className="theme-dropdown"
              value={selectedTheme}
              onChange={changeTheme}
            >
              {themeOptions.map((theme) => (
                <option key={theme.value} value={theme.value}>
                  {theme.label}
                </option>
              ))}
            </select>
          </li>
        )}
      </ul>

      <div className="navbar-right-side">
        {currentUser && (
          <Link
            to="/userPage"
            className="navbar-user-link"
            onClick={() => setDrawerOpen(false)}
          >
            <div className="navbar-profile-pic">
              {currentUser.profileImage ? (
                <img src={currentUser.profileImage} alt={currentUser.username} />
              ) : (
                <span>{currentUser.username?.charAt(0).toUpperCase()}</span>
              )}
            </div>

            <span className="navbar-username">
              @{currentUser.username}
            </span>
          </Link>
        )}

        <button
          type="button"
          className="navbar-menu-icon"
          onClick={() => setDrawerOpen(!drawerOpen)}
          aria-label="Open navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {drawerOpen && (
        <div className="navbar-drawer">
          <div className="drawernavbar-profile-pic">
            {currentUser ? (
              currentUser.profileImage ? (
                <img src={currentUser.profileImage} alt={currentUser.username} />
              ) : (
                <span>{currentUser.username?.charAt(0).toUpperCase()}</span>
              )
            ) : null}
          </div>

          <div className="drawer-search-row">
            <input
              className="drawer-search"
              type="text"
              placeholder={t.navbar.search}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              autoFocus
            />
          </div>

          {currentUser && (
            <div className="drawer-theme-row">
              <label className="drawer-theme-label">
                Themes
              </label>

              <select
                className="drawer-theme-dropdown"
                value={selectedTheme}
                onChange={changeTheme}
              >
                {themeOptions.map((theme) => (
                  <option key={theme.value} value={theme.value}>
                    {theme.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Link
            to="/photos"
            className="drawer-item"
            onClick={() => setDrawerOpen(false)}
          >
            {t.navbar.photos}
          </Link>

          <Link
            to="/videos"
            className="drawer-item"
            onClick={() => setDrawerOpen(false)}
          >
            {t.navbar.videos}
          </Link>

          <Link
            to="/events"
            className="drawer-item"
            onClick={() => setDrawerOpen(false)}
          >
            {t.navbar.events}
          </Link>

          <Link
            to="/art"
            className="drawer-item"
            onClick={() => setDrawerOpen(false)}
          >
            {t.navbar.art}
          </Link>

          <Link
            to="/tech"
            className="drawer-item"
            onClick={() => setDrawerOpen(false)}
          >
            {t.navbar.tech}
          </Link>

          {currentUser ? (
            <button
              type="button"
              className="drawer-item drawer-auth-button"
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/login"
              className="drawer-item"
              onClick={() => setDrawerOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}

      {logoutMessage && (
        <div className="logout-message">
          {logoutMessage}
        </div>
      )}
    </nav>
  )
}

export default Navbar