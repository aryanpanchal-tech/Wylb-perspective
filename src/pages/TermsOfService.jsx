import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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

function TermsOfService() {
  return (
    <div className="app">
      <Navbar />

      <section className="terms-page-hero">
        <div className="terms-hero-bg">
          <img src="/Images/Timeless Toronto.jpg" alt="Terms background" />
        </div>

        <div className="hero-overlay"></div>

        <div className="terms-top-content">
          <span className="hero-tag">Wylb Perspective</span>

          <h1 className="hero-title">
            Terms of <br />
            Service
          </h1>

          <p className="hero-subtitle">
            Review the terms for photo shoots, video work, art services, bookings, and creative requests.
          </p>
        </div>

        <div className="terms-bottom-boxes">
          {terms.map((term) => (
            <div className="terms-info-card" key={term.title}>
              <div className="terms-card-image-placeholder">
                {term.icon ? (
                  <img src={term.icon} alt={`${term.title} icon`} />
                ) : (
                  <span>Add Icon</span>
                )}
              </div>

              <span className="terms-card-category">{term.category}</span>

              <h3>{term.title}</h3>

              <p>{term.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default TermsOfService