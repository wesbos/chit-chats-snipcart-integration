"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShippingQuotes = void 0;
// https://docs.snipcart.com/v3/webhooks/shipping
const chitchats_1 = require("./chitchats");
async function getShippingQuotes() {
    // A shipping quote is just a create shipment call with postage_type: 'unknown',
    const res = await chitchats_1.createShipment({
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
    return {
        rates: res.data?.shipment.rates,
    };
}
exports.getShippingQuotes = getShippingQuotes;
