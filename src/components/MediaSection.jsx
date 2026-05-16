import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
    role: 'Founder / Photographer',
    image: '/Art/1-71.jpg',
    description:
      'Aaron is the founder of Wyld Perspective Studios. He focuses on photography, video, and art, using the camera to capture moments that feel meaningful and real.',
  },
  {
    name: 'Matthew',
    role: 'Web Development Intern',
    image: '/Images/Matthew.png',
    description:
      'Matthew is currently working as an intern with Wyld Perspective Studios. He is helping build the website, test page ideas, and shape the online experience for the studio.',
  },
  {
    name: 'Aryankumar',
    role: 'Web Development Intern',
    image: '/Art/aryan.jpg',
    description:
      'Aryan is an intern at Wyld Perspective Studios who helps with web development work. He is focused on learning, improving his skills, and contributing to the creative side of the project.',
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

            <div className="about-workers-box">
              <section className="about-section" id="about">
                <div className="about-wrapper">
                  <div className="about-content">
                    <span className="hero-tag">About Us</span>

                    <h2>About Wyld Perspective Studios</h2>

                    <div className="about-title-line"></div>

                    <p>
                      Wyld Perspective Studios is a creative media studio focused on
                      photography, video, art, and storytelling. The goal is to capture
                      meaningful moments and present them with a strong visual style.
                    </p>

                    <p>
                      From personal photo shoots to creative videos and art-focused
                      projects, the studio helps bring ideas to life through visuals
                      and a different perspective.
                    </p>
                  </div>

                  <div className="about-image">
                    <img
                      src="/Images/67905086_2338137339605593_2509062775553130496_n.jpg"
                      alt="Wyld Perspective Studios"
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
            </div>
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