import { SnipcartRequestParams } from './../../../interfaces/snipcart.d';
import { NextApiRequest, NextApiResponse } from 'next';
import { sampleUserData } from '../../../utils/sample-data';
import getOrders from '../../../utils/snipCartAPI';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const orders = await getOrders(req.query as SnipcartRequestParams);
  res.status(200).json(orders);
};
