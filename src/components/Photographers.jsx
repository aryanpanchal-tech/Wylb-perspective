import { useNavigate } from 'react-router-dom'
import { photographers } from '../data/photographers'

function PhotographerCard({ photographer }) {
  const navigate = useNavigate()

  return (
    <div className="photo-card">

      {/* ── AVATAR PLACEHOLDER ── */}
      <div className="photo-card-avatar">
        [ Photo ]
      </div>

      {/* ── INFO ── */}
      <div className="photo-card-info">
        <h4 className="photo-card-name">{photographer.name}</h4>
        <p className="photo-card-role">{photographer.role}</p>
        <p className="photo-card-location">{photographer.location}</p>
      </div>

      {/* ── VIEW PROFILE BUTTON ── */}
      <button
        className="photo-card-btn"
        onClick={() => navigate(`/photographer/${photographer.id}`)}
      >
        View Profile
      </button>

    </div>
  )
}

function Photographers() {
  return (
    <section className="photographers-section" id="photographers">

      <h2 className="section-title">Our Photographers</h2>

      <div className="photographers-grid">
        {photographers.map((p) => (
          <PhotographerCard key={p.id} photographer={p} />
        ))}
      </div>

    </section>
  )
}

export default Photographers
