import open from '../../../lib/db'
import { decode } from 'jsonwebtoken'


export default async function (req, res) {

  if (req.method !== 'POST') {
    res.status(405).end(`Method ${req.method} not allowed.`)
  }

  const db = await open()
  const { cookie } = req?.headers
  const str = cookie.substring(5)
  const user = decode(str)


  const isCartExists = await db.get('SELECT * FROM Carts WHERE user_id = ? AND status = ?', user.sub, 1)

  if (!isCartExists) {
    const result = await db.run('INSERT INTO Carts(user_id) VALUES (?)', user.sub)
    res.status(200).json({ result })
  } else {
    res.status(400).json({ message: 'You already have a cart' })
  }

}