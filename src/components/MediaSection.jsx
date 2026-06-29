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
    image: '/Images/Timeless Toronto.jpg',
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
  {
    name: 'Name Here',
    role: 'Role Here',
    image: '/Images/Smiling in the sunset.jpg',
    description: 'Description here.',
  },
  {
    name: 'Name Here',
    role: 'Role Here',
    image: '/Images/Playing at the park.jpg',
    description: 'Description here.',
  },
  {
    name: 'Name Here',
    role: 'Role Here',
    image: '/Images/Playing in the beach.jpg',
    description: 'Description here.',
  },
  {
    name: 'Name Here',
    role: 'Role Here',
    image: '/Images/Playful puppy.jpg',
    description: 'Description here.',
  },
  {
    name: 'Name Here',
    role: 'Role Here',
    image: '/Images/Timeless Toronto 2.0.jpg',
    description: 'Description here.',
  },
]

const terms = [
  {
    title: 'General Agreement',
    category: 'Terms',
    icon: '/Images/general-agreement-transparent.png',
    description:
      'By visiting wyld perspectve, you are agreeing to sharing information and allowing us to use it for marketing purpouses, this does not include private information',
  },
  {
    title: 'Booking and Requests',
    category: 'Bookings',
    icon: '/Images/Requests.png',
    description:
      'Once booking please wait for a response, we will get back to you within 48 hours, if you have not heard from us please reach out again as we may have missed your message, failiure to reply after 48 hours after the confirmation was sent, you may loose a booking and will only be regranted a 75% refund.',
  },
  {
    title: 'Payment Terms',
    category: 'Payments',
    icon: '/Images/payment-icon-transparent.png',
    description:
      'After reaching a complete understanding of the project, a full payment must be made before proceeding with the work, If unsatisfied with the results, you may either request a 50% refund or a free reshoot.',
  },
  {
    title: 'Cancellations and Rescheduling',
    category: 'Scheduling',
    icon: '/Images/cancellation-reschedule-transparent.png',
    description:
      'For any reason if there is a conflict in schedule, please message us a day in advance to reschedule, Failiure to do so will result in a 25% fine of the price',
  },
  {
    title: 'Photo, Video, and Art Usage',
    category: 'Usage',
    icon: '/Images/fair-use-business-transparent.png',
    description:
      'Wyld perspective studios has the right to use any photos videos or art peices created for marketing purposes, this includes reshoots if the client was unsatisfied with the results.',
  },
]

const services = {
  creativeDirection: {
    title: 'Creative Direction & Concept Development',
    category: 'Creative Services',
    description:
      'Every great project starts with a strong idea. We work with brands, organizations, and individuals to develop creative concepts, visual strategies, and storytelling approaches that align with their goals and audience.',
    services: [
      'Creative consultation',
      'Campaign concepts',
      'Brand storytelling',
      'Visual strategy',
      'Content planning',
      'Creative project development',
    ],
  },

  videoProduction: {
    title: 'Video Production',
    category: 'Production',
    description:
      'We create powerful visual content that captures attention and communicates your message effectively. Our production team manages every stage of the process, from planning and filming to editing and delivery.',
    services: [
      'Corporate videos',
      'Commercials',
      'Brand films',
      'Promotional content',
      'Interviews',
      'Event highlights',
      'Documentary production',
      'Social media video content',
    ],
  },

  liveProduction: {
    title: 'Live Production & Streaming',
    category: 'Live Media',
    description:
      'We deliver professional live experiences that connect audiences anywhere in the world. Our team provides reliable production solutions for events, conferences, performances, and broadcasts.',
    services: [
      'Multi-camera live production',
      'Live streaming',
      'Virtual events',
      'Conference production',
      'Hybrid event solutions',
      'Broadcast support',
    ],
  },

  postProduction: {
    title: 'Post-Production & Visual Design',
    category: 'Post-Production',
    description:
      'Our post-production team transforms raw footage into polished, engaging content through creative editing and visual storytelling.',
    services: [
      'Video editing',
      'Color grading',
      'Motion graphics',
      'Animation',
      'Visual effects',
      'Sound design',
      'Content optimization',
    ],
  },

  photographyContent: {
    title: 'Photography & Visual Content',
    category: 'Photography',
    description:
      'We create professional imagery that strengthens brand identity and captures meaningful moments.',
    services: [
      'Corporate photography',
      'Event photography',
      'Brand photography',
      'Portraits',
      'Product photography',
      'Creative campaigns',
    ],
  },

  brandStrategy: {
    title: 'Brand Strategy & Digital Marketing',
    category: 'Brand Development',
    description:
      'Beyond production, we help brands build stronger connections with their audiences through creative strategy and digital storytelling.',
    services: [
      'Brand consultation',
      'Social media management',
      'Content strategy',
      'Digital campaigns',
      'Marketing support',
      'Audience engagement strategies',
    ],
  },

  webDevelopment: {
    title: 'Web Development & Digital Experiences',
    category: 'Digital Development',
    description:
      'We create digital platforms that support your brand presence and improve audience experience.',
    services: [
      'Website development',
      'Website design',
      'Digital content integration',
      'Creative web solutions',
    ],
  },

  eventPlanning: {
    title: 'Event Planning & Production',
    category: 'Events',
    description:
      'We support events from concept to execution, ensuring every detail aligns with the creative vision.',
    services: [
      'Event production',
      'Creative event concepts',
      'Audio-visual coordination',
      'Production management',
      'On-site technical support',
    ],
  },
}

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
  terms: 3,
}

