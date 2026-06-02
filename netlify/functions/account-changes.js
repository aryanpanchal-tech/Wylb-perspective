import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { parse } from 'cookie'
import { ObjectId } from 'mongodb'
import { v2 as cloudinary } from 'cloudinary'
import { connectToDatabase } from './_db.js'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

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
      error: 'You must be signed in to make account changes.',
    })
  }

  try {
    const form = JSON.parse(event.body || '{}')
    const action = String(form.action || '').trim()

    const { db } = await connectToDatabase()
    const users = db.collection('users')

    const account = await users.findOne({
      _id: new ObjectId(userId),
    })

    if (!account) {
      return sendJson(404, {
        error: 'Account not found.',
      })
    }

    if (action === 'username') {
      const newUsername = String(form.username || '').trim().toLowerCase()

      if (!newUsername) {
        return sendJson(400, {
          error: 'Please enter a username.',
        })
      }

      if (newUsername.length < 3) {
        return sendJson(400, {
          error: 'Username must be at least 3 characters.',
        })
      }

      const usernameTaken = await users.findOne({
        username: newUsername,
        _id: {
          $ne: new ObjectId(userId),
        },
      })

      if (usernameTaken) {
        return sendJson(409, {
          error: 'That username is already taken.',
        })
      }

      await users.updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            username: newUsername,
            updatedAt: new Date(),
          },
        }
      )

      return sendJson(200, {
        message: 'Username updated.',
      })
    }

    if (action === 'password') {
      const currentPassword = String(form.currentPassword || '')
      const newPassword = String(form.newPassword || '')
      const confirmPassword = String(form.confirmPassword || '')

      if (!currentPassword || !newPassword || !confirmPassword) {
        return sendJson(400, {
          error: 'Please fill in all password fields.',
        })
      }

      if (newPassword !== confirmPassword) {
        return sendJson(400, {
          error: 'New passwords do not match.',
        })
      }

      if (newPassword.length < 8) {
        return sendJson(400, {
          error: 'New password must be at least 8 characters.',
        })
      }

      const passwordIsCorrect = await bcrypt.compare(
        currentPassword,
        account.passwordHash
      )

      if (!passwordIsCorrect) {
        return sendJson(401, {
          error: 'Current password is incorrect.',
        })
      }

      const newPasswordHash = await bcrypt.hash(newPassword, 12)

      await users.updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            passwordHash: newPasswordHash,
            updatedAt: new Date(),
          },
        }
      )

      return sendJson(200, {
        message: 'Password updated.',
      })
    }

    if (action === 'profileImage') {
      const profileImage = String(form.profileImage || '').trim()

      if (!profileImage) {
        return sendJson(400, {
          error: 'Please choose a profile image.',
        })
      }

      if (
        !process.env.CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET
      ) {
        return sendJson(500, {
          error: 'Cloudinary settings are missing.',
        })
      }

      if (account.profileImagePublicId) {
        await cloudinary.uploader.destroy(account.profileImagePublicId)
      }

      const uploadResult = await cloudinary.uploader.upload(profileImage, {
        folder: 'wylb/profile-pictures',
        public_id: `user-${userId}-${Date.now()}`,
        overwrite: true,
        resource_type: 'image',
        transformation: [
          {
            width: 400,
            height: 400,
            crop: 'fill',
            gravity: 'face',
          },
        ],
      })

      await users.updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            profileImage: uploadResult.secure_url,
            profileImagePublicId: uploadResult.public_id,
            updatedAt: new Date(),
          },
        }
      )

      return sendJson(200, {
        message: 'Profile picture updated.',
        profileImage: uploadResult.secure_url,
      })
    }

    return sendJson(400, {
      error: 'Invalid account change request.',
    })
  } catch (error) {
    return sendJson(500, {
      error: 'Could not update account.',
      details: error.message,
    })
  }
}