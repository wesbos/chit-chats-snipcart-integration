import { NextApiRequest, NextApiResponse } from 'next';
import { getOrder, updateOrder } from '../../../utils/snipCartAPI';
import { withAuth } from '../../../utils/withAuth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Update Order. Mark as shipped
  if (req.method === 'POST') {
    const order = await updateOrder(req.query.token, {
      // This should probably be sent from the query
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

export default withAuth(handler);
