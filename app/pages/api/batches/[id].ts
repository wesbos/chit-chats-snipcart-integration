import { NextApiRequest, NextApiResponse } from 'next';
import { SnipcartRequestParams } from '../../../interfaces/snipcart.d';
import { getBatch } from '../../../utils/chitchats';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.id === 'A') {
    res.status(200).json([
      { id: 'ASDFASDF', from: 'Batch A' },
      { id: 'YDFGSDFG', from: 'Batch A' },
    ]);
    return;
  }
  if (req.query.id === 'B') {
    res.status(200).json([
      { id: 'SDFG', from: 'Batch B' },
      { id: 'ZZZZZ', from: 'Batch B' },
      { id: 'PPEPRPRP', from: 'Batch B' },
    ]);
  }
}
