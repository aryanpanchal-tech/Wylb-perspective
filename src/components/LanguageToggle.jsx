import { useLanguage } from '../context/LanguageContext'

function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="lang-float">
      <button
        className={`lang-float-btn ${language === 'en' ? 'lang-float-btn--active' : ''}`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
      <span className="lang-float-divider">|</span>
      <button
        className={`lang-float-btn ${language === 'fr' ? 'lang-float-btn--active' : ''}`}
        onClick={() => setLanguage('fr')}
      >
        FR
      </button>
    </div>
  )
}

export default LanguageToggle
