import { useState, useEffect } from 'react'

export default function SplashScreen({ onDone }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 2200)
    const doneTimer = setTimeout(() => onDone(), 2800)
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer) }
  }, [onDone])

  return (
    <div className={`splash ${fading ? 'splash--fade' : ''}`}>
      <div className="splash-content">
        <div className="splash-logo">W</div>
        <div className="splash-name">WYLB PERSPECTIVE</div>
        <div className="splash-tagline">Where Stories Come to Life</div>
        <div className="splash-bar">
          <div className="splash-bar-fill" />
        </div>
      </div>
    </div>
  )
}
