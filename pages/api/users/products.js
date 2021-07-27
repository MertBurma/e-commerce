import open from '../../../lib/db'
import getCookie from '../../../lib/getCookie'

export default async function (req, res) {
  const db = await open()
  const user = await getCookie(req.headers.cookie)

  const userProducts = await db.all('SELECT * FROM Products WHERE sellerId = ?', user.sub)
  res.status(200).json({ userProducts })
}