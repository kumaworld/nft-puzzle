import { NextApiRequest, NextApiResponse } from 'next';
import {connectToDatabase} from '../../config/mongodb';
import { NUMBER_OF_PLAYERS_RANKING } from '../../utils/constants';
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('scores')
  const { id }= req.query;
  console.log('scores')

  if (!id) return res.json("Página não encontrada!")

  const { db } = await connectToDatabase();

  const scores = await db
    .collection("scores")
    .find({ id })
    .sort({ time: -1 })
    .limit(NUMBER_OF_PLAYERS_RANKING)
    .toArray()

  console.log(scores)

  return res.status(200).json({ scores: scores })
}