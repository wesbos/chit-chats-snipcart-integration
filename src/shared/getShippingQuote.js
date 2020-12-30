"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShippingQuotes = void 0;
const shippingrates_fetch_1 = require("./data/shippingrates.fetch");
// https://docs.snipcart.com/v3/webhooks/shipping
const chitchats_1 = require("./chitchats");
async function getShippingQuotes(incomingOrder) {
    // A shipping quote is just a create shipment call with postage_type: 'unknown',
    // const { shippingAddress } = incomingOrder.content;
    console.log(incomingOrder);
    const order = incomingOrder || shippingrates_fetch_1.shippingRatesFetch;
    const { shippingAddress, items, subtotal } = order.content;
    const totalWeight = items.reduce((tally, item) => item.weight + tally, 0);
    const res = await chitchats_1.createShipment({
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
    }));
    return {
        rates,
    };
}
exports.getShippingQuotes = getShippingQuotes;
