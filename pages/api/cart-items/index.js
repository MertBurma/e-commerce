import open from '../../../lib/db'
import { decode } from 'jsonwebtoken'
import { authenticated } from '../users'

export default authenticated(async function (req, res) {
  const db = await open()

  const { cookie } = req?.headers
  const str = cookie.substring(5)
  const user = decode(str)

  const cart = await db.get('SELECT *  FROM Carts WHERE user_id = ? AND status = ?', user.sub, 1)

  if (cart) {
    const item = await db.all('SELECT * FROM CartItems WHERE cart_id = ?', cart.id)

    const products = await Promise.all(item.map(async (i) => {
      const p = await db.get('SELECT * FROM Products WHERE id = ?', i.product_id)
      return p
    }))

    res.status(200).json(products)
  } else {
    res.status(200).json({message: "You Have Completed your Purchase"})
  }

})