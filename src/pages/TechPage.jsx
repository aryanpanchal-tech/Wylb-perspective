import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { techItems } from '../data/techItems'

const KEY = import.meta.env.VITE_UNSPLASH_KEY

async function fetchPhoto(query, count = 1) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&client_id=${KEY}`
  )
  const data = await res.json()
  return data.results ?? []
}

function TechPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const item = techItems.find((t) => t.id === Number(id))

  const [mainPhoto,    setMainPhoto]    = useState(null)
  const [galleryPhotos, setGalleryPhotos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!item) return

    const load = async () => {
      setLoading(true)

      const [productResults, sampleResults] = await Promise.all([
        fetchPhoto(`${item.name} camera product`, 1),
        fetchPhoto(`${item.category} photography`, 4),
      ])

      setMainPhoto(productResults[0]?.urls?.regular ?? null)
      setGalleryPhotos(sampleResults.map((r) => r.urls?.regular))
      setLoading(false)
    }

    load()
  }, [item])

  const handleHome = () => {
    sessionStorage.setItem('activeTab', 'tech')
    navigate('/', { state: { scrollTo: 'media' } })
  }

  if (!item) {
    return (
      <div className="not-found">
        <p>Item not found.</p>
        <button onClick={handleHome}>Go Back Home</button>
      </div>
    )
  }

  return (
    <div className="pg-page">

      {/* ── NAVBAR ── */}
      <nav className="pg-nav">
        <div className="pg-nav-logo" onClick={handleHome} style={{ cursor: 'pointer' }}>
          Wylb
        </div>
        <div className="pg-nav-links">
          <span onClick={handleHome}>Home</span>
          <span onClick={() => navigate('/', { state: { scrollTo: 'footer' } })}>Contact</span>
        </div>
      </nav>

      {/* ── ITEM HEADER ── */}
      <div className="tech-header">

        <div className="tech-header-left">
          <span className="tech-category-label">{item.category}</span>
          <h1 className="tech-name">{item.name}</h1>
          <p className="tech-tagline">{item.tagline}</p>
          <p className="tech-description">{item.description}</p>
          <div className="tech-price">
            <span className="tech-price-label">Price Range</span>
            <span className="tech-price-value">{item.priceRange}</span>
          </div>
        </div>

        {/* ── MAIN PRODUCT PHOTO from Unsplash ── */}
        <div className="tech-header-photo">
          {loading ? (
            <span style={{ color: '#444' }}>Loading...</span>
          ) : mainPhoto ? (
            <img src={mainPhoto} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ color: '#444' }}>[ No image found ]</span>
          )}
        </div>

      </div>

      {/* ── SPECS ── */}
      <div className="tech-specs-section">
        <h3 className="tech-specs-title">Technical Specifications</h3>
        <div className="tech-specs-grid">
          {item.specs.map((spec, index) => {
            const [label, value] = spec.split(': ')
            return (
              <div key={index} className="tech-spec-item">
                <span className="tech-spec-label">{label}</span>
                <span className="tech-spec-value">{value}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── GALLERY — sample photos from Unsplash ── */}
      <div className="tech-gallery-section">
        <h3 className="tech-gallery-title">Sample Photography</h3>
        <div className="tech-gallery-grid">
          {loading
            ? [1, 2, 3, 4].map((n) => (
                <div key={n} className="tech-gallery-cell">Loading...</div>
              ))
            : galleryPhotos.map((url, i) =>
                url ? (
                  <img key={i} src={url} alt={`sample ${i + 1}`} className="tech-gallery-img" />
                ) : (
                  <div key={i} className="tech-gallery-cell">[ No image ]</div>
                )
              )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="pg-footer">
        <div className="pg-footer-links">
          <span onClick={handleHome}>Home</span>
          <span onClick={() => navigate('/', { state: { scrollTo: 'footer' } })}>Contact</span>
        </div>
      </footer>

    </div>
  )
}

export default TechPage
