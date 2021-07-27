import open from "../../../lib/db";
import { authenticated } from '../users'

export default authenticated(async (req, res) => {
  const db = await open();
  const products = await db.all("SELECT * FROM products");
  res.status(200).json(products);
});
