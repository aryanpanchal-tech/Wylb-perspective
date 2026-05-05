/**
 * MediaSection.jsx — Three-tab sliding content panel
 *
 * Tabs: Latest Media | Photographers | Tech
 *
 * How the slider works:
 *   - A container 300% wide holds three equal panels side by side
 *   - CSS transform: translateX(-N * 33.333%) shifts to the correct panel
 *   - slideIndex maps tab name → panel number (0, 1, 2)
 *
 * Tab persistence:
 *   - When a user navigates to a detail page and comes back, the active
 *     tab is restored from sessionStorage so they land where they left off
 *
 * Unsplash API:
 *   - TechCard fetches one photo per item using the camera name as a search query
 *   - API key is read from import.meta.env.VITE_UNSPLASH_KEY (.env file)
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { photographers } from '../data/photographers'
import { techItems } from '../data/techItems'

// Unsplash API key — stored in .env as VITE_UNSPLASH_KEY
const KEY = import.meta.env.VITE_UNSPLASH_KEY

// Read saved tab from sessionStorage on first render.
// sessionStorage is set by detail pages when navigating back home.
const getInitialTab = () => {
  const saved = sessionStorage.getItem('activeTab')
  if (saved) {
    sessionStorage.removeItem('activeTab') // consume it so it doesn't persist
    return saved
  }
  return 'media'
}

// Placeholder cards — replace with real data from an API or CMS
const placeholderCards = [
  { id: 1, category: 'Video', title: 'Media Title One',   description: 'Short description here.' },
  { id: 2, category: 'Photo', title: 'Media Title Two',   description: 'Short description here.' },
  { id: 3, category: 'Video', title: 'Media Title Three', description: 'Short description here.' },
  { id: 4, category: 'Audio', title: 'Media Title Four',  description: 'Short description here.' },
  { id: 5, category: 'Photo', title: 'Media Title Five',  description: 'Short description here.' },
  { id: 6, category: 'Video', title: 'Media Title Six',   description: 'Short description here.' },
]

// Maps tab name to its panel position in the 3-panel slider
const slideIndex = { media: 0, photographers: 1, tech: 2 }

// ── Media Card ──────────────────────────────────────────────────────
function MediaCard({ category, title, description }) {
  return (
    <div className="media-card">
      {/* Replace with <img src="..."> when real thumbnails are available */}
      <div className="card-thumbnail">[ Thumbnail ]</div>
      <div className="card-content">
        <span className="card-category">{category}</span>
        <h4 className="card-title">{title}</h4>
        <p className="card-description">{description}</p>
      </div>
    </div>
  )
}

// ── Photographer Card ───────────────────────────────────────────────
function PhotographerCard({ photographer }) {
  const navigate = useNavigate()
  return (
    // Entire card is clickable — navigates to /photographer/:id
    <div className="photo-card" onClick={() => navigate(`/photographer/${photographer.id}`)}>
      {/* Replace with <img src={photographer.avatar}> when photos are provided */}
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

// ── Tech Card ───────────────────────────────────────────────────────
// Fetches its own thumbnail from Unsplash on mount
function TechCard({ item }) {
  const navigate = useNavigate()
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    // Search Unsplash for a photo matching the camera name
    fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(item.name + ' camera')}&per_page=1&client_id=${KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Use the small-size URL for card thumbnails (faster load)
        if (data.results?.[0]) setPhoto(data.results[0].urls.small)
      })
  }, []) // empty array = run once on mount only

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

// ── MediaSection (main export) ──────────────────────────────────────
function MediaSection() {
  const [activeTab, setActiveTab] = useState(getInitialTab)

  // Convert tab name to a numeric offset for the CSS transform
  const offset = slideIndex[activeTab] ?? 0

  return (
    <section className="media-section" id="media">

      {/* Tab buttons — active tab gets a red bottom border */}
      <div className="media-tabs">
        <button className={`media-tab ${activeTab === 'media'         ? 'media-tab--active' : ''}`} onClick={() => setActiveTab('media')}>Latest Media</button>
        <button className={`media-tab ${activeTab === 'photographers' ? 'media-tab--active' : ''}`} onClick={() => setActiveTab('photographers')}>Photographers</button>
        <button className={`media-tab ${activeTab === 'tech'          ? 'media-tab--active' : ''}`} onClick={() => setActiveTab('tech')}>Tech</button>
      </div>

      {/* Viewport clips overflow so only one panel is visible at a time */}
      <div className="tab-viewport">
        {/* Slider: 300% wide, shifted left by offset panels via inline transform */}
        <div
          className="tab-slider-3"
          style={{ transform: `translateX(-${offset * 33.333}%)` }}
        >

          {/* Panel 1 — Latest Media */}
          <div className="tab-panel-3">
            <div className="media-grid">
              {placeholderCards.map((card) => (
                <MediaCard key={card.id} category={card.category} title={card.title} description={card.description} />
              ))}
            </div>
          </div>

          {/* Panel 2 — Photographers */}
          <div className="tab-panel-3">
            <div className="photographers-grid">
              {photographers.map((p) => (
                <PhotographerCard key={p.id} photographer={p} />
              ))}
            </div>
          </div>

          {/* Panel 3 — Tech gear (images fetched from Unsplash) */}
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
