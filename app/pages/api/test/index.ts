import { NextApiResponse, NextApiRequest } from 'next';

async function handler(
  // @ts-ignore
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  res.status(200).json({ ID: process.env.CHITCHATS_CLIENT_ID });
}

export default handler;
