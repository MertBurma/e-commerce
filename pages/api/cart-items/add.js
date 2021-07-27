import { getCookie } from '../users'
import open from '../../../lib/db'
import { decode } from 'jsonwebtoken'

export default async function (req, res) {

  if (req.method !== 'POST') {
    res.status(405).end(`Method ${req.method} not allowed.`)
  }
  const { id } = req.body
  const db = await open()

  const { cookie } = req?.headers
  const str = cookie.substring(5)
  const user = decode(str)

  const cart = await db.get('SELECT * FROM Carts WHERE user_id = ? AND status = ?', user.sub, 1)
  if (cart) {
    const result = await db.run('INSERT INTO CartItems(product_id, cart_id) VALUES (?,?)', id, cart.id)
    res.status(200).json({ result })
  } else {
    res.status(400).json({ message: 'Something went wrong' })
  }

}