import { getShipments } from '../../shared/chitchats';
import { getShippingQuotes } from '../../shared/getShippingQuote';
import { Request } from '../../shared/types/arc';

export async function handler(req: Request) {
  const rateResponse = await getShippingQuotes();
  // const shipments = await getShipments();
  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
    },
    statusCode: 200,
    body: JSON.stringify(rateResponse),
  };
}
