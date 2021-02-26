import { NextApiResponse, NextApiRequest } from 'next';
import fetch from 'isomorphic-fetch';
import { endpoint, headers } from '../../../utils/snipCartAPI';
import { withAuth } from '../../../utils/withAuth';

function handleError(err) {
  console.log('Error!', err);
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  console.log('Proxying Snipcart API');
  const url = req.url?.replace('/api/snipcart/', '');
  console.log(url);
  console.log(req.body);
  if (!url) {
    return res.status(500).json({ message: 'No URL Provided' });
  }

  const response = await fetch(`${endpoint}/${url}`, {
    headers,
    method: req.method,
    body: req.method === 'GET' ? undefined : (req.body as string),
  }).catch(handleError);

  const data: any = await response.json().catch(handleError);
  // res.status(200).json({ url, query, method: req.method, body: req.body });
  res.status(response.status).json(data);
}

export default withAuth(handler);
