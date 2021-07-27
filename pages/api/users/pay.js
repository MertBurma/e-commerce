import open from '../../../lib/db'
import getCookie from '../../../lib/getCookie'

export default async function (req, res) {
  const db = await open()
  const user = await getCookie(req?.headers.cookie)

  const result = await db.run('UPDATE Carts SET status = ? WHERE user_id = ?', 0, user.sub)
  if (result) {
    res.status(200).json(result)
  } else {
    res.status(200).json({message: "Cart is Empty"})
  }
}