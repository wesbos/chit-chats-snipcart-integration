import { SnipcartRequestParams } from './../../../interfaces/snipcart.d';
import { NextApiRequest, NextApiResponse } from 'next';
import { createBatch, getBatches } from '../../../utils/chitchats';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const batches = await getBatches(req.query as SnipcartRequestParams);
    res.status(200).json(batches.data);
    return;
  }

  if(req.method === 'POST') {
    const batch = await createBatch();
    console.log(batch);
    res.status(200).json(batch);
    return;
  }

};
