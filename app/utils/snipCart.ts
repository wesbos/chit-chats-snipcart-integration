import { ChitChatResponse } from './chitchats';
import { Shipment } from '../interfaces/chitchat';
import { SnipcartShipmentRate } from '../interfaces/snipcart';

export function convertChitChatRatesToSnipCart(
  res: ChitChatResponse<Shipment>
): SnipcartShipmentRate[] {
  const rates: SnipcartShipmentRate[] = res.data?.shipment.rates?.map(
    (rate) => ({
      cost: parseFloat(rate.payment_amount),
      description: `${rate.postage_description} --- ${rate.delivery_time_description} --- ${rate.postage_type}`,
      // TODO: Show delivery dates
      // guaranteedDaysToDelivery: 2,
      userDefinedId: res.data?.shipment.id,
    })
  );
  return rates;
}
