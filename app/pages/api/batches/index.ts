import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.status(200).json([
      { batch: 'A', id: 'A' },
      { batch: 'B', id: 'B' },
    ]);
  }
}
