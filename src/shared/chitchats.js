"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShipment = exports.getShipment = exports.getShipments = exports.request = void 0;
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
const baseURL = process.env.NODE_ENV === 'production'
    ? 'https://chitchats.com/api/v1'
    : 'https://staging.chitchats.com/api/v1';
function handleError(err) {
    throw new Error(err.message);
}
async function request({ endpoint, method = 'GET', clientId = process.env.CHITCHATS_CLIENT_ID || '', limit = 100, page = 1, json = true, data = {}, }) {
    if (!clientId) {
        throw new Error('No Client ID Provided.');
    }
    const url = `${baseURL}/clients/${clientId}/${endpoint}`;
    console.log(`Fetching ${url} via a ${method} request`);
    const response = await isomorphic_fetch_1.default(url, {
        headers: {
            'Content-Type': 'application/json;',
            Authorization: process.env.CHITCHATS_API_KEY || '',
        },
        body: method === 'GET' ? undefined : JSON.stringify(data),
        method,
    });
    // if (response.status >= 400 && response.status <= 500) {
    //   const res = (await response.json()) as T;
    //   throw new Error(res?.data?.message);
    // }
    // console.dir(response.status, { depth: null });
    const res = (await response.json());
    return { data: res, headers: response.headers };
    // if (json) {
    // }
    // // otherwise return headers
    // return { headers: response.headers };
}
exports.request = request;
async function getShipments() {
    const shipments = await request({
        endpoint: 'shipments',
    });
    return shipments;
}
exports.getShipments = getShipments;
async function getShipment(id) {
    const shipment = await request({
        endpoint: `shipments/${id}`,
    });
    return shipment;
}
exports.getShipment = getShipment;
// // TODO: This just returns 200OK, need to modify request()
// export async function refundShipment(id: string): Promise<Shipment> {
//   const shipment = await request<Shipment>({
//     endpoint: `shipments/${id}/refund`,
//     method: 'PATCH',
//   });
//   console.log(shipment);
//   return shipment;
// }
async function createShipment(data) {
    const shipment = await request({
        endpoint: 'shipments',
        method: 'POST',
        data,
        json: true,
    });
    // console.dir(shipment, { depth: null });
    return shipment;
}
exports.createShipment = createShipment;
// void createShipment({
//   ...sweden,
//   description: 'Hand made bracelet',
//   value: '84.99',
//   value_currency: 'usd',
//   package_type: 'parcel',
//   package_contents: 'merchandise',
//   size_unit: 'cm',
//   size_x: 10,
//   size_y: 5,
//   size_z: 2,
//   weight_unit: 'g',
//   weight: 250,
//   postage_type: 'unknown',
//   ship_date: 'today',
// });
// refundShipment('N6S21X1E3T');
