import { decode } from 'jsonwebtoken'
import open from '../../../lib/db'

export default async (req, res) => {

  const { cookie } = req?.headers
  const str = cookie.substring(5)
  const user = decode(str)

  const db = await open()

  const carts = await db.get('SELECT * FROM Carts WHERE user_id = ?', user.sub)
  res.status(200).json(carts)

};