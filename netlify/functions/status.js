import jwt from 'jsonwebtoken'
import { parse } from 'cookie'
import { ObjectId } from 'mongodb'
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

export const handler = async (event) => {
  try {
    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
      return sendJson(500, {
        error: 'Missing JWT_SECRET in .env',
      })
    }

    const cookieHeader = event.headers.cookie || event.headers.Cookie || ''
    const cookies = parse(cookieHeader)
    const token = cookies.wylb_token

    if (!token) {
      return sendJson(401, {
        error: 'Not signed in.',
      })
    }

    const decoded = jwt.verify(token, jwtSecret)

    const { db } = await connectToDatabase()
    const users = db.collection('users')

    const account = await users.findOne({
      _id: new ObjectId(decoded.userId),
    })

    if (!account) {
      return sendJson(401, {
        error: 'Account not found.',
      })
    }

    return sendJson(200, {
      user: {
        id: account._id.toString(),
        firstName: account.firstName,
        lastName: account.lastName,
        username: account.username,
        email: account.email,
        role: account.role || 'user',
        profileImage: account.profileImage || '',
        createdAt: account.createdAt || '',
      },
    })
  } catch (error) {
    return sendJson(401, {
      error: 'Invalid or expired login.',
    })
  }
}