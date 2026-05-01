function Hero() {
  return (
    <section className="hero" id="hero">

      {/* ── VIDEO BACKGROUND ── */}
      {/* When company provides video, replace the div below with:       */}
      {/* <video autoPlay muted loop playsInline className="hero-video">  */}
      {/*   <source src="/video/hero.mp4" type="video/mp4" />            */}
      {/* </video>                                                        */}
      <div className="hero-video-placeholder">
        [ Company video goes here ]
      </div>

      {/* ── DARK OVERLAY so text is readable over video ── */}
      <div className="hero-overlay" />

      {/* ── CONTENT on top of video ── */}
      <div className="hero-content">

        <span className="hero-tag">Wylb Perspective</span>

        <h1 className="hero-title">
          Where Stories <br /> Come to Life
        </h1>

        <p className="hero-subtitle">
          Discover videos, photos, and stories from creators around the world.
        </p>

        <div className="hero-buttons">
          <button className="hero-btn-primary">Get Started</button>
          <button className="hero-btn-secondary">Learn More</button>
        </div>

      </div>

    </section>
  )
}

export default Hero
