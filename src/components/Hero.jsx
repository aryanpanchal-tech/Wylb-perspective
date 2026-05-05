/**
 * Hero.jsx — Full-screen landing section
 *
 * Structure:
 *   1. Video background  — placeholder div until company provides video file.
 *      To activate: uncomment the <video> block and place hero.mp4 in /public/video/
 *   2. Dark overlay      — semi-transparent layer so text stays readable over video
 *   3. Hero content      — tag, headline, subtitle, and two CTA buttons
 *
 * The section takes 100vh so it fills the entire screen on first load.
 * The navbar sits on top via position: fixed / z-index.
 */

function Hero() {
  return (
    <section className="hero" id="hero">

      {/* ── VIDEO BACKGROUND ──────────────────────────────────────────
          Replace the placeholder div below with this block once the
          company provides the video file (place it in /public/video/):

          <video autoPlay muted loop playsInline className="hero-video">
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
      ────────────────────────────────────────────────────────────── */}
      <div className="hero-video-placeholder">
        [ Company video goes here ]
      </div>

      {/* Semi-transparent black layer — improves text contrast over video */}
      <div className="hero-overlay" />

      {/* Content sits above the overlay using position: absolute */}
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
