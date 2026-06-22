import bcrypt from 'bcryptjs'
import { connectToDatabase } from './_db.js'

const MAX_ATTEMPTS = 100

const sendJson = (statusCode, data) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return sendJson(405, {
      error: 'Method not allowed.',
    })
  }

  try {
    const form = JSON.parse(event.body || '{}')

    const email = String(form.email || '')
      .trim()
      .toLowerCase()

    const verificationCode = String(
      form.verificationCode || ''
    ).trim()

    if (!email || !verificationCode) {
      return sendJson(400, {
        error: 'Please enter your email and verification code.',
      })
    }

    if (!/^\d{5}$/.test(verificationCode)) {
      return sendJson(400, {
        error: 'The verification code must contain exactly 5 numbers.',
      })
    }

    const { db } = await connectToDatabase()

    const users = db.collection('users')
    const pendingUsers = db.collection('pendingUsers')

    // Find the signup information that was temporarily saved.
    const pendingUser = await pendingUsers.findOne({
      email,
    })

    if (!pendingUser) {
      return sendJson(404, {
        error:
          'No pending registration was found for this email address.',
      })
    }

    const now = new Date()
    const expirationDate = pendingUser.verificationExpiresAt
      ? new Date(pendingUser.verificationExpiresAt)
      : null

    // Remove expired registrations so old codes cannot be reused.
    if (!expirationDate || expirationDate <= now) {
      await pendingUsers.deleteOne({
        _id: pendingUser._id,
      })

      return sendJson(410, {
        error:
          'Your verification code has expired. Please sign up again or request a new code.',
        codeExpired: true,
      })
    }

    const currentAttempts =
      Number(pendingUser.verificationAttempts) || 0

    if (currentAttempts >= MAX_ATTEMPTS) {
      await pendingUsers.deleteOne({
        _id: pendingUser._id,
      })

      return sendJson(429, {
        error:
          'Too many incorrect attempts. Please begin the signup process again.',
        attemptsRemaining: 0,
      })
    }

    const codeMatches = await bcrypt.compare(
      verificationCode,
      pendingUser.verificationCodeHash
    )

    if (!codeMatches) {
      const newAttemptCount = currentAttempts + 1
      const attemptsRemaining =
        MAX_ATTEMPTS - newAttemptCount

      if (newAttemptCount >= MAX_ATTEMPTS) {
        await pendingUsers.deleteOne({
          _id: pendingUser._id,
        })

        return sendJson(429, {
          error:
            'You have made too many incorrect attempts. Please sign up again.',
          attemptsRemaining: 0,
        })
      }

      await pendingUsers.updateOne(
        {
          _id: pendingUser._id,
        },
        {
          $set: {
            verificationAttempts: newAttemptCount,
            updatedAt: now,
          },
        }
      )

      return sendJson(400, {
        error: `Incorrect verification code. ${attemptsRemaining} attempts remaining.`,
        attemptsRemaining,
      })
    }

    const existingUser = await users.findOne({
      $or: [
        {
          email: pendingUser.email,
        },
        {
          username: pendingUser.username,
        },
      ],
    })

    if (existingUser) {
      await pendingUsers.deleteOne({
        _id: pendingUser._id,
      })

      return sendJson(409, {
        error:
          'An account with that email or username already exists.',
      })
    }

    const verifiedUser = {
      firstName: pendingUser.firstName,
      lastName: pendingUser.lastName,
      username: pendingUser.username,
      email: pendingUser.email,
      passwordHash: pendingUser.passwordHash,
      emailVerified: true,
      role: 'user',
      profileImage: '',
      profileImagePublicId: '',
      createdAt: now,
      updatedAt: now,
    }

    await users.insertOne(verifiedUser)

    await pendingUsers.deleteOne({
      _id: pendingUser._id,
    })

    return sendJson(201, {
      message:
        'Email verified successfully. Your account has been created.',
      verified: true,
    })
  } catch (error) {
    console.error('Email verification error:', error)

    return sendJson(500, {
      error: 'Could not verify your email address.',
      details: error.message,
    })
  }
}