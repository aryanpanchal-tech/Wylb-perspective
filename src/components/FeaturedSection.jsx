import { useState, useEffect } from 'react'

const slides = [
  { id: 1, category: 'Photos',  description: 'A stunning collection from the latest photoshoot.' },
  { id: 2, category: 'Videos',  description: 'Behind the scenes footage from the studio session.' },
  { id: 3, category: 'Events',  description: 'Highlights from the annual media awards night.' },
  { id: 4, category: 'Films',   description: 'Short film premiere — watch the full cut now.' },
]

function FeaturedSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="featured" id="featured">

      <h2 className="section-title">Featured</h2>

      {/* ── SLIDER ── */}
      <div className="slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === current ? 'slide--active' : ''}`}
          >
            {/* photo placeholder — replace with <img> when company provides photos */}
            <div className="slide-image">
              [ Photo goes here ]
            </div>

            {/* hover overlay */}
            <div className="slide-overlay">
              <p className="slide-description">{slide.description}</p>
              <button className="slide-btn">View Details</button>
            </div>

            {/* category label bottom left */}
            <span className="slide-category">{slide.category}</span>
          </div>
        ))}
      </div>

      {/* ── DOTS ── */}
      <div className="slider-dots">
        {slides.map((_, index) => (
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
