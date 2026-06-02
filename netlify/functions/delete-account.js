import jwt from 'jsonwebtoken'
import { parse, serialize } from 'cookie'
import { ObjectId } from 'mongodb'
import { v2 as cloudinary } from 'cloudinary'
import { connectToDatabase } from './_db.js'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

const sendJson = (statusCode, data, extraHeaders = {}) => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
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
    const decoded = jwt.verify(token, jwtSecret)
    return decoded.userId
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
      error: 'You must be signed in to delete your account.',
    })
  }

  try {
    const { db } = await connectToDatabase()
    const users = db.collection('users')
    const savedPosts = db.collection('savedPosts')

    const account = await users.findOne({
      _id: new ObjectId(userId),
    })

    if (!account) {
      return sendJson(404, {
        error: 'Account not found.',
      })
    }

    if (
      account.profileImagePublicId &&
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      await cloudinary.uploader.destroy(account.profileImagePublicId)
    }

    await savedPosts.deleteMany({
      userId,
    })

    await users.deleteOne({
      _id: new ObjectId(userId),
    })

    const clearCookie = serialize('wylb_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    })

    return sendJson(
      200,
      {
        message: 'Your account has been deleted.',
      },
      {
        'Set-Cookie': clearCookie,
      }
    )
  } catch (error) {
    return sendJson(500, {
      error: 'Could not delete account.',
      details: error.message,
    })
  }
}