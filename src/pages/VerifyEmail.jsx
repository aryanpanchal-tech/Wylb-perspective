import { useState } from 'react'
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LanguageToggle from '../components/LanguageToggle'

function VerifyEmail() {
  const location = useLocation()
  const navigate = useNavigate()

  const savedEmail =
    sessionStorage.getItem('verificationEmail') || ''

  const email = location.state?.email || savedEmail

  const [verificationCode, setVerificationCode] =
    useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCodeChange = (event) => {
    const enteredCode = event.target.value
      .replace(/\D/g, '')
      .slice(0, 5)

    setVerificationCode(enteredCode)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')

    if (!email) {
      setMessage(
        'Your email address could not be found. Please sign up again.'
      )
      return
    }

    if (verificationCode.length !== 5) {
      setMessage(
        'Please enter the complete 5-digit verification code.'
      )
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        '/.netlify/functions/verify-email',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            verificationCode,
          }),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        setMessage(
          result.error ||
            'The verification code could not be confirmed.'
        )
        return
      }

      // The email is no longer needed once verification succeeds.
      sessionStorage.removeItem('verificationEmail')

      setMessage(
        'Your email has been verified and your account is ready.'
      )

      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (error) {
      console.error('Verification error:', error)

      setMessage(
        `Could not connect to the server: ${error.message}`
      )
    } finally {
      setLoading(false)
    }
  }

  const buttonDisabled =
    loading ||
    verificationCode.length !== 5 ||
    !email

  return (
    <div className="app">
      <Navbar />

      <section className="auth-page auth-page--image verify-email-page">
        <img
          src="/Images/Timeless Toronto 2.0.jpg"
          alt="Wylb Perspective background"
          className="auth-bg-image"
        />

        <div className="auth-video-overlay"></div>

        <div className="auth-card verify-email-card">
          <span className="hero-tag">
            Wylb Perspective
          </span>

          <h1>Verify Your Email</h1>

          {email ? (
            <p>
              We sent a 5-digit verification code to:
              <strong className="verification-email">
                {email}
              </strong>
            </p>
          ) : (
            <p>
              Your email address could not be found.
            </p>
          )}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="verificationCode"
              className="verification-code-input"
              placeholder="00000"
              value={verificationCode}
              onChange={handleCodeChange}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={5}
              aria-label="Five-digit verification code"
              required
            />

            {message && (
              <p className="auth-message">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="auth-button"
              disabled={buttonDisabled}
            >
              {loading
                ? 'Verifying...'
                : 'Verify Email'}
            </button>
          </form>

          <p className="auth-switch">
            Entered the wrong email?{' '}
            <Link to="/signup">
              Return to sign up
            </Link>
          </p>
        </div>
      </section>

      <Footer />
      <LanguageToggle />
    </div>
  )
}

export default VerifyEmail
