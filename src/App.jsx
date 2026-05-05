import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedSection from './components/FeaturedSection'
import MediaSection from './components/MediaSection'
import Footer from './components/Footer'
import PhotographerPage from './pages/PhotographerPage'
import TechPage from './pages/TechPage'
import './App.css'

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

function HomePage() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <FeaturedSection />
      <MediaSection />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollHandler />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/photographer/:id" element={<PhotographerPage />} />
        <Route path="/tech/:id" element={<TechPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
