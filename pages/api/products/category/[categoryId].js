import open from '../../../../lib/db'

export default async (req, res) => {
  const { categoryId } = req.query

  const db = await open()
  const products = await db.all('SELECT * FROM Products WHERE category_id = ?', [categoryId])

  res.status(200).json(products)
};
