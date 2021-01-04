import { NextApiRequest, NextApiResponse } from 'next';
import waait from 'waait';
import { buyShipment, getShipment } from '../../../utils/chitchats';
import { updateOrder } from '../../../utils/snipCartAPI';


interface SnipCartWebhookBody {
  eventName: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  console.group('Webhook Request');
  // Todo: Auth Snipcart webhook
  const body = req.body as SnipCartWebhookBody;
  console.log('Incoming Webhook!');
  console.log(req);
  if (body.eventName === 'order.completed') {
    console.log('buying Shipment!');
    const [
      method,
      timing,
      shippingMethod,
      shippingId,
    ] = body.content.shippingMethod.split(' --- ');
    const shipmentResponse = await buyShipment(shippingId, shippingMethod);
    console.dir(shipmentResponse, { depth: null });
    console.log('Now waiting 3 seconds...');
    // Wait ~3 seconds
    await waait(3000);
    // Fetch the shipment Info
    console.log('fetching shipment');
    const { data } = await getShipment(shippingId);
    const { shipment } = data;
    console.log(shipment?.tracking_url);
    console.log(shipment);
    console.log('Updating Shipment data in Snipcart');
    const updatedOrder = await updateOrder(body.content.token, {
      trackingNumber: shipment?.carrier_tracking_code,
      trackingUrl: shipment?.tracking_url,
      // don't mark as shipped just yet
      // status: 'Shipped',
      metadata: {
        test: 'Testing...',
        label: shipment?.postage_label_png_url,
        labelZpl: shipment?.postage_label_zpl_url,
        chitChatId: shippingId,
      },
    });
    console.log('Done!', updatedOrder);

    console.groupEnd();
    return res.status(200).json(updatedOrder);

    // return {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   statusCode: 200,
    //   body: JSON.stringify(updatedOrder),
    // };
  }
}
// 1. Buy the shipment while updating postage_type to be that of the order
// 2. Wait 3 seconds? Maybe
// 3. Check
