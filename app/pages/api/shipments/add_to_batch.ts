import { NextApiRequest, NextApiResponse } from 'next';
import { addToBatch } from '../../../utils/chitchats';
import { withAuth } from '../../../utils/withAuth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  const body = JSON.parse(req.body);
  await addToBatch(req.body);
  res.status(200).json({
    message: `Added ${body.shipment_ids} to Batch ${body.batch_id}`,
  });
}

export default withAuth(handler);
