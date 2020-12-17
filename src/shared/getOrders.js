"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = void 0;
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const endpoint = 'https://app.snipcart.com/api';
const headers = {
    Accept: 'application/json',
    Authorization: `Basic ${Buffer.from(process.env.SNIPCART_KEY || '').toString('base64')}`,
};
async function getOrders() {
    const res = await isomorphic_fetch_1.default(`${endpoint}/orders`, {
        headers,
    });
    const { items: orders } = (await res.json());
    // await fs.writeFileSync('./order-items.json', JSON.stringify(data));
    // console.dir(data, { depth: null });
    if (orders?.length) {
        console.log(`Back with ${orders.length} Orders!`);
        return orders;
    }
    return [];
}
exports.default = getOrders;
async function updateOrder(order, data) {
    const res = await isomorphic_fetch_1.default(`${endpoint}/orders/${order.token}`, {
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(data),
    });
    return (await res.json());
}
exports.updateOrder = updateOrder;
