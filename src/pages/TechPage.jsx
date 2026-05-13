import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { techItems } from '../data/techItems'
import { useLanguage } from '../context/LanguageContext'

const KEY = import.meta.env.VITE_UNSPLASH_KEY

async function fetchPhoto(query, count = 1) {
  const res  = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&client_id=${KEY}`)
  const data = await res.json()
  return data.results ?? []
}

function TechPage() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const { t }    = useLanguage()

  const item = techItems.find((i) => i.id === Number(id))

  const [mainPhoto,     setMainPhoto]     = useState(null)
  const [galleryPhotos, setGalleryPhotos] = useState([])
  const [loading,       setLoading]       = useState(true)

  useEffect(() => { window.scrollTo(0, 0) }, [])

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
        <p>{t.techPage.notFound}</p>
        <button onClick={handleHome}>{t.techPage.goBack}</button>
      </div>
    )
  }

  return (
    <div className="pg-page">

      <nav className="pg-nav">
        <div className="pg-nav-logo" onClick={handleHome} style={{ cursor: 'pointer' }}>Wylb</div>
        <div className="pg-nav-links">
          <span onClick={handleHome}>{t.techPage.home}</span>
          <span onClick={() => navigate('/', { state: { scrollTo: 'footer' } })}>{t.techPage.contact}</span>
        </div>
      </nav>

      <div className="tech-header">
        <div className="tech-header-left">
          <span className="tech-category-label">{item.category}</span>
          <h1 className="tech-name">{item.name}</h1>
          <p className="tech-tagline">{item.tagline}</p>
          <p className="tech-description">{item.description}</p>
          <div className="tech-price">
            <span className="tech-price-label">{t.techPage.priceRange}</span>
            <span className="tech-price-value">{item.priceRange}</span>
          </div>
        </div>
        <div className="tech-header-photo">
          {loading ? (
            <span style={{ color: '#444' }}>{t.techPage.loading}</span>
          ) : mainPhoto ? (
            <img src={mainPhoto} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ color: '#444' }}>{t.techPage.noImage}</span>
          )}
        </div>
      </div>

      <div className="tech-specs-section">
        <h3 className="tech-specs-title">{t.techPage.specs}</h3>
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

      <div className="tech-gallery-section">
        <h3 className="tech-gallery-title">{t.techPage.gallery}</h3>
        <div className="tech-gallery-grid">
          {loading
            ? [1, 2, 3, 4].map((n) => <div key={n} className="tech-gallery-cell">{t.techPage.loading}</div>)
            : galleryPhotos.map((url, i) =>
                url
                  ? <img key={i} src={url} alt={`sample ${i + 1}`} className="tech-gallery-img" />
                  : <div key={i} className="tech-gallery-cell">{t.techPage.noImageGallery}</div>
              )
          }
        </div>
      </div>

      <footer className="pg-footer">
        <div className="pg-footer-links">
          <span onClick={handleHome}>{t.techPage.home}</span>
          <span onClick={() => navigate('/', { state: { scrollTo: 'footer' } })}>{t.techPage.contact}</span>
        </div>
      </footer>

    </div>
  )
}

export default TechPage