const teamBoardStyles = {
  section: {
    width: 'min(1180px, 90%)',
    maxWidth: '1180px',
    margin: '70px auto',
    padding: '48px',
    display: 'block',
    position: 'relative',
    boxSizing: 'border-box',
    border: '4px solid currentColor',
    borderRadius: '12px',
    overflow: 'hidden',
    background: 'rgba(255, 255, 255, 0.08)',
    color: 'inherit',
  },
  content: {
    width: '100%',
    maxWidth: 'none',
    margin: 0,
    padding: 0,
    display: 'block',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  },
  fading: {
    opacity: 0,
    transform: 'scale(0.97)',
  },
  header: {
    width: 'min(760px, 100%)',
    margin: '0 auto 38px',
    textAlign: 'center',
  },
  title: {
    margin: '12px 0 14px',
    fontSize: 'clamp(2.3rem, 5vw, 4.4rem)',
    lineHeight: 1,
  },
  intro: {
    margin: '0 auto',
    maxWidth: '720px',
    lineHeight: 1.6,
    fontWeight: 800,
  },
  grid: {
    width: '100%',
    maxWidth: 'none',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '24px',
    margin: 0,
    padding: 0,
  },
  card: {
    position: 'relative',
    width: '100%',
    aspectRatio: '1 / 1',
    padding: 0,
    margin: 0,
    display: 'block',
    overflow: 'hidden',
    border: '3px solid currentColor',
    borderRadius: '14px',
    background: 'rgba(0, 0, 0, 0.16)',
    color: 'inherit',
    cursor: 'pointer',
  },
  imageWrap: {
    width: '100%',
    height: '100%',
    border: 'none',
    borderRadius: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
  },
  nameStrip: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: '58px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    background: 'rgba(0, 0, 0, 0.72)',
    color: '#ffffff',
    textAlign: 'center',
    boxSizing: 'border-box',
  },
  name: {
    margin: 0,
    color: '#ffffff',
    fontSize: '1.35rem',
    fontWeight: 900,
    lineHeight: 1.1,
  },
  selectedView: {
    minHeight: '620px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '28px',
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: '13px 20px',
    border: '3px solid currentColor',
    borderRadius: '12px',
    background: 'transparent',
    color: 'inherit',
    fontWeight: 900,
    cursor: 'pointer',
  },
  selectedBox: {
    display: 'grid',
    gridTemplateColumns: 'minmax(320px, 0.85fr) 1fr',
    gap: '42px',
    alignItems: 'center',
    padding: '38px',
    border: '4px solid currentColor',
    borderRadius: '18px',
    background: 'rgba(0, 0, 0, 0.16)',
  },
  selectedImageWrap: {
    width: '100%',
    minHeight: '500px',
    border: '4px solid currentColor',
    borderRadius: '16px',
    overflow: 'hidden',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
  },
  selectedTitle: {
    margin: '16px 0 18px',
    fontSize: 'clamp(2.6rem, 6vw, 5.2rem)',
    lineHeight: 1,
  },
  selectedRole: {
    margin: '0 0 22px',
    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
  },
  selectedDescription: {
    margin: 0,
    maxWidth: '720px',
    lineHeight: 1.8,
    fontWeight: 800,
    fontSize: '1.1rem',
  },
}

