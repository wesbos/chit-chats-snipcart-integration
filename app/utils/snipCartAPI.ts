import dotenv from 'dotenv';
import fetch from 'isomorphic-fetch';
import { SnipCartOrder } from '../interfaces/snipcart';
import { SnipCartOrdersResponse, SnipCartProductDefinition, SnipcartRequestParams } from './../interfaces/snipcart.d';

dotenv.config();
const endpoint = 'https://app.snipcart.com/api';
const headers = {
  Accept: 'application/json',
  Authorization: `Basic ${Buffer.from(process.env.SNIPCART_KEY || '').toString(
    'base64'
  )}`,
};

export async function getProducts(): Promise<SnipCartProductDefinition[]> {
  const res = await fetch(`${endpoint}/products`, {
    headers,
  });
  const products = await res.json();
  return products.items;
}


export default async function getOrders(params: SnipcartRequestParams): Promise<SnipCartOrder[]> {
  const y = params as URLSearchParams;
  const paramsString = new URLSearchParams(y).toString();
  const res = await fetch(`${endpoint}/orders?${paramsString}`, {
    headers,
  });
  const { items: orders } = (await res.json()) as SnipCartOrdersResponse;
  // await fs.writeFileSync('./order-items.json', JSON.stringify(data));
  // console.dir(data, { depth: null });
  if (orders?.length) {
    console.log(`Back with ${orders.length} Orders!`);
    return orders;
  }
  return [];
}

export async function getOrder(orderToken:string): Promise<SnipCartOrder> {
  const res = await fetch(`${endpoint}/orders/${orderToken}`, {
    headers,
  });
  const order = (await res.json()) as SnipCartOrder;
  return order;
}


interface MetaData {
  [key: string]: any;
}

export async function updateOrder(
  orderToken: string,
  data: MetaData
): Promise<SnipCartOrder> {
  const res = await fetch(`${endpoint}/orders/${orderToken}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return (await res.json()) as SnipCartOrder;
}

