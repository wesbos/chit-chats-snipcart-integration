import Cors from 'cors'
import { NextApiResponse, NextApiRequest } from 'next';
import initMiddleware from '../../../utils/initMiddleware';
import { getProducts } from '../../../utils/snipCartAPI';

const cors = initMiddleware(
  Cors({
    methods: ['GET'],
    origin: '*'
  })
)


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await cors(req, res);
  const products = await getProducts();
  res.status(200).json(products);
}
