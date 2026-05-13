import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { photographers } from '../data/photographers'
import { techItems } from '../data/techItems'

const KEY = import.meta.env.VITE_UNSPLASH_KEY

const cardImages = [
  '/Images/Timeless Toronto.jpg',
  '/Images/Smiling in the sunset.jpg',
  '/Images/Playing in the beach.jpg',
  '/Images/Playing at the park.jpg',
  '/Images/Playful puppy.jpg',
  '/Images/Raining fish.jpg',
]

const getInitialTab = () => {
  const saved = sessionStorage.getItem('activeTab')
  if (saved) { sessionStorage.removeItem('activeTab'); return saved }
  return 'media'
}

const slideIndex = { media: 0, photographers: 1, tech: 2 }

function MediaCard({ category, title, description, image }) {
  return (
    <div className="media-card">
      <div className="card-thumbnail">
        {image && <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
      </div>
      <div className="card-content">
        <span className="card-category">{category}</span>
        <h4 className="card-title">{title}</h4>
        <p className="card-description">{description}</p>
      </div>
    </div>
  )
}

function PhotographerCard({ photographer, t }) {
  const navigate = useNavigate()
  return (
    <div className="photo-card" onClick={() => navigate(`/photographer/${photographer.id}`)}>
      <div className="photo-card-avatar">
        {photographer.avatar
          ? <img src={photographer.avatar} alt={photographer.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : '[ Photo ]'}
      </div>
      <div className="photo-card-info">
        <h4 className="photo-card-name">{photographer.name}</h4>
        <p className="photo-card-role">{photographer.role}</p>
        <p className="photo-card-location">{photographer.location}</p>
      </div>
      <button className="photo-card-btn">{t.media.viewProfile}</button>
    </div>
  )
}

function TechCard({ item, t }) {
  const navigate = useNavigate()
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(item.name + ' camera')}&per_page=1&client_id=${KEY}`)
      .then((res) => res.json())
      .then((data) => { if (data.results?.[0]) setPhoto(data.results[0].urls.small) })
  }, [])

  return (
    <div className="tech-card" onClick={() => navigate(`/tech/${item.id}`)}>
      <div className="tech-card-img">
        {photo
          ? <img src={photo} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ color: '#555', fontSize: '13px' }}>{t.media.loading}</span>
        }
      </div>
      <div className="tech-card-info">
        <span className="tech-card-category">{item.category}</span>
        <h4 className="tech-card-name">{item.name}</h4>
        <p className="tech-card-tagline">{item.tagline}</p>
        <span className="tech-card-price">{item.priceRange}</span>
      </div>
      <button className="photo-card-btn">{t.media.viewDetails}</button>
    </div>
  )
}

function MediaSection() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState(getInitialTab)
  const offset = slideIndex[activeTab] ?? 0

  return (
    <section className="media-section" id="media">

      <div className="media-tabs">
        <button className={`media-tab ${activeTab === 'media'         ? 'media-tab--active' : ''}`} onClick={() => setActiveTab('media')}>{t.media.latestMedia}</button>
        <button className={`media-tab ${activeTab === 'photographers' ? 'media-tab--active' : ''}`} onClick={() => setActiveTab('photographers')}>{t.media.photographers}</button>
        <button className={`media-tab ${activeTab === 'tech'          ? 'media-tab--active' : ''}`} onClick={() => setActiveTab('tech')}>{t.media.tech}</button>
      </div>

      <div className="tab-viewport">
        <div className="tab-slider-3" style={{ transform: `translateX(-${offset * 33.333}%)` }}>

          <div className="tab-panel-3">
            <div className="media-grid">
              {t.media.cards.map((card, i) => (
                <MediaCard key={i} category={card.category} title={card.title} description={card.description} image={cardImages[i]} />
              ))}
            </div>
          </div>

          <div className="tab-panel-3">
            <div className="photographers-grid">
              {photographers.map((p) => (
                <PhotographerCard key={p.id} photographer={p} t={t} />
              ))}
            </div>
          </div>

          <div className="tab-panel-3">
            <div className="tech-grid">
              {techItems.map((item) => (
                <TechCard key={item.id} item={item} t={t} />
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default MediaSection
