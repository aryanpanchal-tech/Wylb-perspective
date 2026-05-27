const shortText = (text = '', fallback = 'Latest update from Wylb Perspective Studios') => {
  const value = String(text || '').trim()

  if (!value) {
    return fallback
  }

  if (value.length > 140) {
    return value.slice(0, 140) + '...'
  }

  return value
}

const getYoutubeChannelId = async (warnings) => {
  const apiKey = process.env.YOUTUBE_API_KEY
  const channelId = process.env.YOUTUBE_CHANNEL_ID
  const handle = process.env.YOUTUBE_HANDLE

  if (channelId) {
    return channelId
  }

  if (!apiKey) {
    warnings.push('YouTube API key is missing.')
    return ''
  }

  if (!handle) {
    warnings.push('YouTube handle is missing.')
    return ''
  }

  const url =
    'https://www.googleapis.com/youtube/v3/channels' +
    '?part=id,snippet' +
    `&forHandle=${encodeURIComponent(handle)}` +
    `&key=${apiKey}`

  try {
    const response = await fetch(url)
    const result = await response.json()

    if (!response.ok) {
      warnings.push(result.error?.message || 'Could not find the YouTube channel.')
      return ''
    }

    if (!result.items || result.items.length === 0) {
      warnings.push('No YouTube channel matched the handle.')
      return ''
    }

    return result.items[0].id
  } catch (error) {
    warnings.push('YouTube channel check failed.')
    return ''
  }
}

const getYoutubePosts = async (warnings) => {
  const apiKey = process.env.YOUTUBE_API_KEY

  if (!apiKey) {
    warnings.push('Youtubes API key i missing so its skipped')
    return []
  }

  const channelId = await getYoutubeChannelId(warnings)

  if (!channelId) {
    warnings.push('channel ID was not found.')
    return []
  }

  const url =
    'https://www.googleapis.com/youtube/v3/search' +
    '?part=snippet' +
    `&channelId=${channelId}` +
    '&order=date' +
    '&type=video' +
    '&maxResults=6' +
    `&key=${apiKey}`

  try {
    const response = await fetch(url)
    const result = await response.json()

    if (!response.ok) {
      warnings.push(result.error?.message || 'Could not load YouTube videos.')
      return []
    }

    if (!result.items || result.items.length === 0) {
      warnings.push('YouTube did not return any videos.')
      return []
    }

    return result.items.map((item) => {
      const snippet = item.snippet || {}
      const videoId = item.id?.videoId

      return {
        id: `youtube-${videoId}`,
        source: 'YouTube',
        category: 'YouTube Video',
        title: snippet.title || 'YouTube video',
        description: shortText(
          snippet.description,
          'Latest YouTube video from Wylb Perspective Studios'
        ),
        image:
          snippet.thumbnails?.high?.url ||
          snippet.thumbnails?.medium?.url ||
          snippet.thumbnails?.default?.url ||
          '',
        url: videoId ? `https://www.youtube.com/watch?v=${videoId}` : '',
        date: snippet.publishedAt || '',
      }
    })
  } catch (error) {
    warnings.push('YouTube video request failed.')
    return []
  }
}

const getInstagramPosts = async (warnings) => {
  const userId = process.env.IG_USER_ID
  const token = process.env.IG_ACCESS_TOKEN

  if (!userId) {
    warnings.push('Instagram user ID is missing.')
    return []
  }

  if (!token) {
    warnings.push('Instagram access token is missing.')
    return []
  }

  const fields = [
    'id',
    'caption',
    'media_type',
    'media_url',
    'permalink',
    'thumbnail_url',
    'timestamp',
  ].join(',')

  const url =
    `https://graph.facebook.com/v21.0/${userId}/media` +
    `?fields=${fields}` +
    '&limit=6' +
    `&access_token=${token}`

  try {
    const response = await fetch(url)
    const result = await response.json()

    if (!response.ok) {
      warnings.push(result.error?.message || 'Unable to load IG posts.')
      return []
    }

    if (!result.data || result.data.length === 0) {
      warnings.push('Instagram did not return any posts.')
      return []
    }

    return result.data.map((post) => {
      const caption = post.caption || ''
      const isVideo = post.media_type === 'VIDEO'

      return {
        id: `instagram-${post.id}`,
        source: 'Instagram',
        category: isVideo ? 'Instagram Video' : 'Instagram Post',
        title: shortText(caption, 'Instagram update'),
        description: shortText(
          caption,
          'newest Instagram post from Wylb Perspective Studios'
        ),
        image: isVideo ? post.thumbnail_url || '' : post.media_url || '',
        url: post.permalink || '',
        date: post.timestamp || '',
      }
    })
  } catch (error) {
    warnings.push('Instagram request failed.')
    return []
  }
}

export const handler = async () => {
  const warnings = []

  try {
    const instagramPosts = await getInstagramPosts(warnings)
    const youtubePosts = await getYoutubePosts(warnings)

    const events = [...instagramPosts, ...youtubePosts]
      .filter((post) => post.date)
      .sort((a, b) => new Date(b.date) - new Date(a.date))

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        events,
        warnings,
        totalEvents: events.length,
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'unable to bring up social media events.',
        details: error.message,
        warnings,
      }),
    }
  }
}