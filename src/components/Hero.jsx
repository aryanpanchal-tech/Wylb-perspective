import { useLanguage } from '../context/LanguageContext'

const brandLogos = [
  '/Images/PULSE.jpg',
  '/Images/RDDC.jpg',
  '/Images/TCBN.jpg',
  '/Images/C3T.jpg',
  '/Images/TTTI.jpg',
]

function Hero() {
  const { t } = useLanguage()

  return (
    <section className="hero" id="hero">
      <video
        className="hero-bg-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/Videos/Keke @ 40 60fps.mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay" />

      <div className="hero-content">
        <span className="hero-tag">{t.hero.tag}</span>

        <h1 className="hero-title">{t.hero.title}</h1>

        <p className="hero-subtitle">{t.hero.subtitle}</p>

        <div className="hero-buttons">
          <button className="hero-btn-primary">
            {t.hero.getStarted}
          </button>

          <button className="hero-btn-secondary">
            {t.hero.learnMore}
          </button>
        </div>
      </div>

      <div className="hero-brand-strip">
        <div className="hero-brand-title">
          <span>Brands that Wyld SP has collaborated with</span>
        </div>

        <div className="hero-brand-scroll-window">
          <div className="hero-brand-track">
            {[...brandLogos, ...brandLogos, ...brandLogos].map((logo, index) => (
              <div className="hero-brand-logo" key={`${logo}-${index}`}>
                <img src={logo} alt="Brand logo" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero