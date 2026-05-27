import { serialize } from 'cookie'

export const handler = async () => {
  const cookie = serialize('wylb_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': cookie,
    },
    body: JSON.stringify({
      message: 'Signed out successfully.',
    }),
  }
}