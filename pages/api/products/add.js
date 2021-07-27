import open from '../../../lib/db'

export default async function (req, res) {
  const db = await open()
  const { name, description, price, photo, category, id } = req.body

  const product = await db.run('INSERT INTO Products(name, description, sellerId, price, image, category_id) VALUES (?,?,?,?,?,?)', name, description, id, price, photo, category)
  res.status(200).json({ product })
}