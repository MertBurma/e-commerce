import open from '../../../lib/db'
import bcrypt from 'bcryptjs'

export default async function (req, res) {

  // 405 Method Not Allowed
  if (req.method === 'POST') {

    const { username, email, userType } = req.body

    const db = await open()
    const isUsernameValid = await db.get('SELECT * FROM Users WHERE username = ?', username)
    const isEmailValid = await db.get('SELECT * FROM users WHERE email = ?', email)

    if (isEmailValid || isUsernameValid) {
      res.status(400).json({ message: 'Wrong' })
      return
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        if (!err) {
          const result = await db.run('INSERT INTO Users(username, email, hasAccess,password) VALUES(?,?,?,?)', username, email, userType, hash)
          res.status(200).json({ id: result.lastID })
        } else {
          console.error(err)
        }
      })
    })

  } else {
    res.status(405).end(`Method ${req.method} not allowed.`)
  }

}
