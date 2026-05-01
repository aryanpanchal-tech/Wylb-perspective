function FeaturedSection() {
  return (
    <section className="featured" id="featured">

      <h2 className="section-title">Featured</h2>

      <div className="featured-card">

        {/* ── FEATURED IMAGE / THUMBNAIL ── */}
        <div className="featured-thumbnail">
          [ Image goes here ]
        </div>

        {/* ── FEATURED TEXT CONTENT ── */}
        <div className="featured-info">
          <span className="featured-tag">Category</span>
          <h3 className="featured-title">Featured Article or Video Title</h3>
          <p className="featured-description">
            Short description of the featured content goes here.
          </p>
          <button className="featured-button">Watch / Read</button>
        </div>

      </div>

    </section>
  )
}

export default FeaturedSection
