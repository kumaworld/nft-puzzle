import { NextApiRequest, NextApiResponse } from 'next';
import {connectToDatabase} from '../../config/mongodb';
import { NUMBER_OF_PLAYERS_RANKING } from '../../utils/constants';
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  const scores = await db
    .collection("globalScores")
    .find()
    .sort({ time: -1 })
    .limit(NUMBER_OF_PLAYERS_RANKING)
    .toArray()

  return res.status(200).json({ scores: scores })

}