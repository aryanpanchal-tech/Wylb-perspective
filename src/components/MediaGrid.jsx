const placeholderCards = [
  { id: 1, category: 'Video', title: 'Media Title One',   description: 'Short description here.' },
  { id: 2, category: 'Photo', title: 'Media Title Two',   description: 'Short description here.' },
  { id: 3, category: 'Video', title: 'Media Title Three', description: 'Short description here.' },
  { id: 4, category: 'Audio', title: 'Media Title Four',  description: 'Short description here.' },
  { id: 5, category: 'Photo', title: 'Media Title Five',  description: 'Short description here.' },
  { id: 6, category: 'Video', title: 'Media Title Six',   description: 'Short description here.' },
]

function MediaCard({ category, title, description }) {
  return (
    <div className="media-card">

      {/* ── CARD THUMBNAIL ── */}
      <div className="card-thumbnail">
        [ Thumbnail ]
      </div>

      {/* ── CARD CONTENT ── */}
      <div className="card-content">
        <span className="card-category">{category}</span>
        <h4 className="card-title">{title}</h4>
        <p className="card-description">{description}</p>
      </div>

    </div>
  )
}

function MediaGrid() {
  return (
    <section className="media-grid-section" id="media">

      <h2 className="section-title">Latest Media</h2>

      {/* ── GRID OF CARDS ── */}
      <div className="media-grid">
        {placeholderCards.map((card) => (
          <MediaCard
            key={card.id}
            category={card.category}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>

    </section>
  )
}

export default MediaGrid
