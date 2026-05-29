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
import UserPage from './pages/UserPage'

import Photos from './pages/Photos'
import Videos from './pages/Videos'
import Events from './pages/Events'
import Art from './pages/Art'
import Tech from './pages/Tech'
import Contact from './pages/Contact'
import TermsOfService from './pages/TermsOfService'
import SignUp from './pages/SignUp'
import Login from './pages/Login'

import './App.css'
import './themes/classic-modern.css'
import './themes/clean-light.css'
import './themes/rose-gold.css'
import './themes/photo-display.css'

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
          <Route path="/userPage" element={<UserPage />} />

          <Route path="/photos" element={<Photos />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/events" element={<Events />} />
          <Route path="/art" element={<Art />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<TermsOfService />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App