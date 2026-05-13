import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { photographers } from '../data/photographers'
import { useLanguage } from '../context/LanguageContext'

function PhotographerPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', service: '' })

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const photographer = photographers.find((p) => p.id === Number(id))

  if (!photographer) {
    return (
      <div className="not-found">
        <p>{t.photographerPage.notFound}</p>
        <button onClick={() => navigate('/')}>{t.photographerPage.goBack}</button>
      </div>
    )
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleHome = () => {
    sessionStorage.setItem('activeTab', 'photographers')
    navigate('/', { state: { scrollTo: 'media' } })
  }

  return (
    <div className="pg-page">

      <nav className="pg-nav">
        <div className="pg-nav-logo" onClick={handleHome} style={{ cursor: 'pointer' }}>Wylb</div>
        <div className="pg-nav-links">
          <span onClick={handleHome}>{t.photographerPage.home}</span>
          <span onClick={() => navigate('/', { state: { scrollTo: 'footer' } })}>{t.photographerPage.contact}</span>
        </div>
      </nav>

      <div className="pg-photo-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div key={n} className="pg-photo-cell">[ Photo ]</div>
        ))}
      </div>

      <div className="pg-profile">

        <div className="pg-profile-left">
          <p className="pg-greeting">{t.photographerPage.greeting}</p>
          <h1 className="pg-name">{photographer.name}.</h1>
          <p className="pg-role-label">{t.photographerPage.role} {photographer.role.toLowerCase()}.</p>
          <p className="pg-bio">{photographer.bio}</p>
        </div>

        <div className="pg-profile-photo">[ Main Photo ]</div>

        <div className="pg-connect">
          <h3 className="pg-connect-title">{t.photographerPage.stayConnected}</h3>
          <p className="pg-connect-sub">{t.photographerPage.reachOut}</p>
          <div className="pg-form-row">
            <input className="pg-input" name="firstName" placeholder={t.photographerPage.firstName} value={form.firstName} onChange={handleChange} />
            <input className="pg-input" name="lastName"  placeholder={t.photographerPage.lastName}  value={form.lastName}  onChange={handleChange} />
          </div>
          <input className="pg-input pg-input-full" name="email" placeholder={t.photographerPage.email} value={form.email} onChange={handleChange} />
          <select className="pg-input pg-input-full pg-select" name="service" value={form.service} onChange={handleChange}>
            <option value="">{t.photographerPage.serviceLabel}</option>
            <option value="portrait">{t.photographerPage.portrait}</option>
            <option value="wedding">{t.photographerPage.wedding}</option>
            <option value="commercial">{t.photographerPage.commercial}</option>
            <option value="documentary">{t.photographerPage.documentary}</option>
            <option value="other">{t.photographerPage.other}</option>
          </select>
          <button className="pg-connect-btn">{t.photographerPage.connectBtn}</button>
        </div>

      </div>

      <div className="pg-works">
        <h2 className="pg-works-title">{t.photographerPage.myWork}</h2>
        <div className="pg-works-list">
          {photographer.projects.map((project, index) => (
            <div key={index} className="pg-work-item">
              <div className="pg-work-img">[ Project Photo ]</div>
              <div className="pg-work-info">
                <h4>{project}</h4>
                <p>{t.photographerPage.projectDesc}</p>
                <span className="pg-work-link">{t.photographerPage.continueReading}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="pg-footer">
        <div className="pg-footer-links">
          <span onClick={handleHome}>{t.photographerPage.home}</span>
          <span onClick={() => navigate('/', { state: { scrollTo: 'footer' } })}>{t.photographerPage.contact}</span>
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
