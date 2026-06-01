/**
 * App.jsx — Root of the application
 *
 * Sets up React Router with two routes:
 *   /                    → HomePage (full landing page)
 *   /photographer/:id    → PhotographerPage (individual profile)
 *   /tech/:id            → TechPage (individual gear item)
 *
 * ScrollHandler reads router location.state to smoothly scroll
 * to a specific section after navigation (e.g. returning from a
 * detail page back to the photographers tab).
 */

import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import LanguageToggle from './components/LanguageToggle'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedSection from './components/FeaturedSection'
import MediaSection from './components/MediaSection'
import Footer from './components/Footer'
import PhotographerPage from './pages/PhotographerPage'
import TechPage from './pages/TechPage'
import Chatbot from './components/Chatbot/Chatbot'
import './App.css'

// Watches for location.state.scrollTo after any navigation
// and smoothly scrolls to the matching section id.
// The 100ms delay gives the DOM time to render before scrolling.
function ScrollHandler() {
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        document.getElementById(location.state.scrollTo)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [location])

  return null
}

// Main landing page — assembles all sections in order
function HomePage() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <FeaturedSection />
      <MediaSection />
      <Footer />
      <LanguageToggle />
    </div>
  )
}

// App wraps everything in BrowserRouter so any component
// can use React Router hooks (useNavigate, useParams, etc.)
function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollHandler />
        <Routes>
          <Route path="/"                  element={<HomePage />} />
          <Route path="/photographer/:id"  element={<PhotographerPage />} />
          <Route path="/tech/:id"          element={<TechPage />} />
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
