import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { photographers } from '../data/photographers'
import { techItems } from '../data/techItems'

const KEY = import.meta.env.VITE_UNSPLASH_KEY

const getInitialTab = () => {
  const saved = sessionStorage.getItem('activeTab')
  if (saved) {
    sessionStorage.removeItem('activeTab')
    return saved
  }
  return 'media'
}

const placeholderCards = [
  { id: 1, category: 'Video', title: 'Media Title One',   description: 'Short description here.' },
  { id: 2, category: 'Photo', title: 'Media Title Two',   description: 'Short description here.' },
  { id: 3, category: 'Video', title: 'Media Title Three', description: 'Short description here.' },
  { id: 4, category: 'Audio', title: 'Media Title Four',  description: 'Short description here.' },
  { id: 5, category: 'Photo', title: 'Media Title Five',  description: 'Short description here.' },
  { id: 6, category: 'Video', title: 'Media Title Six',   description: 'Short description here.' },
]

const slideIndex = { media: 0, photographers: 1, tech: 2 }

function MediaCard({ category, title, description }) {
  return (
    <div className="media-card">
      <div className="card-thumbnail">[ Thumbnail ]</div>
      <div className="card-content">
        <span className="card-category">{category}</span>
        <h4 className="card-title">{title}</h4>
        <p className="card-description">{description}</p>
      </div>
    </div>
  )
}

function PhotographerCard({ photographer }) {
  const navigate = useNavigate()
  return (
    <div className="photo-card" onClick={() => navigate(`/photographer/${photographer.id}`)}>
      <div className="photo-card-avatar">[ Photo ]</div>
      <div className="photo-card-info">
        <h4 className="photo-card-name">{photographer.name}</h4>
        <p className="photo-card-role">{photographer.role}</p>
        <p className="photo-card-location">{photographer.location}</p>
      </div>
      <button className="photo-card-btn">View Profile</button>
    </div>
  )
}

function TechCard({ item }) {
  const navigate = useNavigate()
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(item.name + ' camera')}&per_page=1&client_id=${KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.results?.[0]) {
          setPhoto(data.results[0].urls.small)
        }
      })
  }, [])

  return (
    <div className="tech-card" onClick={() => navigate(`/tech/${item.id}`)}>
      <div className="tech-card-img">
        {photo
          ? <img src={photo} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ color: '#555', fontSize: '13px' }}>Loading...</span>
        }
      </div>
      <div className="tech-card-info">
        <span className="tech-card-category">{item.category}</span>
        <h4 className="tech-card-name">{item.name}</h4>
        <p className="tech-card-tagline">{item.tagline}</p>
        <span className="tech-card-price">{item.priceRange}</span>
      </div>
      <button className="photo-card-btn">View Details</button>
    </div>
  )
}

function MediaSection() {
  const [activeTab, setActiveTab] = useState(getInitialTab)

  const offset = slideIndex[activeTab] ?? 0

  return (
    <section className="media-section" id="media">

      {/* ── TABS ── */}
      <div className="media-tabs">
        <button className={`media-tab ${activeTab === 'media'         ? 'media-tab--active' : ''}`} onClick={() => setActiveTab('media')}>Latest Media</button>
        <button className={`media-tab ${activeTab === 'photographers' ? 'media-tab--active' : ''}`} onClick={() => setActiveTab('photographers')}>Photographers</button>
        <button className={`media-tab ${activeTab === 'tech'          ? 'media-tab--active' : ''}`} onClick={() => setActiveTab('tech')}>Tech</button>
      </div>

      {/* ── SLIDING PANELS ── */}
      <div className="tab-viewport">
        <div
          className="tab-slider-3"
          style={{ transform: `translateX(-${offset * 33.333}%)` }}
        >

          {/* PANEL 1 — Latest Media */}
          <div className="tab-panel-3">
            <div className="media-grid">
              {placeholderCards.map((card) => (
                <MediaCard key={card.id} category={card.category} title={card.title} description={card.description} />
              ))}
            </div>
          </div>

          {/* PANEL 2 — Photographers */}
          <div className="tab-panel-3">
            <div className="photographers-grid">
              {photographers.map((p) => (
                <PhotographerCard key={p.id} photographer={p} />
              ))}
            </div>
          </div>

          {/* PANEL 3 — Tech */}
          <div className="tab-panel-3">
            <div className="tech-grid">
              {techItems.map((item) => (
                <TechCard key={item.id} item={item} />
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default MediaSection
