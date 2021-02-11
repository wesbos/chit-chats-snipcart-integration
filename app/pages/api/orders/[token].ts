import { NextApiRequest, NextApiResponse } from 'next';
import { getOrder, updateOrder } from '../../../utils/snipCartAPI';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // UPATE
  if (req.method === 'POST') {
    const order = await updateOrder(req.query.token, {
      status: 'Shipped',
    });

    res.status(200).json(order);
    return;
  }
  // READ
  if (req.method === 'GET') {
    if (!req.query?.token) {
      throw new Error('You must specify an order token');
    }
    const order = await getOrder(req.query.token);
    res.status(200).json(order);
  }
}
