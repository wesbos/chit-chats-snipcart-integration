import Cors from 'cors';
import { NextApiResponse, NextApiRequest } from 'next';
import initMiddleware from '../../../utils/initMiddleware';
import { getProducts } from '../../../utils/snipCartAPI';
import { withAuth } from '../../../utils/withAuth';

const cors = initMiddleware(
  Cors({
    methods: ['GET'],
    origin: '*',
  })
);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await cors(req, res);
  const products = await getProducts();
  res.status(200).json(products);
}

export default handler;
