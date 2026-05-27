import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LanguageToggle from '../components/LanguageToggle'

function Login() {
  const navigate = useNavigate()

  const [loginInfo, setLoginInfo] = useState({
    login: '',
    password: '',
  })

  const [message, setMessage] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)

  const handleChange = (event) => {
    const fieldName = event.target.name
    const fieldValue = event.target.value

    setLoginInfo((currentInfo) => ({
      ...currentInfo,
      [fieldName]: fieldValue,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setMessage('')
    setIsSigningIn(true)

    try {
      const response = await fetch('/.netlify/functions/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(loginInfo),
      })

      const result = await response.json()

      if (!response.ok) {
        setMessage(result.error || 'Could not sign in.')
        setIsSigningIn(false)
        return
      }

      setMessage('Signed in successfully.')

      setTimeout(() => {
        navigate('/')
      }, 800)
    } catch (error) {
      setMessage('Could not connect to the server.')
    }

    setIsSigningIn(false)
  }

  return (
    <div className="app">
      <Navbar />

      <section className="auth-page auth-page--video login-auth-page">
        <video
          className="auth-bg-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/Videos/auth-bg.mp4" type="video/mp4" />
        </video>

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
              value={loginInfo.login}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginInfo.password}
              onChange={handleChange}
              required
            />

            {message && (
              <p className="auth-message">
                {message}
              </p>
            )}

            <button type="submit" className="auth-button" disabled={isSigningIn}>
              {isSigningIn ? 'Signing in...' : 'Sign In'}
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