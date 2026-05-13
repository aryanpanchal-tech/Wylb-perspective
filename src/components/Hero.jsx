import { useLanguage } from '../context/LanguageContext'

function Hero() {
  const { t } = useLanguage()

  return (
    <section className="hero" id="hero">
      <img src="/Images/Timeless Toronto 2.0.jpg" alt="Wylb Perspective" className="hero-bg-img" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <span className="hero-tag">{t.hero.tag}</span>
        <h1 className="hero-title">{t.hero.title}</h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>
        <div className="hero-buttons">
          <button className="hero-btn-primary">{t.hero.getStarted}</button>
          <button className="hero-btn-secondary">{t.hero.learnMore}</button>
        </div>
      </div>
    </section>
  )
}

export default Hero
