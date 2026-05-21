import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { photographers } from '../data/photographers'
import { techItems } from '../data/techItems'

const KEY = import.meta.env.VITE_UNSPLASH_KEY

const cardImages = [
  '/Images/Timeless Toronto.jpg',
  '/Images/Smiling in the sunset.jpg',
  '/Images/Playing in the beach.jpg',
  '/Images/Playing at the park.jpg',
  '/Images/Playful puppy.jpg',
  '/Images/Raining fish.jpg',
]

const workers = [
  {
    name: 'Aaron Ashitey',
    role: 'Photographer',
    image: '/Art/1-71.jpg',
    description:
      'Meet the founder of Wyld perspective studios, a talented photographer known for his skills in caputring notable monets in life through videos, art and photographs all through the help of a lens',
  },
  {
    name: 'Matthew',
    role: 'Intern',
    image: '/Images/',
    description:
      'Currently an intern at wyld perspective studios, Matthew experienceing his first steps in the web development work force, experimening and expressing his creativity with wyld perspective studios through his tools of choice',
  },
  {
    name: 'Aryankumar',
    role: 'Intern',
    image: '/Art/aryan.jpg',
    description:
      'Aryan is a hard working intern at wyld perspective stuidos, an enthusiactic learner who is always looking to expand his knowlege and skills in the web development field, with a passion for creativity and a drive to succeed, Aryan is an asset to the team at wyld perspective studios',
  },
]

const getInitialTab = () => {
  const saved = sessionStorage.getItem('activeTab')

  if (saved) {
    sessionStorage.removeItem('activeTab')
    return saved
  }

  return 'media'
}

const slideIndex = {
  media: 0,
  photographers: 1,
  tech: 2,
}

function MediaCard({ category, title, description, image }) {
  return (
    <div className="media-card">
      <div className="card-thumbnail">
        {image && (
          <img
            src={image}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>

      <div className="card-content">
        <span className="card-category">{category}</span>
        <h4 className="card-title">{title}</h4>
        <p className="card-description">{description}</p>
      </div>
    </div>
  )
}

function PhotographerCard({ photographer, t }) {
  const navigate = useNavigate()

  return (
    <div
      className="photo-card"
      onClick={() => navigate(`/photographer/${photographer.id}`)}
    >
      <div className="photo-card-avatar">
        {photographer.avatar ? (
          <img
            src={photographer.avatar}
            alt={photographer.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          '[ Photo ]'
        )}
      </div>

      <div className="photo-card-info">
        <h4 className="photo-card-name">{photographer.name}</h4>
        <p className="photo-card-role">{photographer.role}</p>
        <p className="photo-card-location">{photographer.location}</p>
      </div>

      <button className="photo-card-btn">{t.media.viewProfile}</button>
    </div>
  )
}

function TechCard({ item, t }) {
  const navigate = useNavigate()
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        item.name + ' camera'
      )}&per_page=1&client_id=${KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.results?.[0]) {
          setPhoto(data.results[0].urls.small)
        }
      })
  }, [item.name])

  return (
    <div className="tech-card" onClick={() => navigate(`/tech/${item.id}`)}>
      <div className="tech-card-img">
        {photo ? (
          <img
            src={photo}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span style={{ color: '#555', fontSize: '13px' }}>
            {t.media.loading}
          </span>
        )}
      </div>

      <div className="tech-card-info">
        <span className="tech-card-category">{item.category}</span>
        <h4 className="tech-card-name">{item.name}</h4>
        <p className="tech-card-tagline">{item.tagline}</p>
        <span className="tech-card-price">{item.priceRange}</span>
      </div>

      <button className="photo-card-btn">{t.media.viewDetails}</button>
    </div>
  )
}

