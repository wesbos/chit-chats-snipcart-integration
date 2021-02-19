import { NextApiResponse, NextApiRequest } from 'next';

async function handler(
  // @ts-ignore
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  res.status(200).json({
    CHITHCHATS_CLIENT_ID: process.env.CHITCHATS_CLIENT_ID,
    VERCEL_ENV: process.env.VERCEL_ENV,
  });
}

export default handler;
