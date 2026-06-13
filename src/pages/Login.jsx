import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LanguageToggle from '../components/LanguageToggle'

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    login: '',
    password: '',
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
    setLoading(true)

    try {
      const response = await fetch('/.netlify/functions/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        setMessage(result.error || 'Could not sign in.')
        setLoading(false)
        return
      }

      setMessage('Signed in successfully.')

      window.dispatchEvent(new Event('accountUpdated'))

      setTimeout(() => {
        navigate('/')
      }, 800)
    } catch (error) {
      setMessage(`Could not connect to the server: ${error.message}`)
    }

    setLoading(false)
  }

  return (
    <div className="app">
      <Navbar />

      <section className="auth-page auth-page--image login-auth-page">
        <img
          src="/Images/Timeless Toronto 2.0.jpg"
          alt="Wylb Perspective background"
          className="auth-bg-image"
        />

        <div className="auth-video-overlay"></div>

        <div className="auth-card">
          <span className="hero-tag">Wylb Perspective</span>

          <h1>Sign In</h1>

          <p>
            Sign in with your email or username.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="login"
              placeholder="Email or username"
              value={formData.login}
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

            {message && (
              <p className="auth-message">
                {message}
              </p>
            )}

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="auth-switch">
            Do not have an account? <Link to="/signup">Create one</Link>
          </p>
        </div>
      </section>

      <Footer />
      <LanguageToggle />
    </div>
  )
}

export default Login