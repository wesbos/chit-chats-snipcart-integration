import { SnipcartShipmentRate } from '../interfaces/snipcart.d';
import { createShipment } from './chitchats';
import { convertChitChatRatesToSnipCart } from './snipCart';

interface ShippingRateError {
  key: string;
  message: string;
}

interface ShippingQuotes {
  rates?: SnipcartShipmentRate[] | null;
  errors?: ShippingRateError[];
}
export async function getShippingQuotes(
  incomingOrder: any
): Promise<ShippingQuotes> {
  console.group('Shipping Request');
  // A shipping quote is just a create shipment call with postage_type: 'unknown',
  const order = incomingOrder;
  const { shippingAddress, items, subtotal } = order.content;

  const totalWeight = items.reduce(
    (tally: number, item: any) => item.weight + tally,
    0
  );
  // const [MM, DD, YYYY] = new Date()
  //   .toLocaleString('en-US', {
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit',
  //   })
  //   .split('/');
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
    // ship_date: `${YYYY}-${MM}-${DD}`,
    ship_date: `today`, // TODO: Make this flexible for tomorrow. The above should work
    postage_type: 'unknown',
  });

  const rates = convertChitChatRatesToSnipCart(res);
  console.groupEnd();
  return {
    rates,
  };
}
