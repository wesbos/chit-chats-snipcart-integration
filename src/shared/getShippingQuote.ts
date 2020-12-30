import { shippingRatesFetch } from './data/shippingrates.fetch';
import { RatesEntity } from './types/chitchat.d';
// https://docs.snipcart.com/v3/webhooks/shipping

import { createShipment } from './chitchats';

// providerType	"CanadaPost"
// cost	11.56
// description	"Canada Post Expedited Parcel"
// additionalInfos	null
// currencyCode	null
// guaranteedDaysToDelivery	2
// deliveredOn	"2020-12-21T00:00:00Z"
// slug	"canada-post-expedited-parcel"

interface Rate {
  providerType: string;
  cost: number;
  description: string;
  guaranteedDaysToDelivery: number;
  additionalInfos?: string;
  // currencyCode?: string;
  // deliveredOn?: Date;
  // slug?: string;
}

interface ShippingRateError {
  key: string;
  message: string;
}

interface ShippingQuotes {
  rates?: Rate[] | null;
  errors?: ShippingRateError[];
}
export async function getShippingQuotes(
  incomingOrder: any
): Promise<ShippingQuotes> {
  // A shipping quote is just a create shipment call with postage_type: 'unknown',
  // const { shippingAddress } = incomingOrder.content;

  console.log(incomingOrder);

  const order = incomingOrder || shippingRatesFetch;
  const { shippingAddress, items, subtotal } = order.content;

  const totalWeight = items.reduce(
    (tally: number, item: any) => item.weight + tally,
    0
  );
  const res = await createShipment({
    // The User Details
    name: shippingAddress.fullName,
    address_1: shippingAddress.address1,
    address_2: shippingAddress.address2,
    city: shippingAddress.city,
    province_code: shippingAddress.province,
    postal_code: shippingAddress.postalCode,
    phone: shippingAddress.phone || '',
    country_code: shippingAddress.country,
    // The Item Details
    description: items[0].name,
    value: `${subtotal}`,
    value_currency: 'usd',
    package_type: 'parcel',
    package_contents: 'merchandise',
    size_unit: 'cm',
    size_x: items[0].width,
    size_y: items[0].height,
    size_z: items[0].length,
    weight_unit: 'g',
    weight: totalWeight,
    // The Most Important Parts
    ship_date: 'today',
    postage_type: 'unknown',
  });

  // console.log(res.data?.shipment.rates);

  const rates = res.data?.shipment.rates?.map((rate) => ({
    cost: parseFloat(rate.payment_amount),
    description: `${rate.postage_description} --- ${rate.delivery_time_description} --- ${rate.postage_type} --- ${res.data?.shipment.id}`,
    guaranteedDaysToDelivery: 2,
    additionalInfos: `${rate.postage_type}--${res.data?.shipment.id}`,
    shippingProvider: `${rate.postage_type}--${res.data?.shipment.id}`,
    // providerType: `${rate.postage_type}--${res.data?.shipment.id}`,
  }));

  return {
    rates,
  };
}
