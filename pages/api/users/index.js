import open from '../../../lib/db'
import { decode, verify } from 'jsonwebtoken'

export const authenticated = (fn) => async (req, res) => {

  verify(req.cookies.auth, '75084db1-6c7a-4af2-87ab-4529a9d5f310', async function (err, decoded) {
    if (!err && decoded) {
      return await fn(req, res)
    } else {
      res.status(401).json({ message: 'Sorry you are not authenticated' })
    }
  })

}

export default authenticated(async (req, res) => {
  const db = await open()
  const users = await db.all('SELECT id, username, email FROM users')

  res.status(200).json(users)
})

