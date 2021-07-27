import open from '../../../../lib/db'
import { authenticated } from '../../users'

export default authenticated(async (req, res) => {

  const db = await open()
  const feedback = await db.all('SELECT * FROM Feedback')
  res.status(200).json(feedback)
})