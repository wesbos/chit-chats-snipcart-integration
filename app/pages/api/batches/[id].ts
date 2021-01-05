import { SnipcartRequestParams } from './../../../interfaces/snipcart.d';
import { NextApiRequest, NextApiResponse } from 'next';
import { getBatch } from '../../../utils/chitchats';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const batch = await getBatch(req.query.id);
  res.status(200).json(batch.data)
};
