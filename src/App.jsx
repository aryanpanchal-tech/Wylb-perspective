import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedSection from './components/FeaturedSection'
import MediaGrid from './components/MediaGrid'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="app">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Hero />
      <FeaturedSection />
      <MediaGrid />
      <Footer />
    </div>
  )
}

export default App
