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
        setMessage(result.error || 'Could not create account.')
        setLoading(false)
        return
      }

      setMessage('Account created successfully.')

      setTimeout(() => {
        navigate('/login')
      }, 900)
    } catch (error) {
      setMessage('Could not connect to the server.')
    }

    setLoading(false)
  }

  return (
    <div className="app">
      <Navbar />

      <section className="auth-page auth-page--video signup-auth-page">
        <video
          className="auth-bg-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/Videos/Keke%20%40%2040%2060fps.mp4" type="video/mp4" />
        </video>

        <div className="auth-video-overlay"></div>

        <div className="auth-card">
          <span className="hero-tag">Wylb Perspective</span>

          <h1>Create Account</h1>

          <p>
            Create an account with your basic sign up information.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-name-row">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={updateField}
                required
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={updateField}
                required
              />
            </div>

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={updateField}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={updateField}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={updateField}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={updateField}
              required
            />

            {message && (
              <p className="auth-message">
                {message}
              </p>
            )}

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>

      <Footer />
      <LanguageToggle />
    </div>
  )
}

export default SignUp