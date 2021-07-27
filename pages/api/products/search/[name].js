import open from '../../../../lib/db'

export default async function (req, res) {
  const search = req.query.name
  const db = await open()
  const product = await db.all('SELECT * FROM Products WHERE name LIKE ?', `%${search}%`)
  res.status(200).json(product)
}