function MediaSection() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState(getInitialTab)
  const [workerIndex, setWorkerIndex] = useState(0)
  const [workerMove, setWorkerMove] = useState('')
  const [workerLocked, setWorkerLocked] = useState(false)

  const offset = slideIndex[activeTab] ?? 0

  const currentWorker = workers[workerIndex]
  const previousWorker = workers[(workerIndex - 1 + workers.length) % workers.length]
  const nextWorker = workers[(workerIndex + 1) % workers.length]

  const changeWorker = (way) => {
    if (workerLocked) {
      return
    }

    setWorkerLocked(true)
    setWorkerMove(way === 'next' ? 'moving-next' : 'moving-prev')

    setTimeout(() => {
      setWorkerIndex((current) => {
        if (way === 'next') {
          return current === workers.length - 1 ? 0 : current + 1
        }

        return current === 0 ? workers.length - 1 : current - 1
      })

      setWorkerMove('')
      setWorkerLocked(false)
    }, 420)
  }

  return (
    <section className="media-section" id="media">
      <div className="media-tabs">
        <button
          className={`media-tab ${activeTab === 'media' ? 'media-tab--active' : ''}`}
          onClick={() => setActiveTab('media')}
        >
          {t.media.latestMedia}
        </button>

        <button
          className={`media-tab ${activeTab === 'photographers' ? 'media-tab--active' : ''}`}
          onClick={() => setActiveTab('photographers')}
        >
          {t.media.photographers}
        </button>

        <button
          className={`media-tab ${activeTab === 'tech' ? 'media-tab--active' : ''}`}
          onClick={() => setActiveTab('tech')}
        >
          {t.media.tech}
        </button>
      </div>

      <div className="tab-viewport">
        <div
          className="tab-slider-3"
          style={{ transform: `translateX(-${offset * 33.333}%)` }}
        >
          <div className="tab-panel-3">
            <div className="media-grid">
              {t.media.cards.map((card, i) => (
                <MediaCard
                  key={i}
                  category={card.category}
                  title={card.title}
                  description={card.description}
                  image={cardImages[i]}
                />
              ))}
            </div>

            <section className="about-section" id="about">
              <div className="about-wrapper">
                <div className="about-content">
                  <span className="hero-tag">About Us</span>

                  <h2>About Wylb Perspective Studios</h2>

                  <div className="about-title-line"></div>

                  <p>
                    Wylb Perspective Studios is a creative media studio focused on
                    photography, video, art, and storytelling. Our goal is to capture
                    meaningful moments and present them with a unique visual style.
                  </p>

                  <p>
                    From personal photo shoots to creative videos and art-focused
                    projects, we help bring ideas to life through strong visuals and
                    a different perspective.
                  </p>
                </div>

                <div className="about-image">
                  <img
                    src="/Images/Timeless Toronto.jpg"
                    alt="Wylb Perspective Studios"
                  />
                </div>
              </div>
            </section>

            <section className="workers-section" id="workers">
              <div className="workers-wrapper">
                <div className="workers-content">
                  <span className="hero-tag">Our Team</span>

                  <h2>{currentWorker.name}</h2>

                  <div className="about-title-line"></div>

                  <h3>{currentWorker.role}</h3>

                  <p>{currentWorker.description}</p>
                </div>

                <div className={`workers-image-gallery ${workerMove}`}>
                  <button
                    type="button"
                    className="worker-gallery-arrow worker-gallery-arrow-left"
                    onClick={() => changeWorker('prev')}
                  >
                    &#10094;
                  </button>

                  <div className="worker-image-card worker-image-left">
                    <img src={previousWorker.image} alt={previousWorker.name} />
                  </div>

                  <div className="worker-image-card worker-image-main">
                    <img src={currentWorker.image} alt={currentWorker.name} />
                  </div>

                  <div className="worker-image-card worker-image-right">
                    <img src={nextWorker.image} alt={nextWorker.name} />
                  </div>

                  <button
                    type="button"
                    className="worker-gallery-arrow worker-gallery-arrow-right"
                    onClick={() => changeWorker('next')}
                  >
                    &#10095;
                  </button>
                </div>
              </div>
            </section>

            <section className="quick-links-section">
              <div className="quick-links-header">
                <h2>Explore More From Wyld Perspective</h2>

                <p>
                  Take a look at the different types that we do from photoshoots to video proges and art peices, we have a wide variety of work that we have done and are always looking to expand our portfolio with new and exciting projects, click on any of the categories below to explore more of our work and see how we can bring your ideas to life with our unique perspective and creative vision.
                </p>
              </div>

              <div className="quick-links-wrapper">
                <div className="quick-link-card">
                  <div className="quick-link-title">
                    <img src="/Images/OIP (13).webp" alt="Photos icon" />
                    <h3>Photos</h3>
                  </div>

                  <p>
                    View photo shoots, creative portraits, scenery, animals, and captured moments from Wyld Perspective Studios.
                  </p>

                  <div className="quick-link-actions">
                    <Link to="/photos" className="quick-link-button">
                      View Photos
                    </Link>
                  </div>
                </div>

                <div className="quick-link-card">
                  <div className="quick-link-title">
                    <img src="/Images/OIP (14).webp" alt="Videos icon" />
                    <h3>Videos</h3>
                  </div>

                  <p>
                    Watch video projects, short films, creative visuals, and storytelling work created by the studio.
                  </p>

                  <div className="quick-link-actions">
                    <Link to="/videos" className="quick-link-button">
                      View Videos
                    </Link>
                  </div>
                </div>

                <div className="quick-link-card">
                  <div className="quick-link-title">
                    <img src="/Images/OIP (15).webp" alt="Art icon" />
                    <h3>Art</h3>
                  </div>

                  <p>
                    Explore art projects, construction process shots, completed pieces, and creative visual work.
                  </p>

                  <div className="quick-link-actions">
                    <Link to="/art" className="quick-link-button">
                      View Art
                    </Link>
                  </div>
                </div>

                <div className="quick-link-card">
                  <div className="quick-link-title">
                    <img src="/icons/events.png" alt="Events icon" />
                    <h3>Events</h3>
                  </div>

                  <p>
                    Check upcoming events, studio updates, live sessions, and announcements from Wyld Perspective Studios.
                  </p>

                  <div className="quick-link-actions">
                    <Link to="/events" className="quick-link-button">
                      View Events
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <section className="packages-section">
              <div className="packages-header">
                <h2>Video Packages</h2>

                <p>
                 Browse the deals that we have for our videos and choose how good of a deal you want, we have different packages for different types of projects, whether you are looking to capture a special moment in your life or you want to create a creative video project, we have a package that can fit your needs and help you bring your ideas to life with our unique perspective and creative vision.
                </p>
              </div>

              <div className="packages-wrapper">
                <div className="package-card">
                  <h3>Video package One</h3>

                  <p>
                    - XXXXXXXXXXXXXXXXXXXXXXXXX
                  </p>

                   <p>
                    - XXXXXXXXXXXXXXXXXXXXXXXXX
                  </p>

                  <p>
                    - XXXXXXXXXXXXXXXXXXXXXXXXX
                  </p>

                   <p>
                    - XXXXXXXXXXXXXXXXXXXXXXXXX
                  </p>



                  <Link to="/contact" className="package-button">
                    Get started
                  </Link>
                </div>

                <div className="package-card">
                  <h3>Video Package Two</h3>

                  <p>
                    - XXXXXXXXXXXXXXXXXXXXXXXXX
                  </p>


                  <p>
                    - XXXXXXXXXXXXXXXXXXXXXXXXX
                  </p>

                  <p>
                    - XXXXXXXXXXXXXXXXXXXXXXXXX
                  </p>

                  <p>
                    - XXXXXXXXXXXXXXXXXXXXXXXXX
                  </p>

                  <p>
                    - XXXXXXXXXXXXXXXXXXXXXXXXX
                  </p>

                  <Link to="/contact" className="package-button">
                    Get started
                  </Link>
                </div>

                <div className="package-card">
                  <h3>Video Package Three</h3>

                  <p>
                    - XXXXXXXXXXXXXXXXXXXXXXXXX
                  </p>

                  <p>
                    - XXXXXXXXXXXXXXXXXXXXXXXXX
                  </p>

                  <p>
                    - XXXXXXXXXXXXXXXXXXXXXXXXX
                  </p>

                  <p>
                    - XXXXXXXXXXXXXXXXXXXXXXXXX
                  </p>

                  <p>
                    - XXXXXXXXXXXXXXXXXXXXXXXXX
                  </p>

                  <Link to="/contact" className="package-button">
                    Get started
                  </Link>
                </div>
              </div>
            </section>

            <section className="packages-section">
  <div className="packages-header">
    <h2>Art Packages</h2>

    <p>
      Here you can view what type of art packages we have to offer, whether you are looking to capture the process of a creative project or you want to create a unique piece of art, we have different packages that can fit your needs and help you bring your ideas to life with our unique perspective and creative vision.
    </p>
  </div>

  <div className="packages-wrapper">
    <div className="package-card">
      <h3>Art Package One</h3>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <Link to="/contact" className="package-button">
        Get started
      </Link>
    </div>

    <div className="package-card">
      <h3>Art Package Two</h3>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <Link to="/contact" className="package-button">
        Get started
      </Link>
    </div>

    <div className="package-card">
      <h3>Art Package Three</h3>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <Link to="/contact" className="package-button">
        Get started
      </Link>
    </div>
  </div>
</section>

<section className="packages-section">
  <div className="packages-header">
    <h2>Photo Packages</h2>

    <p>
      Here you may view the different photo packages that we have to offer, whether you are looking to capture a special moment in your life or you want to create a creative photo project, we have a package that can fit your needs and help you bring your ideas to life with our unique perspective and creative vision.
    </p>
  </div>

  <div className="packages-wrapper">
    <div className="package-card">
      <h3>Art Package One</h3>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <Link to="/contact" className="package-button">
        Get started
      </Link>
    </div>

    <div className="package-card">
      <h3>Art Package Two</h3>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <Link to="/contact" className="package-button">
        Get started
      </Link>
    </div>

    <div className="package-card">
      <h3>Art Package Three</h3>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <p>
        - XXXXXXXXXXXXXXXXXXXXXXXXX
      </p>

      <Link to="/contact" className="package-button">
        Get started
      </Link>
    </div>
  </div>
</section>

            

            <section className="home-contact-section">
              <div className="home-contact-box">
                <div className="home-contact-image">
                  <img
                    src="/Images/73a4aed8-50ec-4ecc-8cb9-23564c66d43d.png"
                    alt="Wyld Perspective contact"
                  />
                </div>

                <h2>Have an idea you want to bring to life?</h2>

                <p>
                  With the help of wyld perspective, we can bring an exception
                  high quality peice of work to life wether it be through a photo shoot
                  or a video project, or maybe you are interested in capturing an important moment
                  in you're life and you would like to enhnance that moment, we are here to help you bring your ideas to life with our unique perspective and creative vision, contact us today to get started on your next project.
                </p>

                <Link to="/contact" className="home-contact-button">
                  Contact Us
                </Link>
              </div>
            </section>
          </div>

          <div className="tab-panel-3">
            <div className="photographers-grid">
              {photographers.map((p) => (
                <PhotographerCard key={p.id} photographer={p} t={t} />
              ))}
            </div>
          </div>

          <div className="tab-panel-3">
            <div className="tech-grid">
              {techItems.map((item) => (
                <TechCard key={item.id} item={item} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MediaSection