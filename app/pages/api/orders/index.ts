import { NextApiRequest, NextApiResponse } from 'next';
import getOrders from '../../../utils/snipCartAPI';
import { withAuth } from '../../../utils/withAuth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const orders = await getOrders(req.query);
  res.status(200).json(orders);
}

export default withAuth(handler);
