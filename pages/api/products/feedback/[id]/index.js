import open from '../../../../../lib/db'

export default async (req, res) => {
  const { id } = req.query

  const db = await open()
  const feedback = await db.all('SELECT * FROM Feedback WHERE Product_id = ?', id)
  res.status(200).json(feedback)
}