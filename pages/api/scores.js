import {connectToDatabase} from '../../config/mongodb';
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const puzzle = req.query.id;

  if (!puzzle) return res.json("Página não encontrada!")

  const { db } = await connectToDatabase();

  const scores = await db
    .collection("scores")
    .find({ puzzle })
    .toArray()

    console.log(scores);

  return res.status(200).json({ scores: scores })
}