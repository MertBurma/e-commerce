import open from "../../../../lib/db";
import { authenticated } from '../../users'

export default authenticated(async (req, res) => {
  const db = await open();
  const categories = await db.all("SELECT * FROM Category");
  res.status(200).json(categories);
});
