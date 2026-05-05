import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { photographers } from '../data/photographers'

function PhotographerPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', service: '' })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const photographer = photographers.find((p) => p.id === Number(id))

  if (!photographer) {
    return (
      <div className="not-found">
        <p>Photographer not found.</p>
        <button onClick={() => navigate('/')}>Go Back Home</button>
      </div>
    )
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className="pg-page">

      {/* ── TOP NAVBAR ── */}
      <nav className="pg-nav">
        <div className="pg-nav-logo" onClick={() => { sessionStorage.setItem('activeTab', 'photographers'); navigate('/', { state: { scrollTo: 'media' } }) }} style={{ cursor: 'pointer' }}>
          Wylb
        </div>
        <div className="pg-nav-links">
          <span onClick={() => { sessionStorage.setItem('activeTab', 'photographers'); navigate('/', { state: { scrollTo: 'media' } }) }}>Home</span>
          <span onClick={() => navigate('/', { state: { scrollTo: 'footer' } })}>Contact</span>
        </div>
      </nav>

      {/* ── PHOTO GRID (top) ── */}
      <div className="pg-photo-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div key={n} className="pg-photo-cell">[ Photo ]</div>
        ))}
      </div>

      {/* ── PROFILE SECTION ── */}
      <div className="pg-profile">

        {/* LEFT — name + bio */}
        <div className="pg-profile-left">
          <p className="pg-greeting">Hi, my name is</p>
          <h1 className="pg-name">{photographer.name}.</h1>
          <p className="pg-role-label">I am a {photographer.role.toLowerCase()}.</p>
          <p className="pg-bio">{photographer.bio}</p>
        </div>

        {/* CENTER — main photo */}
        <div className="pg-profile-photo">[ Main Photo ]</div>

        {/* RIGHT — stay connected form */}
        <div className="pg-connect">
          <h3 className="pg-connect-title">Stay Connected.</h3>
          <p className="pg-connect-sub">Reach out to collaborate or learn more about their work.</p>

          <div className="pg-form-row">
            <input className="pg-input" name="firstName" placeholder="Enter your first name" value={form.firstName} onChange={handleChange} />
            <input className="pg-input" name="lastName"  placeholder="Enter your last name"  value={form.lastName}  onChange={handleChange} />
          </div>
          <input className="pg-input pg-input-full" name="email" placeholder="Enter your email address" value={form.email} onChange={handleChange} />
          <select className="pg-input pg-input-full pg-select" name="service" value={form.service} onChange={handleChange}>
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

      {/* ── PAST PROJECTS ── */}
      <div className="pg-works">
        <h2 className="pg-works-title">My Work, My Journey.</h2>
        <div className="pg-works-list">
          {photographer.projects.map((project, index) => (
            <div key={index} className="pg-work-item">
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

      {/* ── FOOTER ── */}
      <footer className="pg-footer">
        <div className="pg-footer-links">
          <span onClick={() => navigate('/')}>Blog</span>
          <span>About</span>
          <span>Contact</span>
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
