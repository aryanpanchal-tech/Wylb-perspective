/**
 * PhotographerPage.jsx — Individual photographer profile page
 * Route: /photographer/:id
 *
 * Layout (top to bottom):
 *   1. Navbar          — Home + Contact links, returns to photographers tab
 *   2. Photo grid      — 8 placeholder cells for portfolio shots
 *   3. Profile section — Bio (left), main photo (center), contact form (right)
 *   4. Past projects   — Each project shown with a photo + description
 *   5. Footer          — Social links (Instagram, LinkedIn, X, Email)
 *
 * Navigation behaviour:
 *   Clicking Home sets sessionStorage.activeTab = 'photographers' before
 *   navigating, so MediaSection restores the Photographers tab on return.
 *
 * Data source: src/data/photographers.js
 */

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { photographers } from '../data/photographers'

function PhotographerPage() {
  // useParams reads the :id segment from the URL (e.g. /photographer/2 → id = "2")
  const { id } = useParams()
  const navigate  = useNavigate()

  // Controlled form state — each field mirrors its input value
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', service: '' })

  // Scroll to top when this page first loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Convert URL string "2" to number 2 before comparing with data ids
  const photographer = photographers.find((p) => p.id === Number(id))

  // Guard — show a fallback if the id doesn't match any photographer
  if (!photographer) {
    return (
      <div className="not-found">
        <p>Photographer not found.</p>
        <button onClick={() => navigate('/')}>Go Back Home</button>
      </div>
    )
  }

  // Update a single form field while keeping the rest unchanged
  // e.target.name matches the `name` attribute on each input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Go home and restore the Photographers tab + scroll position
  const handleHome = () => {
    sessionStorage.setItem('activeTab', 'photographers')
    navigate('/', { state: { scrollTo: 'media' } })
  }

  return (
    <div className="pg-page">

      {/* Navbar — minimal: just logo, Home, and Contact */}
      <nav className="pg-nav">
        <div className="pg-nav-logo" onClick={handleHome} style={{ cursor: 'pointer' }}>
          Wylb
        </div>
        <div className="pg-nav-links">
          <span onClick={handleHome}>Home</span>
          <span onClick={() => navigate('/', { state: { scrollTo: 'footer' } })}>Contact</span>
        </div>
      </nav>

      {/* Top photo grid — 8 cells, replace with portfolio images when available */}
      <div className="pg-photo-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div key={n} className="pg-photo-cell">[ Photo ]</div>
        ))}
      </div>

      {/* Three-column profile section */}
      <div className="pg-profile">

        {/* Left — name, role, bio text */}
        <div className="pg-profile-left">
          <p className="pg-greeting">Hi, my name is</p>
          <h1 className="pg-name">{photographer.name}.</h1>
          <p className="pg-role-label">I am a {photographer.role.toLowerCase()}.</p>
          <p className="pg-bio">{photographer.bio}</p>
        </div>

        {/* Center — main portrait photo placeholder */}
        <div className="pg-profile-photo">[ Main Photo ]</div>

        {/* Right — Stay Connected contact form */}
        <div className="pg-connect">
          <h3 className="pg-connect-title">Stay Connected.</h3>
          <p className="pg-connect-sub">Reach out to collaborate or learn more about their work.</p>

          <div className="pg-form-row">
            <input className="pg-input" name="firstName" placeholder="Enter your first name" value={form.firstName} onChange={handleChange} />
            <input className="pg-input" name="lastName"  placeholder="Enter your last name"  value={form.lastName}  onChange={handleChange} />
          </div>

          <input
            className="pg-input pg-input-full"
            name="email"
            placeholder="Enter your email address"
            value={form.email}
            onChange={handleChange}
          />

          <select
            className="pg-input pg-input-full pg-select"
            name="service"
            value={form.service}
            onChange={handleChange}
          >
            <option value="">What kind of service are you looking for?</option>
            <option value="portrait">Portrait Photography</option>
            <option value="wedding">Wedding Photography</option>
            <option value="commercial">Commercial Photography</option>
            <option value="documentary">Documentary</option>
            <option value="other">Other</option>
          </select>

          <button className="pg-connect-btn">Connect Now &rarr;</button>
        </div>

      </div>

      {/* Past projects — one row per project with photo + text */}
      <div className="pg-works">
        <h2 className="pg-works-title">My Work, My Journey.</h2>
        <div className="pg-works-list">
          {photographer.projects.map((project, index) => (
            <div key={index} className="pg-work-item">
              {/* Replace with real project photo when available */}
              <div className="pg-work-img">[ Project Photo ]</div>
              <div className="pg-work-info">
                <h4>{project}</h4>
                <p>A short description of this project and the story behind it.</p>
                <span className="pg-work-link">Continue Reading &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer — social media links open in a new tab */}
      <footer className="pg-footer">
        <div className="pg-footer-links">
          <span onClick={handleHome}>Home</span>
          <span onClick={() => navigate('/', { state: { scrollTo: 'footer' } })}>Contact</span>
        </div>
        <div className="pg-footer-social">
          <a href={photographer.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={photographer.linkedin}  target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={photographer.twitter}   target="_blank" rel="noreferrer">X</a>
          <a href={`mailto:${photographer.email}`}>Email</a>
        </div>
      </footer>

    </div>
  )
}

export default PhotographerPage
