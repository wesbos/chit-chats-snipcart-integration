import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

export function withAuth(originalHandler: NextApiHandler) {
  return async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    // most basic permissions. If the user's email isn't mine, no access.
    if (!session || session.user?.email !== 'wes@wesbos.com') {
      res.status(401).json({ message: 'Unauthorized' });
      console.log('unauthorized');
      return;
    }
    return originalHandler(req, res);
  };
}
