import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

const slideImages = [
  '/Images/Vibrance Beneath the Lion\'s Gaze.jpg',
  '/Images/SuspenceinSerenity.jpg',
  '/Images/Family gathering.jpg',
  '/Images/Toronto_CN Tower.jpg',
]

function FeaturedSection() {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideImages.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="featured" id="featured">
      <h2 className="section-title">{t.featured.title}</h2>

      <div className="slider">
        {slideImages.map((image, index) => (
          <div key={index} className={`slide ${index === current ? 'slide--active' : ''}`}>
            <img src={image} alt={t.featured.slides[index].category} className="slide-image" />
            <div className="slide-overlay">
              <p className="slide-description">{t.featured.slides[index].description}</p>
              <button className="slide-btn">{t.featured.viewDetails}</button>
            </div>
            <span className="slide-category">{t.featured.slides[index].category}</span>
          </div>
        ))}
      </div>

      <div className="slider-dots">
        {slideImages.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === current ? 'dot--active' : ''}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default FeaturedSection
