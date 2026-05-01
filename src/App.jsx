import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedSection from './components/FeaturedSection'
import MediaGrid from './components/MediaGrid'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <FeaturedSection />
      <MediaGrid />
      <Footer />
    </div>
  )
}

export default App
