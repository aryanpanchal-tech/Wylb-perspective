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

const getUserId = (event) => {
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
    const user = jwt.verify(token, jwtSecret)
    return user.userId
  } catch (error) {
    return ''
  }
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return sendJson(405, {
      error: 'Method not allowed.',
    })
  }

  const userId = getUserId(event)

  if (!userId) {
    return sendJson(401, {
      error: 'You must be signed in.',
    })
  }

  try {
    const body = JSON.parse(event.body || '{}')

    if (!body.postId) {
      return sendJson(400, {
        error: 'Missing post ID.',
      })
    }

    const { db } = await connectToDatabase()
    const savedPosts = db.collection('savedPosts')

    await savedPosts.deleteOne({
      userId,
      postId: body.postId,
    })

    return sendJson(200, {
      message: 'Saved post removed.',
    })
  } catch (error) {
    return sendJson(500, {
      error: 'Could not remove saved post.',
    })
  }
}