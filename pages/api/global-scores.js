import {connectToDatabase} from '../../config/mongodb';
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const puzzle = req.query.id;

  if (!puzzle) return res.json("Página não encontrada!")

  const { db } = await connectToDatabase();

  const scores = await db
    .collection("globalScores")
    .find({ puzzle })
    .toArray()

  return res.status(200).json({ scores: scores })

}