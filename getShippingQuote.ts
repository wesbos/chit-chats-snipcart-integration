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
  additionalInfos?: string;
  currencyCode?: string;
  guaranteedDaysToDelivery: number;
  deliveredOn?: Date;
  slug?: string;
}

interface ShippingRateError {
  key: string;
  message: string;
}

interface ShippingQuotes {
  rates?: Rate[];
  errors?: ShippingRateError[];
}
export async function getShippingQuotes(): Promise<ShippingQuotes> {
  // A shipping quote is just a create shipment call with postage_type: 'unknown',
  const shipment = await createShipment({
    // The User Details
    name: 'Swedish Fish',
    address_1: 'Wollmar Yxkullsgatan 10',
    city: 'Stockholm',
    province_code: 'Fitzrovia',
    postal_code: '118 50',
    country_code: 'SE',
    // The Item Details
    description: 'Hand made bracelet',
    value: '84.99',
    value_currency: 'usd',
    package_type: 'parcel',
    package_contents: 'merchandise',
    size_unit: 'cm',
    size_x: 10,
    size_y: 5,
    size_z: 2,
    weight_unit: 'g',
    weight: 250,
    // The Most Important Parts
    ship_date: 'today',
    postage_type: 'unknown',
  });

  console.log(shipment);

  return {
    rates: [],
  };

  // Once the Shipment comes back, we need to return the rates
}
