import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LanguageToggle from '../components/LanguageToggle'

function UserPage() {
  const [savedPosts, setSavedPosts] = useState([])
  const [message, setMessage] = useState('Loading saved posts...')

  const loadSavedPosts = async () => {
    try {
      const response = await fetch('/.netlify/functions/saved-posts', {
        credentials: 'include',
      })

      const result = await response.json()

      if (!response.ok) {
        setMessage(result.error || 'Could not load saved posts.')
        return
      }

      setSavedPosts(result.posts || [])

      if (!result.posts || result.posts.length === 0) {
        setMessage('No saved posts yet.')
      } else {
        setMessage('')
      }
    } catch (error) {
      setMessage('Could not connect to the server.')
    }
  }

  const removeSavedPost = async (postId) => {
    try {
      const response = await fetch('/.netlify/functions/remove-saved-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ postId }),
      })

      if (!response.ok) {
        setMessage('Could not remove post.')
        return
      }

      setSavedPosts((currentPosts) => {
        return currentPosts.filter((post) => post.id !== postId)
      })
    } catch (error) {
      setMessage('Could not connect to the server.')
    }
  }

  useEffect(() => {
    loadSavedPosts()
  }, [])

  return (
    <div className="app">
      <Navbar />

      <section className="user-page">
        <div className="user-page-layout">
          <aside className="user-side-bar">
            <h2>User</h2>

            <button type="button" className="user-side-link">
              Account Info
            </button>

            <button type="button" className="user-side-link">
              Saved Posts
            </button>

          </aside>

          <main className="user-page-content">
            <div className="user-page-card user-saved-posts-card">
              <span className="hero-tag">Wylb Perspective</span>

              <h1>Saved Posts</h1>

              {message && (
                <p className="user-page-message">
                  {message}
                </p>
              )}

              <div className="saved-posts-grid">
                {savedPosts.map((post) => (
                  <article className="saved-post-card" key={post.id}>
                    <div className="saved-post-image">
                      {post.image ? (
                        <img src={post.image} alt={post.title} />
                      ) : (
                        <span>No image</span>
                      )}
                    </div>

                    <div className="saved-post-info">
                      <span className="card-category">
                        {post.source} / {post.category}
                      </span>

                      <h3>{post.title}</h3>

                      <p>{post.description}</p>

                      <div className="saved-post-actions">
                        {post.url && (
                          <a
                            href={post.url}
                            target="_blank"
                            rel="noreferrer"
                            className="saved-post-link"
                          >
                            View Post
                          </a>
                        )}

                        <button
                          type="button"
                          className="saved-post-remove"
                          onClick={() => removeSavedPost(post.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </main>
        </div>
      </section>

      <Footer />
      <LanguageToggle />
    </div>
  )
}

export default UserPage