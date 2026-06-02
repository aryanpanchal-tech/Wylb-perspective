import jwt from 'jsonwebtoken'
import { parse } from 'cookie'
import { connectToDatabase } from './_db.js'

const sendJson = (statusCode, data) => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
}

const getSignedInUserId = (event) => {
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    return ''
  }

  const cookies = parse(event.headers.cookie || '')
  const token = cookies.wylb_token

  if (!token) {
    return ''
  }

  try {
    const decoded = jwt.verify(token, jwtSecret)
    return decoded.userId
  } catch (error) {
    return ''
  }
}

export const handler = async (event) => {
  const userId = getSignedInUserId(event)

  if (!userId) {
    return sendJson(401, {
      error: 'You must be signed in to view saved posts.',
    })
  }

  try {
    const { db } = await connectToDatabase()
    const savedPosts = db.collection('savedPosts')

    const posts = await savedPosts
      .find({ userId })
      .sort({ savedAt: -1 })
      .toArray()

    return sendJson(200, {
      posts: posts.map((post) => ({
        id: post.postId,
        source: post.source || '',
        category: post.category || '',
        title: post.title || '',
        description: post.description || '',
        image: post.image || '',
        url: post.url || '',
        date: post.date || '',
        mediaType: post.mediaType || '',
        savedAt: post.savedAt || '',
      })),
    })
  } catch (error) {
    return sendJson(500, {
      error: 'Could not load saved posts.',
      details: error.message,
    })
  }
}