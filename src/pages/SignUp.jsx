import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LanguageToggle from '../components/LanguageToggle'

function SignUp() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const updateField = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/.netlify/functions/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setMessage(
          result.error ||
            'Could not begin account registration.'
        )
        return
      }

      const verificationEmail =
        result.email ||
        formData.email.trim().toLowerCase()

      /*
        Save the email temporarily so the verification page
        can still find it if the page is refreshed.
      */
      sessionStorage.setItem(
        'verificationEmail',
        verificationEmail
      )

      navigate('/verify-email', {
        state: {
          email: verificationEmail,
        },
      })
    } catch (error) {
      console.error('Signup error:', error)

      setMessage(
        `Could not connect to the server: ${error.message}`
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <Navbar />

      <section className="auth-page auth-page--image signup-auth-page">
        <img
          src="/Images/Timeless Toronto 2.0.jpg"
          alt="Wylb Perspective background"
          className="auth-bg-image"
        />

        <div className="auth-video-overlay"></div>

        <div className="auth-card">
          <span className="hero-tag">
            Wylb Perspective
          </span>

          <h1>Create Account</h1>

          <p>
            Create an account with your basic sign up
            information.
          </p>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <div className="auth-name-row">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={updateField}
                autoComplete="given-name"
                required
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={updateField}
                autoComplete="family-name"
                required
              />
            </div>

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={updateField}
              autoComplete="username"
              minLength={3}
              maxLength={20}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={updateField}
              autoComplete="email"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={updateField}
              autoComplete="new-password"
              minLength={8}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={updateField}
              autoComplete="new-password"
              minLength={8}
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
              disabled={loading}
            >
              {loading
                ? 'Sending verification code...'
                : 'Create Account'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>

      <Footer />
      <LanguageToggle />
    </div>
  )
}

export default SignUp