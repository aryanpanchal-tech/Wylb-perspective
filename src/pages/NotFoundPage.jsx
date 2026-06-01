import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="nf-page">
      <div className="nf-content">
        <div className="nf-logo">W</div>
        <div className="nf-code">404</div>
        <h1 className="nf-title">Page Not Found</h1>
        <p className="nf-text">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button className="nf-btn" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  )
}
