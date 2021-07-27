import open from "../../../../lib/db";

export default async (req, res) => {
  const { id } = req.query;

  const db = await open();
  const user = await db.get("SELECT id, username, hasAccess FROM users WHERE id = ?", [id]);

  res.status(200).json(user);
};
