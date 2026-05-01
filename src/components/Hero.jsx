function Hero() {
  return (
    <section className="hero" id="hero">

      <span className="hero-tag">Now Live</span>

      {/* ── MAIN HEADLINE ── */}
      <h1 className="hero-title">
        Welcome to Wylb Perspective
      </h1>

      {/* ── SUBTITLE ── */}
      <p className="hero-subtitle">
        A short description of what your media site is about.
      </p>

      {/* ── CALL TO ACTION BUTTONS ── */}
      <div className="hero-buttons">
        <button className="hero-btn-primary">Explore Now</button>
        <button className="hero-btn-secondary">Learn More</button>
      </div>

    </section>
  )
}

export default Hero
