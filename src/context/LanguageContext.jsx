import { createContext, useContext, useState } from 'react'
import { translations } from '../data/translations'

const LanguageContext = createContext()

// Wrap the whole app with this so every component can read the language
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')
  const t = translations[language]
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Call this inside any component to get { language, setLanguage, t }
export function useLanguage() {
  return useContext(LanguageContext)
}
