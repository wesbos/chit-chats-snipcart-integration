import { NextApiRequest, NextApiResponse } from 'next';
import { getBatch } from '../../../utils/chitchats';
import { withAuth } from '../../../utils/withAuth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.id) {
    res.status(200).json({});
    return;
  }
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  const batch = await getBatch(id);
  res.status(200).json(batch.data);
}

export default withAuth(handler);
