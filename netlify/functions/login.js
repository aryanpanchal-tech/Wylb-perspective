console.log('Login function started')
console.log('Mongo URI exists:', Boolean(process.env.MONGODB_URI))
console.log('JWT secret exists:', Boolean(process.env.JWT_SECRET))

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { connectToDatabase } from './_db.js'

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

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return sendJson(405, {
      error: 'Method not allowed.',
    })
  }

  try {
    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
      return sendJson(500, {
        error: 'Missing JWT_SECRET in .env',
      })
    }

    const form = JSON.parse(event.body || '{}')

    const login = String(form.login || '').trim().toLowerCase()
    const password = String(form.password || '')

    if (!login || !password) {
      return sendJson(400, {
        error: 'Please enter your email/username and password.',
      })
    }

    const { db } = await connectToDatabase()
    const users = db.collection('users')

    const account = await users.findOne({
      $or: [
        { email: login },
        { username: login },
      ],
    })

    if (!account) {
      return sendJson(401, {
        error: 'Invalid email/username or password.',
      })
    }

    const passwordMatches = await bcrypt.compare(password, account.passwordHash)

    if (!passwordMatches) {
      return sendJson(401, {
        error: 'Invalid email/username or password.',
      })
    }

    const token = jwt.sign(
      {
        userId: account._id.toString(),
        username: account.username,
        email: account.email,
        role: account.role || 'user',
      },
      jwtSecret,
      {
        expiresIn: '7d',
      }
    )

    const cookie = serialize('wylb_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return sendJson(
      200,
      {
        message: 'Signed in successfully.',
        user: {
          id: account._id.toString(),
          firstName: account.firstName,
          lastName: account.lastName,
          username: account.username,
          email: account.email,
          role: account.role || 'user',
          profileImage: account.profileImage || '',
        },
      },
      {
        'Set-Cookie': cookie,
      }
    )
  } catch (error) {
    return sendJson(500, {
      error: 'Could not sign in.',
      details: error.message,
    })
  }
}