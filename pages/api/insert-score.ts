import { NextApiRequest, NextApiResponse } from 'next';
import {connectToDatabase} from '../../config/mongodb';
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { time, name, id } = req.body;

  const { db } = await connectToDatabase();

  const response = await db
    .collection("scores")
    .insertOne({ name, time, id  })


  return res.status(200).json({ score: response })
}