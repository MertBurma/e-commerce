import open from '../../../../lib/db'

import getCookie from '../../../../lib/getCookie'

export default async (req, res) => {

  if (req.method !== 'POST') {
    res.status(405).end(`Method ${req.method} not allowed.`)
  }

  const { feedback, point, product_id } = req.body
  const { cookie } = req?.headers
  const user = await getCookie(cookie)

  const db = await open()
  const result = await db.run('INSERT INTO Feedback(User_id, Product_id, feedback, Point) VALUES (?,?,?,?)', user.sub, product_id, feedback, point)
  res.status(200).json({ result })
}