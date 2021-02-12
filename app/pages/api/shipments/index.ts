import { NextApiRequest, NextApiResponse } from 'next';
import { getShipments } from '../../../utils/chitchats';
import { withAuth } from '../../../utils/withAuth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const params = new URLSearchParams(req.query);
    const shipments = await getShipments({
      params: `?${params.toString()}`,
    });
    res.status(200).json(shipments.data);
  }
}

export default withAuth(handler);
