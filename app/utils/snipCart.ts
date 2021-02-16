import { ChitChatResponse, ShipmentResponse } from './chitchats';
import { SnipcartShipmentRate } from '../interfaces/snipcart';

export function convertChitChatRatesToSnipCart(
  res: ChitChatResponse<ShipmentResponse>
): SnipcartShipmentRate[] {
  const chitChatRates = res.data?.shipment?.rates || [];
  const rates: SnipcartShipmentRate[] = chitChatRates.map((rate) => ({
    cost: parseFloat(rate.payment_amount),
    description: `${rate.postage_description} (${rate.delivery_time_description})`,
    // TODO: Show delivery dates
    // guaranteedDaysToDelivery: 2,
    userDefinedId: `${res.data?.shipment.id} --- ${rate.postage_type}`,
  }));
  return rates;
}
