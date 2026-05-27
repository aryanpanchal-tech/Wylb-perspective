import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const fallbackEvents = [
  {
    id: 'fallback-1',
    source: 'Wylb Perspective',
    category: 'Live Events',
    title: 'Latest updates will appear here',
    description: 'YouTube and Instagram posts will show here once the API connection is ready.',
    image: '',
    url: '',
    date: '',
  },
  {
    id: 'fallback-2',
    source: 'Wylb Perspective',
    category: 'Live Events',
    title: 'Instagram updates',
    description: 'Instagram posts from Wylb Perspective Studios can appear here.',
    image: '',
    url: '',
    date: '',
  },
  {
    id: 'fallback-3',
    source: 'Wylb Perspective',
    category: 'Live Events',
    title: 'YouTube updates',
    description: 'YouTube videos from Wylb Perspective Studios can appear here.',
    image: '',
    url: '',
    date: '',
  },
]

function Events() {
  const [events, setEvents] = useState(fallbackEvents)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('Loading latest posts...')
  const [lastUpdated, setLastUpdated] = useState('')

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch('/.netlify/functions/events')
        const result = await response.json()

        if (!response.ok) {
          setMessage(result.error || 'Could not load latest posts.')
          setLoading(false)
          return
        }

        if (result.events && result.events.length > 0) {
          setEvents(result.events)
          setMessage('')
          setLastUpdated(new Date().toLocaleTimeString())
        } else {
          setEvents(fallbackEvents)
          setMessage('No social media posts found yet.')
        }
      } catch (error) {
        setEvents(fallbackEvents)
        setMessage('Could not connect to the events feed.')
      }

      setLoading(false)
    }

    loadEvents()

    const refreshTimer = setInterval(() => {
      loadEvents()
    }, 300000)

    return () => {
      clearInterval(refreshTimer)
    }
  }, [])

  return (
    <div className="app">
      <Navbar />

      <section className="hero" id="events">
        <div className="hero-video-placeholder">
          [ Event showcase goes here ]
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="hero-tag">Wylb Perspective</span>

          <h1 className="hero-title">
            Ongoing Events <br />
          </h1>

          <p className="hero-subtitle">
            Events, videos, Instagram posts, and updates from Wylb Perspective Studios can be found here.
          </p>
        </div>
      </section>

      <section className="media-grid-section events-feed-section" id="media">
        <h2 className="section-title">Latest Posts</h2>

        {lastUpdated && (
          <p className="events-feed-updated">
            Last updated: {lastUpdated}
          </p>
        )}

        {loading && (
          <p className="events-feed-message">
            {message}
          </p>
        )}

        {!loading && message && (
          <p className="events-feed-message">
            {message}
          </p>
        )}

        <div className="media-grid events-feed-grid">
          {events.map((event) => (
            <article className="media-card event-card" key={event.id}>
              <div className="card-thumbnail event-card-thumbnail">
                {event.image ? (
                  <img src={event.image} alt={event.title} />
                ) : (
                  <span>[ Live event image ]</span>
                )}
              </div>

              <div className="card-content">
                <span className="card-category">
                  {event.source} / {event.category}
                </span>

                <h3 className="card-title">
                  {event.title}
                </h3>

                <p className="card-description">
                  {event.description}
                </p>

                {event.date && (
                  <p className="event-date">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                )}

                {event.url && (
                  <a
                    className="event-link"
                    href={event.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Post
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Events