import fetch from 'isomorphic-fetch';
import { config } from 'dotenv';
import { sweden } from './data/sample-addresses';
import { Shipment, CreateShipmentInput } from './types/chitchat.d';

config();
const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://chitchats.com/api/v1'
    : 'https://staging.chitchats.com/api/v1';

interface RequestOptions {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH';
  clientId?: string;
  limit?: number;
  page?: number;
  json?: boolean;
  data?: {
    [key: string]: any;
  };
}

function handleError(err: Error) {
  throw new Error(err.message);
}

type ErrorMessage = {
  data?: {
    error?: {
      message: string;
    };
  };
};

type ChitChatResponse<Data> = {
  data?: Data;
  headers: Headers;
};

export async function request<T>({
  endpoint,
  method = 'GET',
  clientId = process.env.CHITCHATS_CLIENT_ID || '',
  limit = 100,
  page = 1,
  json = true,
  data = {},
}: RequestOptions): Promise<ChitChatResponse<T>> {
  if (!clientId) {
    throw new Error('No Client ID Provided.');
  }
  const url = `${baseURL}/clients/${clientId}/${endpoint}`;
  console.log(`Fetching ${url} via a ${method} request`);

  const response: Response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json;',
      Authorization: process.env.CHITCHATS_API_KEY || '',
    },
    body: JSON.stringify(data),
    method,
  });
  // if (response.status >= 400 && response.status <= 500) {
  //   const res = (await response.json()) as T;
  //   throw new Error(res?.data?.message);
  // }
  // console.dir(response.status, { depth: null });
  const res = (await response.json()) as T;
  return { data: res, headers: response.headers };
  // if (json) {
  // }
  // // otherwise return headers
  // return { headers: response.headers };
}

export async function getShipments(): Promise<ChitChatResponse<Shipment[]>> {
  const shipments = await request<Shipment[]>({
    endpoint: 'shipments',
  });
  return shipments;
}

export async function getShipment(
  id: string
): Promise<ChitChatResponse<Shipment>> {
  const shipment = await request<Shipment>({
    endpoint: `shipments/${id}`,
  });
  return shipment;
}

// // TODO: This just returns 200OK, need to modify request()
// export async function refundShipment(id: string): Promise<Shipment> {
//   const shipment = await request<Shipment>({
//     endpoint: `shipments/${id}/refund`,
//     method: 'PATCH',
//   });
//   console.log(shipment);
//   return shipment;
// }

export async function createShipment(
  data: CreateShipmentInput
): Promise<ChitChatResponse<Shipment>> {
  const shipment = await request<Shipment>({
    endpoint: 'shipments',
    method: 'POST',
    data,
    json: true,
  });
  console.dir(shipment, { depth: null });
  return shipment;
}

void createShipment({
  ...sweden,
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
  postage_type: 'unknown',
  ship_date: 'today',
});

// refundShipment('N6S21X1E3T');
