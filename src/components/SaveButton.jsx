import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SaveButton({ item, type = 'post' }) {
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  const saveItem = async () => {
    setMessage('')
    setSaving(true)

    try {
      const statusResponse = await fetch('/.netlify/functions/status', {
        credentials: 'include',
      })

      if (!statusResponse.ok) {
        navigate('/login')
        return
      }

      const itemToSave = {
        id: item.id || item.src || item.url || item.title,
        source: item.source || 'Wylb Perspective',
        category: item.category || type,
        title: item.title || item.alt || 'Saved item',
        description: item.description || '',
        image: item.image || item.src || '',
        url: item.url || '',
        date: item.date || new Date().toISOString(),
        mediaType: type,
      }

      const response = await fetch('/.netlify/functions/save-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(itemToSave),
      })

      const result = await response.json()

      if (!response.ok) {
        setMessage(result.error || 'Could not save.')
        setSaving(false)
        return
      }

      setMessage('Saved.')
    } catch (error) {
      setMessage('Could not connect.')
    }

    setSaving(false)
  }

  return (
    <div className="collection-save-area">
      <button
        type="button"
        className="save-collection-button"
        onClick={saveItem}
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save to Collection'}
      </button>

      {message && (
        <span className="save-collection-message">
          {message}
        </span>
      )}
    </div>
  )
}

export default SaveButton