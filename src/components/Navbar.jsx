import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const themeOptions = [
  {
    label: 'Coffee brown',
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
    label: 'Paper White',
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

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState('wyld-brown')
  const [currentUser, setCurrentUser] = useState(null)
  const [logoutMessage, setLogoutMessage] = useState('')

  useEffect(() => {
    const savedTheme = localStorage.getItem('siteTheme')

    if (savedTheme) {
      setSelectedTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else {
      document.documentElement.setAttribute('data-theme', 'wyld-brown')
    }
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
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/.netlify/functions/status', {
          credentials: 'include',
        })

        const result = await response.json()

        if (response.ok && result.user) {
          setCurrentUser(result.user)
        } else {
          setCurrentUser(null)
        }
      } catch (error) {
        setCurrentUser(null)
      }
    }

    checkLoginStatus()
  }, [])

  useEffect(() => {
    const savedLogoutMessage = sessionStorage.getItem('logoutMessage')

    if (savedLogoutMessage) {
      setLogoutMessage(savedLogoutMessage)
      sessionStorage.removeItem('logoutMessage')

      setTimeout(() => {
        setLogoutMessage('')
      }, 3000)
    }
  }, [])

  const changeTheme = (event) => {
    const newTheme = event.target.value

    setSelectedTheme(newTheme)
    localStorage.setItem('siteTheme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const handleLogout = async () => {
    try {
      await fetch('/.netlify/functions/logout', {
        method: 'POST',
        credentials: 'include',
      })

      setCurrentUser(null)
      setDrawerOpen(false)

      sessionStorage.setItem('logoutMessage', 'You have been logged out.')
      setLogoutMessage('You have been logged out.')

      navigate('/')

      setTimeout(() => {
        setLogoutMessage('')
      }, 3000)
    } catch (error) {
      setLogoutMessage('Could not log out. Please try again.')

      setTimeout(() => {
        setLogoutMessage('')
      }, 3000)
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
          <Link to="/">{t.navbar.home}</Link>
        </li>

        <li>
          <a href="/#featured">{t.navbar.featured}</a>
        </li>

        <li>
          <a href="/#media">{t.navbar.media}</a>
        </li>

        <li>
          <Link to="/contact">{t.navbar.contact}</Link>
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
            <Link to="/login">Sign In</Link>
          )}
        </li>

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
      </ul>

      <div className="navbar-right-side">
          {currentUser && (
        <Link
          to="/userPage"
          className="navbar-username"
          onClick={() => setDrawerOpen(false)}
        >
          @{currentUser.username}
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

          <div className="drawer-theme-row">
            <label className="drawer-theme-label">Themes</label>

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