import { ChitChatResponse } from './chitchats';
import { Shipment } from '../interfaces/chitchat';
import { SnipcartShipmentRate } from '../interfaces/snipcart';

export function convertChitChatRatesToSnipCart(
  res: ChitChatResponse<Shipment>
): SnipcartShipmentRate[] {
  const rates: SnipcartShipmentRate[] = res.data?.shipment.rates?.map(
    (rate) => ({
      cost: parseFloat(rate.payment_amount),
      description: `${rate.postage_description} --- ${rate.delivery_time_description} --- ${rate.postage_type} --- ${res.data?.shipment.id}`,
      guaranteedDaysToDelivery: 2,
      additionalInfos: `${rate.postage_type}--${res.data?.shipment.id}`,
      shippingProvider: `${rate.postage_type}--${res.data?.shipment.id}`,
    })
  );
  return rates;
}