function MediaCard({ category, title, description, image }) {
  return (
    <div className="media-card">
      <div className="card-thumbnail">
        {image && (
          <img
            src={image}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
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
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [workerFading, setWorkerFading] = useState(false)
  const [selectedTerm, setSelectedTerm] = useState(null)
  const [termFading, setTermFading] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [serviceFading, setServiceFading] = useState(false)

  const offset = slideIndex[activeTab] ?? 0

  const changeTab = (tab) => {
    setActiveTab(tab)

    if (tab !== 'terms') {
      setSelectedTerm(null)
      setTermFading(false)
    }
  }

  const openTerm = (term) => {
    setTermFading(true)

    setTimeout(() => {
      setSelectedTerm(term)
      setTermFading(false)
    }, 300)
  }

  const closeTerm = () => {
    setTermFading(true)

    setTimeout(() => {
      setSelectedTerm(null)
      setTermFading(false)
    }, 300)
  }

  const openWorker = (worker) => {
    setWorkerFading(true)

    setTimeout(() => {
      setSelectedWorker(worker)
      setWorkerFading(false)
    }, 300)
  }

  const closeWorker = () => {
    setWorkerFading(true)

    setTimeout(() => {
      setSelectedWorker(null)
      setWorkerFading(false)
    }, 300)
  }

  const openService = (service) => {
    if (serviceFading) {
      return
    }

    setServiceFading(true)

    setTimeout(() => {
      setSelectedService(service)
      setServiceFading(false)
    }, 300)
  }

  const closeService = () => {
    if (serviceFading) {
      return
    }

    setServiceFading(true)

    setTimeout(() => {
      setSelectedService(null)
      setServiceFading(false)
    }, 300)
  }

  return (
    <section className="media-section" id="media">
      <div className="media-section-frame">
        <div className="media-tabs">
          <button
            className={`media-tab ${activeTab === 'media' ? 'media-tab--active' : ''}`}
            onClick={() => changeTab('media')}
          >
            {t.media.latestMedia}
          </button>

          <button
            className={`media-tab ${activeTab === 'photographers' ? 'media-tab--active' : ''}`}
            onClick={() => changeTab('photographers')}
          >
            {t.media.photographers}
          </button>

          <button
            className={`media-tab ${activeTab === 'tech' ? 'media-tab--active' : ''}`}
            onClick={() => changeTab('tech')}
          >
            {t.media.tech}
          </button>

          <button
            className={`media-tab ${activeTab === 'terms' ? 'media-tab--active' : ''}`}
            onClick={() => changeTab('terms')}
          >
            Terms of Service
          </button>
        </div>

        <div className="tab-viewport">
          <div
            className="tab-slider-4"
            style={{ transform: `translateX(-${offset * 25}%)` }}
          >
            <div className="tab-panel-4">
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
            </div>

            <div className="tab-panel-4">
              <div className="photographers-grid">
                {photographers.map((p) => (
                  <PhotographerCard key={p.id} photographer={p} t={t} />
                ))}
              </div>
            </div>

            <div className="tab-panel-4">
              <div className="tech-grid">
                {techItems.map((item) => (
                  <TechCard key={item.id} item={item} t={t} />
                ))}
              </div>
            </div>

            <div className="tab-panel-4">
              <section
                className={`media-terms-preview ${selectedTerm ? 'media-terms-preview--selected' : ''} ${termFading ? 'media-terms-preview--fading' : ''}`}
              >
                <div className="media-terms-bg">
                  <img
                    src="/Images/Timeless Toronto.jpg"
                    alt="Terms background"
                  />
                </div>

                <div className="media-terms-overlay"></div>

                <div className="media-terms-content">
                  {!selectedTerm && (
                    <>
                      <div className="media-terms-heading">
                        <span className="hero-tag">Wylb Perspective</span>

                        <h2>
                          Terms of <br />
                          Service
                        </h2>

                        <p>
                          Review the terms for photo shoots, video work, art
                          services, bookings, and creative requests.
                        </p>
                      </div>

                      <div className="media-terms-boxes">
                        {terms.map((term) => (
                          <button
                            type="button"
                            className="media-terms-card"
                            key={term.title}
                            onClick={() => openTerm(term)}
                          >
                            <div className="media-terms-icon">
                              {term.icon ? (
                                <img
                                  src={term.icon}
                                  alt={`${term.title} icon`}
                                />
                              ) : (
                                <span>Add Icon</span>
                              )}
                            </div>

                            <span>{term.category}</span>

                            <h3>{term.title}</h3>
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {selectedTerm && (
                    <div className="media-terms-selected-view">
                      <button
                        type="button"
                        className="media-terms-selected-back"
                        onClick={closeTerm}
                      >
                        Back to Terms
                      </button>

                      <div className="media-terms-selected-box">
                        <div className="media-terms-selected-icon">
                          <img
                            src={selectedTerm.icon}
                            alt={`${selectedTerm.title} icon`}
                          />
                        </div>

                        <span>{selectedTerm.category}</span>

                        <h2>{selectedTerm.title}</h2>

                        <p>{selectedTerm.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

  <section className="middle-board-section">
  <div className="middle-board-content">
    <div className="middle-board-column middle-board-column-1">
      <img
        src="/Images/Professional confidence.png"
        alt="Professional confidence"
        className="middle-board-image"
      />

      <div className="middle-board-shade"></div>

      <h2 className="middle-board-title">
        Our Services
      </h2>
    </div>

    <div className="middle-board-column middle-board-column-2">
      <img
        src="/Images/MZS09877.jpg"
        alt="Creative portrait"
        className="middle-board-image"
      />

      <div className="middle-board-shade"></div>

      <h2 className="middle-board-title">
        About Section
      </h2>
    </div>

    <div className="middle-board-column middle-board-column-3">
      <img
        src="/Images/IMG_3616.png"
        alt="Professional portrait"
        className="middle-board-image"
      />

      <div className="middle-board-shade"></div>

      <h2 className="middle-board-title">
        Why Work With Us?
      </h2>
    </div>
  </div>
</section>

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

      <section
        className="team-board-section"
        id="team-workers"
        style={teamBoardStyles.section}
      >
        <div
          className={`team-board-content ${selectedWorker ? 'team-board-content--selected' : ''} ${
            workerFading ? 'team-board-content--fading' : ''
          }`}
          style={{
            ...teamBoardStyles.content,
            ...(workerFading ? teamBoardStyles.fading : {}),
          }}
        >
          {!selectedWorker && (
            <>
              <div className="team-board-header" style={teamBoardStyles.header}>
                <span className="hero-tag">Our Team</span>

                <h2 style={teamBoardStyles.title}>Meet The Team</h2>

                <p style={teamBoardStyles.intro}>
                  Click on a team member to view their full profile, image, role,
                  and description.
                </p>
              </div>

              <div className="team-board-grid" style={teamBoardStyles.grid}>
                {workers.map((worker, index) => (
                  <button
                    type="button"
                    className="team-board-card"
                    key={`${worker.name}-${index}`}
                    onClick={() => openWorker(worker)}
                    style={teamBoardStyles.card}
                  >
                    <div
                      className="team-board-image"
                      style={teamBoardStyles.imageWrap}
                    >
                      <img
                        src={worker.image}
                        alt={worker.name}
                        style={teamBoardStyles.image}
                      />
                    </div>

                    <div
                      className="team-board-name-strip"
                      style={teamBoardStyles.nameStrip}
                    >
                      <h3 style={teamBoardStyles.name}>{worker.name}</h3>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {selectedWorker && (
            <div
              className="team-board-selected-view"
              style={teamBoardStyles.selectedView}
            >
              <button
                type="button"
                className="team-board-back"
                onClick={closeWorker}
                style={teamBoardStyles.backButton}
              >
                Back to Team
              </button>

              <div
                className="team-board-selected-box"
                style={teamBoardStyles.selectedBox}
              >
                <div
                  className="team-board-selected-image"
                  style={teamBoardStyles.selectedImageWrap}
                >
                  <img
                    src={selectedWorker.image}
                    alt={selectedWorker.name}
                    style={teamBoardStyles.selectedImage}
                  />
                </div>

                <div className="team-board-selected-info">
                  <span className="hero-tag">Team Member</span>

                  <h2 style={teamBoardStyles.selectedTitle}>
                    {selectedWorker.name}
                  </h2>

                  <h3 style={teamBoardStyles.selectedRole}>
                    {selectedWorker.role}
                  </h3>

                  <p style={teamBoardStyles.selectedDescription}>
                    {selectedWorker.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section
        className="quick-links-section services-showcase"
        id="services"
      >
        <div
          className={`services-showcase-content ${
            selectedService
              ? 'services-showcase-content--selected'
              : ''
          } ${
            serviceFading
              ? 'services-showcase-content--fading'
              : ''
          }`}
        >
          {!selectedService && (
            <>
              <div className="quick-links-header">
                <h2>Explore More From Wyld Perspective</h2>

                <p>
                  Take a look at the different types of work and services
                  offered by Wyld Perspective Studios. Select any service
                  below to learn more about what it includes.
                </p>
              </div>

              <div className="quick-links-wrapper">
                <div className="quick-link-card">
                  <div className="quick-link-title">
                    <img
                      src="/Images/OIP (13).webp"
                      alt="Photos icon"
                    />
                    <h3>Photos</h3>
                  </div>

                  <p>
                    View photo shoots, creative portraits, scenery, animals,
                    and captured moments from Wyld Perspective Studios.
                  </p>

                  <div className="quick-link-actions">
                    <Link
                      to="/photos"
                      className="quick-link-button"
                    >
                      View Photos
                    </Link>
                  </div>
                </div>

                <div className="quick-link-card">
                  <div className="quick-link-title">
                    <img
                      src="/Images/OIP (14).webp"
                      alt="Videos icon"
                    />
                    <h3>Videos</h3>
                  </div>

                  <p>
                    Watch video projects, short films, creative visuals, and
                    storytelling work created by the studio.
                  </p>

                  <div className="quick-link-actions">
                    <Link
                      to="/videos"
                      className="quick-link-button"
                    >
                      View Videos
                    </Link>
                  </div>
                </div>

                <div className="quick-link-card">
                  <div className="quick-link-title">
                    <img
                      src="/Images/OIP (15).webp"
                      alt="Art icon"
                    />
                    <h3>Art</h3>
                  </div>

                  <p>
                    Explore art projects, construction process shots,
                    completed pieces, and creative visual work.
                  </p>

                  <div className="quick-link-actions">
                    <Link
                      to="/art"
                      className="quick-link-button"
                    >
                      View Art
                    </Link>
                  </div>
                </div>

                <div className="quick-link-card">
                  <div className="quick-link-title">
                    <img
                      src="/icons/events.png"
                      alt="Events icon"
                    />
                    <h3>Events</h3>
                  </div>

                  <p>
                    Check upcoming events, studio updates, live sessions,
                    and announcements from Wyld Perspective Studios.
                  </p>

                  <div className="quick-link-actions">
                    <Link
                      to="/events"
                      className="quick-link-button"
                    >
                      View Events
                    </Link>
                  </div>
                </div>

                <div className="quick-link-card quick-link-service-card">
                  <div className="quick-link-title">
                    <h3>
                      Creative Direction &amp; Concept Development
                    </h3>
                  </div>

                 
                  <div className="quick-link-actions">
                    <button
                      type="button"
                      className="quick-link-button"
                      onClick={() =>
                        openService(services.creativeDirection)
                      }
                    >
                      View More
                    </button>
                  </div>
                </div>

                <div className="quick-link-card quick-link-service-card">
                  <div className="quick-link-title">
                    <h3>Video Production</h3>
                  </div>

                

                  <div className="quick-link-actions">
                    <button
                      type="button"
                      className="quick-link-button"
                      onClick={() =>
                        openService(services.videoProduction)
                      }
                    >
                      View More
                    </button>
                  </div>
                </div>

                <div className="quick-link-card quick-link-service-card">
                  <div className="quick-link-title">
                    <h3>Live Production &amp; Streaming</h3>
                  </div>

                

                  <div className="quick-link-actions">
                    <button
                      type="button"
                      className="quick-link-button"
                      onClick={() =>
                        openService(services.liveProduction)
                      }
                    >
                      View More
                    </button>
                  </div>
                </div>

                <div className="quick-link-card quick-link-service-card">
                  <div className="quick-link-title">
                    <h3>Post-Production &amp; Visual Design</h3>
                  </div>

              
                  <div className="quick-link-actions">
                    <button
                      type="button"
                      className="quick-link-button"
                      onClick={() =>
                        openService(services.postProduction)
                      }
                    >
                      View More
                    </button>
                  </div>
                </div>

                <div className="quick-link-card quick-link-service-card">
                  <div className="quick-link-title">
                    <h3>Photography &amp; Visual Content</h3>
                  </div>
                
                  <div className="quick-link-actions">
                    <button
                      type="button"
                      className="quick-link-button"
                      onClick={() =>
                        openService(services.photographyContent)
                      }
                    >
                      View More
                    </button>
                  </div>
                </div>

                <div className="quick-link-card quick-link-service-card">
                  <div className="quick-link-title">
                    <h3>Brand Strategy &amp; Digital Marketing</h3>
                  </div>

            
                  <div className="quick-link-actions">
                    <button
                      type="button"
                      className="quick-link-button"
                      onClick={() =>
                        openService(services.brandStrategy)
                      }
                    >
                      View More
                    </button>
                  </div>
                </div>

                <div className="quick-link-card quick-link-service-card">
                  <div className="quick-link-title">
                    <h3>Web Development &amp; Digital Experiences</h3>
                  </div>


                  <div className="quick-link-actions">
                    <button
                      type="button"
                      className="quick-link-button"
                      onClick={() =>
                        openService(services.webDevelopment)
                      }
                    >
                      View More
                    </button>
                  </div>
                </div>

                <div className="quick-link-card quick-link-service-card">
                  <div className="quick-link-title">
                    <h3>Event Planning &amp; Production</h3>
                  </div>


                  <div className="quick-link-actions">
                    <button
                      type="button"
                      className="quick-link-button"
                      onClick={() =>
                        openService(services.eventPlanning)
                      }
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedService && (
  <div className="service-selected-view">
    <button
      type="button"
      className="service-selected-back"
      onClick={closeService}
    >
      Back to view all services
    </button>

    <div className="service-selected-box">
      <div className="service-selected-info">
        <h2>{selectedService.title}</h2>

        <div className="about-title-line"></div>

        <p>{selectedService.description}</p>

        <h3 className="service-list-title">
          Services include:
        </h3>

        <ul className="service-list">
          {selectedService.services.map((serviceItem) => (
            <li key={serviceItem}>
              {serviceItem}
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="quick-link-button service-contact-button"
        >
          Contact Us
        </Link>
      </div>
    </div>
  </div>
)}
        </div>
      </section>

      <section className="packages-section">
        <div className="packages-header">
          <h2>Video Packages</h2>

          <p>
            Browse the deals that we have for our videos and choose how good of
            a deal you want, we have different packages for different types of
            projects, whether you are looking to capture a special moment in
            your life or you want to create a creative video project, we have a
            package that can fit your needs and help you bring your ideas to
            life with our unique perspective and creative vision.
          </p>
        </div>

        <div className="packages-wrapper">
          <div className="package-card">
            <h3>Video package One</h3>

            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>

            <Link to="/contact" className="package-button">
              Get started
            </Link>
          </div>

          <div className="package-card">
            <h3>Video Package Two</h3>

            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>

            <Link to="/contact" className="package-button">
              Get started
            </Link>
          </div>

          <div className="package-card">
            <h3>Video Package Three</h3>

            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>

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
            Here you can view what type of art packages we have to offer,
            whether you are looking to capture the process of a creative project
            or you want to create a unique piece of art, we have different
            packages that can fit your needs and help you bring your ideas to
            life with our unique perspective and creative vision.
          </p>
        </div>

        <div className="packages-wrapper">
          <div className="package-card">
            <h3>Art Package One</h3>

            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>

            <Link to="/contact" className="package-button">
              Get started
            </Link>
          </div>

          <div className="package-card">
            <h3>Art Package Two</h3>

            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>

            <Link to="/contact" className="package-button">
              Get started
            </Link>
          </div>

          <div className="package-card">
            <h3>Art Package Three</h3>

            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>

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
            Here you may view the different photo packages that we have to
            offer, whether you are looking to capture a special moment in your
            life or you want to create a creative photo project, we have a
            package that can fit your needs and help you bring your ideas to
            life with our unique perspective and creative vision.
          </p>
        </div>

        <div className="packages-wrapper">
          <div className="package-card">
            <h3>Photo Package One</h3>

            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>

            <Link to="/contact" className="package-button">
              Get started
            </Link>
          </div>

          <div className="package-card">
            <h3>Photo Package Two</h3>

            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>

            <Link to="/contact" className="package-button">
              Get started
            </Link>
          </div>

          <div className="package-card">
            <h3>Photo Package Three</h3>

            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>- XXXXXXXXXXXXXXXXXXXXXXXXX</p>

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
            With the help of wyld perspective, we can bring an exception high
            quality peice of work to life wether it be through a photo shoot or
            a video project, or maybe you are interested in capturing an
            important moment in you're life and you would like to enhnance that
            moment, we are here to help you bring your ideas to life with our
            unique perspective and creative vision, contact us today to get
            started on your next project.
          </p>

          <Link to="/contact" className="home-contact-button">
            Contact Us
          </Link>
        </div>
      </section>
    </section>
  )
}

export default MediaSection