import { NextApiRequest, NextApiResponse } from 'next';
import { getShipment } from '../../../utils/chitchats';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const shipment = await getShipment(req.query.id);
  res.status(200).json(shipment.data);
}
