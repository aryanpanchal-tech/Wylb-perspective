import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Contact() {
  const [note, setNote] = useState('This will open your email app with the request filled in.')

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)

    const requestType = formData.get('requestType')
    const firstName = formData.get('firstName').trim()
    const lastName = formData.get('lastName').trim()
    const email = formData.get('email').trim()
    const message = formData.get('message').trim()

    if (!requestType || firstName === '' || lastName === '' || email === '' || message === '') {
      setNote('Please fill out everything before sending.')
      return
    }

    const ownerEmail = 'dekock.matt@gmail.com'
    const subject = `Requesting ${requestType} piece for ${firstName} ${lastName}`

    const emailBody =
      `Request Type: ${requestType}\n` +
      `Name: ${firstName} ${lastName}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`

    window.location.href =
      `mailto:${ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`
  }

  return (
    <div className="app">
      <Navbar />

      <section className="contact-hero">
        <div className="hero-overlay"></div>

        <div className="contact-page-content">
          <span className="hero-tag">Wylb Perspective</span>

          <h1 className="hero-title">
            Request a <br />
            Creative Shoot
          </h1>

          <p className="hero-subtitle">
            Select the work you would like to recieve and describe the request.
          </p>

          <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
            <div className="contact-category-row">
              <label className="contact-category">
                <input type="radio" name="requestType" value="Art" required />
                <span>Art</span>
              </label>

              <label className="contact-category">
                <input type="radio" name="requestType" value="Films" />
                <span>Films</span>
              </label>

              <label className="contact-category">
                <input type="radio" name="requestType" value="Photos" />
                <span>Photos</span>
              </label>
            </div>

            <div className="contact-input-row">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                required
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
            />

            <textarea
              name="message"
              placeholder="Go ahead, describe the shoot you would like to see..."
              required
            ></textarea>

            <button type="submit" className="hero-btn-primary">
              Proceed to email
            </button>

            <p className="contact-note" id="contactNote">
              {note}
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Contact