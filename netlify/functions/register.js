import bcrypt from 'bcryptjs'
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

const emailLooksValid = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return sendJson(405, {
      error: 'Method not allowed.',
    })
  }

  try {
    const form = JSON.parse(event.body || '{}')

    const firstName = String(form.firstName || '').trim()
    const lastName = String(form.lastName || '').trim()
    const username = String(form.username || '').trim().toLowerCase()
    const email = String(form.email || '').trim().toLowerCase()
    const password = String(form.password || '')

    if (!firstName || !lastName || !username || !email || !password) {
      return sendJson(400, {
        error: 'Please fill in all fields.',
      })
    }

    if (!emailLooksValid(email)) {
      return sendJson(400, {
        error: 'Please enter a valid email address.',
      })
    }

    if (username.length < 3) {
      return sendJson(400, {
        error: 'Username must be at least 3 characters.',
      })
    }

    if (password.length < 8) {
      return sendJson(400, {
        error: 'Password must be at least 8 characters.',
      })
    }

    const { db } = await connectToDatabase()
    const users = db.collection('users')

    const alreadyExists = await users.findOne({
      $or: [
        { email },
        { username },
      ],
    })

    if (alreadyExists) {
      return sendJson(409, {
        error: 'An account with that email or username already exists.',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const now = new Date()

    await users.insertOne({
      firstName,
      lastName,
      username,
      email,
      passwordHash: hashedPassword,
      role: 'user',
      createdAt: now,
      updatedAt: now,
    })

    return sendJson(201, {
      message: 'Account created.',
    })
  } catch (error) {
    return sendJson(500, {
      error: 'Could not create account.',
      details: error.message,
    })
  }
}