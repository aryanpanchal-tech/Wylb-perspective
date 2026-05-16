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

import Photos from './pages/Photos'
import Videos from './pages/Videos'
import Events from './pages/Events'
import Art from './pages/Art'
import Tech from './pages/Tech'
import Contact from './pages/Contact'

import './App.css'

function ScrollHandler() {
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        document.getElementById(location.state.scrollTo)?.scrollIntoView({
          behavior: 'smooth',
        })
      }, 100)
    }
  }, [location])

  return null
}

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

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollHandler />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/photographer/:id" element={<PhotographerPage />} />
          <Route path="/tech/:id" element={<TechPage />} />

          <Route path="/photos" element={<Photos />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/events" element={<Events />} />
          <Route path="/art" element={<Art />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App