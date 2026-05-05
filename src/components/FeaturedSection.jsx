/**
 * FeaturedSection.jsx — Auto-playing image slider
 *
 * Shows a full-width slider with 4 featured content slides.
 * - Auto-advances every 3.5 seconds using setInterval
 * - Clicking a dot manually jumps to that slide
 * - Hovering a slide reveals an overlay with description + "View Details" button
 * - Category label is pinned to the bottom-left of each slide
 *
 * To replace placeholders with real photos:
 *   Replace <div className="slide-image"> with <img src="..." />
 *   and update the slides array with real titles and descriptions.
 */

import { useState, useEffect } from 'react'

// Slide data — update category and description when real content is available
const slides = [
  { id: 1, category: 'Photos',  description: 'A stunning collection from the latest photoshoot.' },
  { id: 2, category: 'Videos',  description: 'Behind the scenes footage from the studio session.' },
  { id: 3, category: 'Events',  description: 'Highlights from the annual media awards night.' },
  { id: 4, category: 'Films',   description: 'Short film premiere — watch the full cut now.' },
]

function FeaturedSection() {
  // Index of the currently visible slide
  const [current, setCurrent] = useState(0)

  // Auto-advance: increment current every 3.5s, wrap back to 0 at the end
  // clearInterval in the return function prevents memory leaks on unmount
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="featured" id="featured">

      <h2 className="section-title">Featured</h2>

      {/* Slider container — all slides stacked via position: absolute */}
      <div className="slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            // Only the active slide has opacity: 1; others are opacity: 0
            className={`slide ${index === current ? 'slide--active' : ''}`}
          >
            {/* Replace with <img src="..."> when company provides photos */}
            <div className="slide-image">[ Photo goes here ]</div>

            {/* Hover overlay — shown via CSS .slide:hover .slide-overlay */}
            <div className="slide-overlay">
              <p className="slide-description">{slide.description}</p>
              <button className="slide-btn">View Details</button>
            </div>

            {/* Category badge — always visible, bottom-left */}
            <span className="slide-category">{slide.category}</span>
          </div>
        ))}
      </div>

      {/* Dot navigation — clicking a dot jumps directly to that slide */}
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
