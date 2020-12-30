import { ShippingRatesRequest } from '../../shared/types/chitchat.d';
import { getShipment, getShipments } from '../../shared/chitchats';
import { getShippingQuotes } from '../../shared/getShippingQuote';
import { ArcRequest } from '../../shared/types/arc';
import { convertChitChatRatesToSnipCart } from '../../shared/snipCart';

export async function handler(req: ArcRequest) {
  console.log('REQUESTING SHIPPING RATES');

  // First check if we have already quoted this one. We do this because Snipcart requests the shipping rates once from the client, and then again from their confirmation server to ensure no one monkied with the values.

  const shippingRatesRequest = JSON.parse(req.body!) as ShippingRatesRequest;

  let rateResponse;
  if (shippingRatesRequest.content.shippingMethod) {
    console.log(
      'There is an existing shipping method, lets check for a shipping ID'
    );

    const [
      method,
      timing,
      shippingMethod,
      shippingId,
    ] = shippingRatesRequest.content.shippingMethod.split(' --- ');

    // TODO Fetch shipping Details from Chitchats or derive it from the request
    if (shippingId) {
      console.log(`There is an existing shipping ID!! ${shippingId}`);
      const shipmentResponse = await getShipment(shippingId);
      // TODO, parse this into a rate response
      rateResponse = {
        rates: convertChitChatRatesToSnipCart(shipmentResponse),
      };
      console.log('CAched Shipping rates:');
      console.log(rateResponse);
    } else {
      rateResponse = await getShippingQuotes(shippingRatesRequest);
    }
  } else {
    // Get fresh quotes
    rateResponse = await getShippingQuotes(shippingRatesRequest);
  }
  // console.log(rateResponse);

  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 200,
    body: JSON.stringify(rateResponse),
  };
}
