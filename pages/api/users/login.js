import open from '../../../lib/db'
import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import cookie from 'cookie'

export default async function (req, res) {
  // 405 Method Not Allowed
  if (req.method === 'POST') {

    const { username } = req.body
    const db = await open()
    const person = await db.get('SELECT * FROM Users WHERE username = ?', [username])
    bcrypt.compare(req.body.password, person.password, function (err, result) {
      if (!err && result) {
        const claims = { sub: person.id, personName: person.username }
        const jwt = sign(claims, '75084db1-6c7a-4af2-87ab-4529a9d5f310', { expiresIn: '1h' })
        res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 3600,
          path: '/'
        }))
        res.json({ message: 'Welcome', id: person.id })
      } else {
        res.json({ message: 'Something went wrong' })
      }
    })
  } else {
    res.status(405).end(`Method ${req.method} not allowed.`)
  }

}
