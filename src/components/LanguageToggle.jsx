import { useLanguage } from '../context/LanguageContext'

function LanguageToggle() {
  const { language, setLanguage, theme, toggleTheme } = useLanguage()

  return (
    <div className="lang-float">
      <button className="lang-theme-btn" onClick={toggleTheme} title="Toggle theme">
        {theme === 'dark' ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </button>
      <span className="lang-float-divider">|</span>
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
