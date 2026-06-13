import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const LOGIN_ROUTE = '/login'

function Contact() {
  const navigate = useNavigate()

  const [checkingLogin, setCheckingLogin] = useState(true)
  const [note, setNote] = useState(
    'This will open your email app with the request filled in.'
  )
  const [requestType, setRequestType] = useState('')
  const [selectedPackage, setSelectedPackage] = useState('')
  const [packageModalOpen, setPackageModalOpen] = useState(false)

  useEffect(() => {
    let isMounted = true

    const readServerResponse = async (response) => {
      const text = await response.text()

      if (!text) {
        return {}
      }

      try {
        return JSON.parse(text)
      } catch {
        return {
          error: text,
        }
      }
    }

    const checkLogin = async () => {
      try {
        const response = await fetch('/.netlify/functions/status', {
          method: 'GET',
          credentials: 'include',
        })

        const data = await readServerResponse(response)

        const loggedIn =
          response.ok &&
          Boolean(
            data.user ||
              data.currentUser ||
              data.loggedIn ||
              data.authenticated
          )

        if (!isMounted) {
          return
        }

        if (!loggedIn) {
          navigate(LOGIN_ROUTE, {
            replace: true,
            state: { from: '/contact' },
          })
          return
        }

        setCheckingLogin(false)
      } catch {
        if (isMounted) {
          navigate(LOGIN_ROUTE, {
            replace: true,
            state: { from: '/contact' },
          })
        }
      }
    }

    checkLogin()

    return () => {
      isMounted = false
    }
  }, [navigate])

  const openPackageModal = (type) => {
    setRequestType(type)
    setSelectedPackage('')
    setPackageModalOpen(true)
    setNote('Please choose a package before sending.')
  }

  const choosePackage = (packageName) => {
    setSelectedPackage(packageName)
    setPackageModalOpen(false)
    setNote('This will open your email app with the request filled in.')
  }

  const closePackageModal = () => {
    setPackageModalOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const firstName = String(formData.get('firstName') || '').trim()
    const lastName = String(formData.get('lastName') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const message = String(formData.get('message') || '').trim()

    if (
      !requestType ||
      !selectedPackage ||
      !firstName ||
      !lastName ||
      !email ||
      !message
    ) {
      setNote('Please fill out everything before sending.')
      return
    }

    const ownerEmail = 'dekock.matt@gmail.com'
    const subject = `Requesting ${requestType} ${selectedPackage} for ${firstName} ${lastName}`

    const emailBody =
      `Request Type: ${requestType}\n` +
      `Package: ${selectedPackage}\n` +
      `First Name: ${firstName}\n` +
      `Last Name: ${lastName}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`

    window.location.href = `mailto:${ownerEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(emailBody)}`
  }

  if (checkingLogin) {
    return (
      <div className="app">
        <section className="contact-hero">
          <div className="hero-overlay"></div>

          <div className="contact-page-content">
            <span className="hero-tag">Wylb Perspective</span>

            <h1 className="hero-title">Checking Account</h1>

            <p className="hero-subtitle">
              Please wait while we confirm your sign in status.
            </p>
          </div>
        </section>
      </div>
    )
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
              <label
                className={`contact-category ${
                  requestType === 'Art' ? 'contact-category--selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="requestType"
                  value="Art"
                  checked={requestType === 'Art'}
                  onChange={() => openPackageModal('Art')}
                  required
                />
                <span>Art</span>
              </label>

              <label
                className={`contact-category ${
                  requestType === 'Films' ? 'contact-category--selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="requestType"
                  value="Films"
                  checked={requestType === 'Films'}
                  onChange={() => openPackageModal('Films')}
                />
                <span>Films</span>
              </label>

              <label
                className={`contact-category ${
                  requestType === 'Photos' ? 'contact-category--selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="requestType"
                  value="Photos"
                  checked={requestType === 'Photos'}
                  onChange={() => openPackageModal('Photos')}
                />
                <span>Photos</span>
              </label>
            </div>

            {requestType && selectedPackage && (
              <p className="selected-package-text">
                Selected: {requestType} - {selectedPackage}
              </p>
            )}

            <div className="contact-input-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
            />

            <textarea
              name="message"
              placeholder="Describe your request"
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

      {packageModalOpen && (
        <div className="package-popup-overlay">
          <div className="package-popup">
            <h2>Choose a Package</h2>

            <p>Select a package for {requestType}</p>

            <div className="package-popup-options">
              <button type="button" onClick={() => choosePackage('Package One')}>
                Package One
              </button>

              <button type="button" onClick={() => choosePackage('Package Two')}>
                Package Two
              </button>

              <button
                type="button"
                onClick={() => choosePackage('Package Three')}
              >
                Package Three
              </button>
            </div>

            <button
              type="button"
              className="package-popup-cancel"
              onClick={closePackageModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Contact