import { NextApiRequest, NextApiResponse } from 'next';
import { getShipment } from '../../../utils/chitchats';
import { withAuth } from '../../../utils/withAuth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const shipment = await getShipment(req.query.id as string);
  res.status(200).json(shipment.data);
}

export default withAuth(handler);
