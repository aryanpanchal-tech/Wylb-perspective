import bcrypt from 'bcryptjs'
import { randomInt } from 'node:crypto'
import { Resend } from 'resend'
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

const nameLooksValid = (name) => {
  return /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(name)
}

const usernameLooksValid = (username) => {
  return /^[a-zA-Z0-9_]+$/.test(username)
}

const generateVerificationCode = () => {
  return String(randomInt(10000, 100000))
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return sendJson(405, {
      error: 'Not allowed.',
    })
  }

  try {
    const resendApiKey = process.env.RESEND_API_KEY
    const verificationEmailFrom =
      process.env.VERIFICATION_EMAIL_FROM

    if (!resendApiKey) {
      return sendJson(500, {
        error: 'RESEND_API_KEY is missing from the environment variables.',
      })
    }

    if (!verificationEmailFrom) {
      return sendJson(500, {
        error:
          'VERIFICATION_EMAIL_FROM is missing from the environment variables.',
      })
    }

    const form = JSON.parse(event.body || '{}')

    const firstName = String(form.firstName || '').trim()
    const lastName = String(form.lastName || '').trim()
    const username = String(form.username || '')
      .trim()
      .toLowerCase()
    const email = String(form.email || '')
      .trim()
      .toLowerCase()
    const password = String(form.password || '')

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password
    ) {
      return sendJson(400, {
        error: 'fill in all fields.',
      })
    }

    if (!nameLooksValid(firstName)) {
      return sendJson(400, {
        error:
          'No numbers or special characters allowed in first name, except for spaces, hyphens, and apostrophes.',
      })
    }

    if (!nameLooksValid(lastName)) {
      return sendJson(400, {
        error:
          'No numbers or special characters allowed in last name, except for spaces, hyphens, and apostrophes.',
      })
    }

    if (!emailLooksValid(email)) {
      return sendJson(400, {
        error: 'Enter a valid email address.',
      })
    }

    if (username.length < 3) {
      return sendJson(400, {
        error: 'Username must be at least 3 characters long.',
      })
    }

    if (username.length > 20) {
      return sendJson(400, {
        error: 'No longer then 20 characters please',
      })
    }

    if (!usernameLooksValid(username)) {
      return sendJson(400, {
        error:
          'Username can only contain letters, numbers, and underscores, no special characters.',
      })
    }

    if (password.length < 8) {
      return sendJson(400, {
        error: 'Password must be at least 8 characters for safer login.',
      })
    }

    const { db } = await connectToDatabase()

    const users = db.collection('users')
    const pendingUsers = db.collection('pendingUsers')

    const existingUser = await users.findOne({
      $or: [{ email }, { username }],
    })

    if (existingUser) {
      return sendJson(409, {
        error:
          'An account with that email or username already exists.',
      })
    }

    const now = new Date()

    const pendingUsernameOwner = await pendingUsers.findOne({
      username,
      email: {
        $ne: email,
      },
      verificationExpiresAt: {
        $gt: now,
      },
    })

    if (pendingUsernameOwner) {
      return sendJson(409, {
        error: 'Username is already in use',
      })
    }

    const existingPendingUser = await pendingUsers.findOne({
      email,
    })

    if (existingPendingUser?.lastCodeSentAt) {
      const millisecondsSinceLastCode =
        now.getTime() -
        new Date(existingPendingUser.lastCodeSentAt).getTime()

      const sixtySeconds = 60 * 1000

      if (millisecondsSinceLastCode < sixtySeconds) {
        const secondsRemaining = Math.ceil(
          (sixtySeconds - millisecondsSinceLastCode) / 1000
        )

        return sendJson(429, {
          error: `Please wait ${secondsRemaining} seconds before requesting another code.`,
          retryAfterSeconds: secondsRemaining,
        })
      }
    }

    const verificationCode = generateVerificationCode()

    const passwordHash = await bcrypt.hash(password, 12)
    const verificationCodeHash = await bcrypt.hash(
      verificationCode,
      10
    )

    const verificationExpiresAt = new Date(
      now.getTime() + 10 * 60 * 1000
    )

    await pendingUsers.updateOne(
      {
        email,
      },
      {
        $set: {
          firstName,
          lastName,
          username,
          email,
          passwordHash,
          verificationCodeHash,
          verificationExpiresAt,
          verificationAttempts: 0,
          lastCodeSentAt: now,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      {
        upsert: true,
      }
    )

    const resend = new Resend(resendApiKey)

    const { error: emailError } = await resend.emails.send({
      from: verificationEmailFrom,
      to: [email],
      subject: 'Verify your Wyld Perspective account',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #111111;">
          <h1 style="margin-bottom: 16px;">
            Verify your account
          </h1>

          <p>Hello ${firstName},</p>

          <p>
            For verification that this is a real email, enter in this code in the site for us to verify your account:
          </p>

          <div
            style="
              display: inline-block;
              margin: 18px 0;
              padding: 16px 24px;
              background: #111111;
              color: #ffffff;
              border-radius: 10px;
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 8px;
            "
          >
            ${verificationCode}
          </div>

          <p>
            This code expires in 10 minutes.
          </p>

          <p>
            If this wasen't you, you can ignore this email and no account will be created.
          </p>
        </div>
      `,
    })

    if (emailError) {
      await pendingUsers.deleteOne({
        email,
        verificationCodeHash,
      })

      console.error(
        'Verification email error:',
        emailError
      )

      return sendJson(500, {
        error: 'The verification email could not be sent.',
        details:
          emailError.message || 'Unknown email provider error.',
      })
    }

    return sendJson(201, {
      message:
        'A verification code was sent to your email address.',
      requiresVerification: true,
      email,
      expiresInSeconds: 600,
    })
  } catch (error) {
    console.error('Registration error:', error)

    return sendJson(500, {
      error: 'Could not begin account registration.',
      details: error.message,
    })
  }
}