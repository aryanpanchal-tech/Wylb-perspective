import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LanguageToggle from '../components/LanguageToggle'

function UserPage() {
  const navigate = useNavigate()

  const [activeSection, setActiveSection] = useState('account')
  const [account, setAccount] = useState(null)
  const [profilePreview, setProfilePreview] = useState('')

  const [savedPosts, setSavedPosts] = useState([])
  const [message, setMessage] = useState('Loading saved posts...')

  const [searchText, setSearchText] = useState('')
  const [mediaFilter, setMediaFilter] = useState('all')
  const [sortType, setSortType] = useState('default')

  const [usernameForm, setUsernameForm] = useState({
    username: '',
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [accountChangeMessage, setAccountChangeMessage] = useState('')

  const [deleteStep, setDeleteStep] = useState(0)
  const [deleteMessage, setDeleteMessage] = useState('')
  const [deletingAccount, setDeletingAccount] = useState(false)

  const loadAccountInfo = async () => {
    try {
      const response = await fetch('/.netlify/functions/status', {
        credentials: 'include',
      })

      const result = await response.json()

      if (response.ok && result.user) {
        setAccount(result.user)

        setUsernameForm({
          username: result.user.username || '',
        })
      } else {
        setAccount(null)
      }
    } catch (error) {
      setAccount(null)
    }
  }

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

  const getPostType = (post) => {
    const mediaType = String(post.mediaType || '').toLowerCase()
    const category = String(post.category || '').toLowerCase()
    const source = String(post.source || '').toLowerCase()
    const image = String(post.image || '').toLowerCase()
    const url = String(post.url || '').toLowerCase()

    if (mediaType) {
      return mediaType
    }

    if (source.includes('youtube') || category.includes('video') || url.includes('/videos')) {
      return 'video'
    }

    if (image.includes('/art/') || category.includes('art')) {
      return 'art'
    }

    return 'photo'
  }

  const filteredSavedPosts = useMemo(() => {
    const typed = searchText.toLowerCase().trim()

    let list = savedPosts.filter((post) => {
      const postType = getPostType(post)

      const words = `
        ${post.source || ''}
        ${post.category || ''}
        ${post.title || ''}
        ${post.description || ''}
        ${postType}
      `.toLowerCase()

      const matchesSearch = words.includes(typed)
      const matchesType = mediaFilter === 'all' || postType === mediaFilter

      return matchesSearch && matchesType
    })

    if (sortType === 'az') {
      list = [...list].sort((first, second) => {
        return String(first.title || '').toLowerCase().localeCompare(
          String(second.title || '').toLowerCase()
        )
      })
    }

    if (sortType === 'newest') {
      list = [...list].sort((first, second) => {
        return new Date(second.savedAt || second.date || 0) - new Date(first.savedAt || first.date || 0)
      })
    }

    return list
  }, [savedPosts, searchText, mediaFilter, sortType])

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return 'Not available'
    }

    return new Date(dateValue).toLocaleDateString()
  }

  const updateUsernameField = (event) => {
    setUsernameForm({
      username: event.target.value,
    })
  }

  const updatePasswordField = (event) => {
    const fieldName = event.target.name
    const fieldValue = event.target.value

    setPasswordForm((currentForm) => ({
      ...currentForm,
      [fieldName]: fieldValue,
    }))
  }

  const changeUsername = async (event) => {
    event.preventDefault()
    setAccountChangeMessage('')

    try {
      const response = await fetch('/.netlify/functions/account-changes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          action: 'username',
          username: usernameForm.username,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setAccountChangeMessage(result.error || 'Could not update username.')
        return
      }

      setAccountChangeMessage('Username updated.')
      await loadAccountInfo()
      window.dispatchEvent(new Event('accountUpdated'))
    } catch (error) {
      setAccountChangeMessage('Could not connect to the server.')
    }
  }

  const changePassword = async (event) => {
    event.preventDefault()
    setAccountChangeMessage('')

    try {
      const response = await fetch('/.netlify/functions/account-changes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          action: 'password',
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
          confirmPassword: passwordForm.confirmPassword,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setAccountChangeMessage(result.error || 'Could not update password.')
        return
      }

      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })

      setAccountChangeMessage('Password updated.')
    } catch (error) {
      setAccountChangeMessage('Could not connect to the server.')
    }
  }

  const chooseProfileImage = (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setProfilePreview(reader.result)
    }

    reader.readAsDataURL(file)
  }

  const saveProfileImage = async (event) => {
    event.preventDefault()
    setAccountChangeMessage('')

    if (!profilePreview) {
      setAccountChangeMessage('Please choose a profile image first.')
      return
    }

    try {
      const response = await fetch('/.netlify/functions/account-changes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          action: 'profileImage',
          profileImage: profilePreview,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setAccountChangeMessage(result.error || 'Could not update profile picture.')
        return
      }

      setAccountChangeMessage('Profile picture updated.')
      setProfilePreview('')

      await loadAccountInfo()
      window.dispatchEvent(new Event('accountUpdated'))
    } catch (error) {
      setAccountChangeMessage('Could not connect to the server.')
    }
  }

  const openDeleteWarning = () => {
    setDeleteMessage('')
    setDeleteStep(1)
  }

  const closeDeleteWarning = () => {
    if (deletingAccount) {
      return
    }

    setDeleteMessage('')
    setDeleteStep(0)
  }

  const continueDeleteWarning = () => {
    setDeleteMessage('')
    setDeleteStep(2)
  }

  const deleteAccount = async () => {
    setDeleteMessage('')
    setDeletingAccount(true)

    try {
      const response = await fetch('/.netlify/functions/delete-account', {
        method: 'POST',
        credentials: 'include',
      })

      const result = await response.json()

      if (!response.ok) {
        setDeleteMessage(result.error || 'Could not delete account.')
        setDeletingAccount(false)
        return
      }

      setDeleteMessage('Your account has been deleted.')

      window.dispatchEvent(new Event('accountUpdated'))

      setTimeout(() => {
        navigate('/')
      }, 1400)
    } catch (error) {
      setDeleteMessage('Could not connect to the server.')
      setDeletingAccount(false)
    }
  }

  useEffect(() => {
    loadAccountInfo()
    loadSavedPosts()
  }, [])

  return (
    <div className="app">
      <Navbar />

      <section className="user-page">
        <div className="user-page-layout">
          <aside className="user-side-bar">
            <h2>User</h2>

            <button
              type="button"
              className={`user-side-link ${activeSection === 'account' ? 'user-side-link--active' : ''}`}
              onClick={() => setActiveSection('account')}
            >
              Account Info
            </button>

            <button
              type="button"
              className={`user-side-link ${activeSection === 'saved' ? 'user-side-link--active' : ''}`}
              onClick={() => setActiveSection('saved')}
            >
              Saved Posts
            </button>

            <button
              type="button"
              className={`user-side-link ${activeSection === 'settings' ? 'user-side-link--active' : ''}`}
              onClick={() => setActiveSection('settings')}
            >
              Settings
            </button>

            <button
              type="button"
              className="user-side-link user-delete-account-button"
              onClick={openDeleteWarning}
            >
              Delete Account
            </button>
          </aside>

          <main className="user-page-content">
            {activeSection === 'account' && (
              <div className="user-page-card user-info-card">
                {account ? (
                  <>
                    <div className="account-profile-header">
                      <div className="account-profile-picture">
                        {account.profileImage ? (
                          <img src={account.profileImage} alt={account.username} />
                        ) : (
                          <span>{account.username?.charAt(0).toUpperCase()}</span>
                        )}
                      </div>

                      <div>
                        <h2>@{account.username}</h2>
                      </div>
                    </div>

                    <div className="account-info-grid">
                      <div className="account-info-row">
                        <span>First Name</span>
                        <strong>{account.firstName}</strong>
                      </div>

                      <div className="account-info-row">
                        <span>Last Name</span>
                        <strong>{account.lastName}</strong>
                      </div>

                      <div className="account-info-row">
                        <span>Username</span>
                        <strong>@{account.username}</strong>
                      </div>

                      <div className="account-info-row">
                        <span>Email</span>
                        <strong>{account.email}</strong>
                      </div>

                      <div className="account-info-row account-password-row">
                        <span>Password</span>
                        <strong className="password-stars">************</strong>
                      </div>

                      <div className="account-info-row">
                        <span>Role</span>
                        <strong>{account.role}</strong>
                      </div>

                      <div className="account-info-row">
                        <span>Account Created</span>
                        <strong>{formatDate(account.createdAt)}</strong>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="user-page-message">
                    Could not load account information.
                  </p>
                )}
              </div>
            )}

            {activeSection === 'saved' && (
              <div className="user-page-card user-saved-posts-card">
                <span className="hero-tag">Wylb Perspective</span>

                <h1>Saved Posts</h1>

                <div className="saved-post-controls photo-controls">
                  <input
                    type="text"
                    className="photo-search"
                    placeholder="Search saved posts..."
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                  />

                  <select
                    className="photo-filter"
                    value={mediaFilter}
                    onChange={(event) => setMediaFilter(event.target.value)}
                  >
                    <option value="all">Show All</option>
                    <option value="photo">Photos</option>
                    <option value="video">Videos</option>
                    <option value="art">Art</option>
                  </select>

                  <select
                    className="photo-filter"
                    value={sortType}
                    onChange={(event) => setSortType(event.target.value)}
                  >
                    <option value="default">Default Order</option>
                    <option value="newest">Newest Saved</option>
                    <option value="az">A-Z</option>
                  </select>
                </div>

                {message && (
                  <p className="user-page-message">
                    {message}
                  </p>
                )}

                {!message && filteredSavedPosts.length === 0 && (
                  <p className="user-page-message">
                    No saved posts match this filter.
                  </p>
                )}

                <div className="saved-posts-grid">
                  {filteredSavedPosts.map((post) => (
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
                          {getPostType(post)} / {post.category}
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
            )}

            {activeSection === 'settings' && (
              <div className="user-page-card user-info-card account-changes-card">
                <span className="hero-tag">Wylb Perspective</span>

                <h1>Account Changes</h1>

                {accountChangeMessage && (
                  <p className="user-page-message">
                    {accountChangeMessage}
                  </p>
                )}

                <div className="account-change-wrapper">
                  <h2 className="account-change-title">
                    Profile Picture
                  </h2>

                  <div className="account-change-section">
                    <form className="account-change-form" onSubmit={saveProfileImage}>
                      <div className="profile-picture-preview">
                        {profilePreview || account?.profileImage ? (
                          <img
                            src={profilePreview || account.profileImage}
                            alt="Profile preview"
                          />
                        ) : (
                          <span>No profile picture</span>
                        )}
                      </div>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={chooseProfileImage}
                      />

                      <button type="submit">
                        Update Profile Picture
                      </button>
                    </form>
                  </div>
                </div>

                <div className="account-change-wrapper">
                  <h2 className="account-change-title">
                    Change Username
                  </h2>

                  <div className="account-change-section">
                    <form className="account-change-form" onSubmit={changeUsername}>
                      <input
                        type="text"
                        name="username"
                        placeholder="New username"
                        value={usernameForm.username}
                        onChange={updateUsernameField}
                        required
                      />

                      <button type="submit">
                        Update Username
                      </button>
                    </form>
                  </div>
                </div>

                <div className="account-change-wrapper">
                  <h2 className="account-change-title">
                    Change Password
                  </h2>

                  <div className="account-change-section">
                    <form className="account-change-form" onSubmit={changePassword}>
                      <input
                        type="password"
                        name="currentPassword"
                        placeholder="Current password"
                        value={passwordForm.currentPassword}
                        onChange={updatePasswordField}
                        required
                      />

                      <input
                        type="password"
                        name="newPassword"
                        placeholder="New password"
                        value={passwordForm.newPassword}
                        onChange={updatePasswordField}
                        required
                      />

                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        value={passwordForm.confirmPassword}
                        onChange={updatePasswordField}
                        required
                      />

                      <button type="submit">
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </section>

      {deleteStep > 0 && (
        <div className="delete-account-overlay">
          <div className="delete-account-modal">
            {deleteStep === 1 && (
              <>
                <h2>Delete Account?</h2>

                <div className="delete-warning-text">
                  Are you sure you want to delete your account?
                </div>

                <div className="delete-account-actions">
                  <button
                    type="button"
                    className="delete-account-cancel"
                    onClick={closeDeleteWarning}
                    disabled={deletingAccount}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="delete-account-confirm"
                    onClick={continueDeleteWarning}
                    disabled={deletingAccount}
                  >
                    Yes, Continue
                  </button>
                </div>
              </>
            )}

            {deleteStep === 2 && (
              <>
                <h2>Final Warning</h2>

                <div className="delete-warning-text">
                  If you delete your account, you will lose your profile information,
                  saved posts, settings, and account access. This cannot be undone.
                </div>

                <div className="delete-warning-text">
                  Are you really sure you want to delete your account?
                </div>

                {deleteMessage && (
                  <div className="delete-account-message">
                    {deleteMessage}
                  </div>
                )}

                <div className="delete-account-actions">
                  <button
                    type="button"
                    className="delete-account-cancel"
                    onClick={closeDeleteWarning}
                    disabled={deletingAccount}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="delete-account-confirm"
                    onClick={deleteAccount}
                    disabled={deletingAccount}
                  >
                    {deletingAccount ? 'Deleting...' : 'Yes, Delete My Account'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
      <LanguageToggle />
    </div>
  )
}

export default UserPage