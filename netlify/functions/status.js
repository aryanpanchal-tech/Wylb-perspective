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
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    return sendJson(500, {
      error: 'JWT secret is missing.',
    })
  }

  try {
    const cookies = parse(event.headers.cookie || '')
    const loginToken = cookies.wylb_token

    if (!loginToken) {
      return sendJson(401, {
        error: 'Not signed in.',
      })
    }

    const tokenData = jwt.verify(loginToken, jwtSecret)

    const { db } = await connectToDatabase()
    const users = db.collection('users')

    const account = await users.findOne({
      _id: new ObjectId(tokenData.userId),
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
      },
    })
  } catch (error) {
    return sendJson(401, {
      error: 'Login expired or invalid.',
    })
  }
}