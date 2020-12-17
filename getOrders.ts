import fetch from 'isomorphic-fetch';
import dotenv from 'dotenv';
import { SnipCartOrderResponse, SnipCartOrder } from './types/snipcart.d';

dotenv.config();
const endpoint = 'https://app.snipcart.com/api';
const headers = {
  Accept: 'application/json',
  Authorization: `Basic ${Buffer.from(process.env.SNIPCART_KEY || '').toString(
    'base64'
  )}`,
};

export default async function getOrders(): Promise<SnipCartOrder[]> {
  const res = await fetch(`${endpoint}/orders`, {
    headers,
  });
  const { items: orders } = (await res.json()) as SnipCartOrderResponse;
  // await fs.writeFileSync('./order-items.json', JSON.stringify(data));
  // console.dir(data, { depth: null });
  if (orders?.length) {
    console.log(`Back with ${orders.length} Orders!`);
    return orders;
  }
  return [];
}

interface MetaData {
  [key: string]: any;
}

export async function updateOrder(
  order: SnipCartOrder,
  data: MetaData
): Promise<SnipCartOrder> {
  const res = await fetch(`${endpoint}/orders/${order.token}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return (await res.json()) as SnipCartOrder;
}
