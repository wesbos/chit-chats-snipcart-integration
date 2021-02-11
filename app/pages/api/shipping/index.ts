import { NextApiResponse, NextApiRequest } from 'next';
import { ShippingRatesRequest } from '../../../interfaces/chitchat';
import { getShippingQuotes } from '../../../utils/getShippingQuote';
import { getShipment } from '../../../utils/chitchats';
import { convertChitChatRatesToSnipCart } from '../../../utils/snipCart';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  console.log('Shipping API Webhook - Requesting Rates');

  // First check if we have already quoted this one. We do this because Snipcart requests the shipping rates once from the client, and then again from their confirmation server to ensure no one monkied with the values.
  const shippingRatesRequest = req.body as ShippingRatesRequest;

  let rateResponse;
  if (shippingRatesRequest.content.shippingMethod) {
    console.log(
      'There is an existing shipping method, lets check for a shipping ID'
    );

    const shippingId = shippingRatesRequest.content.shippingRateUserDefinedId;

    if (shippingId) {
      console.log(`There is an existing shipping ID!! ${shippingId}`);
      const shipmentResponse = await getShipment(shippingId);
      // TODO, parse this into a rate response
      rateResponse = {
        rates: convertChitChatRatesToSnipCart(shipmentResponse),
      };
      console.log('Cached Shipping rates:');
      console.log(rateResponse);
    } else {
      rateResponse = await getShippingQuotes(shippingRatesRequest);
    }
  } else {
    // Get fresh quotes
    console.log('Fresh Rates')
    rateResponse = await getShippingQuotes(shippingRatesRequest);
  }
  console.log(rateResponse);
  res.status(200).json(rateResponse);
}
