import { NextApiRequest, NextApiResponse } from 'next';
import { getShipment } from '../../../utils/chitchats';
import { getOrder, updateOrder } from '../../../utils/snipCartAPI';
import { withAuth } from '../../../utils/withAuth';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // This function:
  // 1. Takes in a SnipCart Token
  // 2. Find's the Snipcart Order
  // 3. From the order's metadata, finds the chitchat ID
  // 4. Looks up the Chit Chat Shipment to get the label URL
  // 5. Saves the Label URL back to SnipCart
  const { token: inboundToken } = req.query;

  const token = Array.isArray(inboundToken) ? inboundToken[0] : inboundToken;

  // 1. Lookup snipcart Order
  const order = await getOrder(token);
  if (!order || !order.metadata) {
    return res.status(404).json({ message: 'No metadata for this order' });
  }
  const { chitChatId } = order.metadata;

  if (!chitChatId) {
    return res
      .status(404)
      .json({ message: 'No Chit Chats ID found for this order' });
  }
  // 2. find Chit Chat Shipment
  const shipmentResponse = await getShipment(chitChatId);
  const shipmentData = shipmentResponse.data?.shipment;

  // 3. Update the metadata in SnipCart
  const updatedOrder = await updateOrder(token, {
    metadata: {
      label: shipmentData?.postage_label_png_url,
      labelZpl: shipmentData?.postage_label_zpl_url,
      chitChatId,
    },
  });
  res.status(200).json(updatedOrder);
}

export default withAuth(handler);
