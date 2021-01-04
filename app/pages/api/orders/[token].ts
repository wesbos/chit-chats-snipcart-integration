import { SnipcartRequestParams } from './../../../interfaces/snipcart.d';
import { NextApiRequest, NextApiResponse } from 'next';
import { sampleUserData } from '../../../utils/sample-data';
import getOrders, { updateOrder } from '../../../utils/snipCartAPI';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Start a new group
  console.groupCollapsed(`Request to ${req.url} at ${new Date().toLocaleTimeString()}`)

  const order = await updateOrder(req.query.token, { status: 'Shipped'});
  console.groupEnd();

  res.status(200).json(order)
};
