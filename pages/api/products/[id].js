import open from "../../../lib/db";

export default async (req, res) => {
  const { id } = req.query;

  const db = await open();
  const product = await db.get("SELECT * FROM products WHERE id = ?", [id]);

  res.status(200).json(product);
};
