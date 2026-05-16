import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Contact() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [note, setNote] = useState('This will open your email app with the request filled in.')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)

    const requestType = formData.get('requestType')
    const firstName = formData.get('firstName').trim()
    const lastName = formData.get('lastName').trim()
    const email = formData.get('email').trim()
    const message = formData.get('message').trim()

    if (!requestType || firstName === '' || lastName === '' || email === '' || message === '') {
      setNote('Please fill out everything before sending.')
      return
    }

    const ownerEmail = 'dekock.matt@gmail.com'
    const subject = `Requesting ${requestType} piece for ${firstName} ${lastName}`

    const emailBody =
      `Request Type: ${requestType}\n` +
      `Name: ${firstName} ${lastName}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`

    window.location.href =
      `mailto:${ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`
  }

  return (
    <div className="app">
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar-logo">Wylb</div>

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
              <input className="drawer-search" type="text" placeholder="Search..." />
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

            <Link to="/contact" className="drawer-item" onClick={() => setDrawerOpen(false)}>
              Contact
            </Link>

            <Link to="/signin" className="drawer-item" onClick={() => setDrawerOpen(false)}>
              Sign In
            </Link>
          </div>
        )}
      </nav>

      <section className="contact-hero">
        <div className="hero-overlay"></div>

        <div className="contact-page-content">
          <span className="hero-tag">Wylb Perspective</span>

          <h1 className="hero-title">
            Request a <br />
            Creative Shoot
          </h1>

          <p className="hero-subtitle">
            Select the work you would like to recieve and describe the request.
          </p>

          <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
            <div className="contact-category-row">
              <label className="contact-category">
                <input type="radio" name="requestType" value="Art" required />
                <span>Art</span>
              </label>

              <label className="contact-category">
                <input type="radio" name="requestType" value="Films" />
                <span>Films</span>
              </label>

              <label className="contact-category">
                <input type="radio" name="requestType" value="Photos" />
                <span>Photos</span>
              </label>
            </div>

            <div className="contact-input-row">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                required
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
            />

            <textarea
              name="message"
              placeholder="Go ahead, describe the shoot you would like to see..."
              required
            ></textarea>

            <button type="submit" className="hero-btn-primary">
              Proceed to email
            </button>

            <p className="contact-note" id="contactNote">
              {note}
            </p>
          </form>
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

export default Contact