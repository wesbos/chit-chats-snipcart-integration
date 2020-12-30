"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertChitChatRatesToSnipCart = void 0;
function convertChitChatRatesToSnipCart(res) {
    // const rate: SnipcartShipmentRate
    const rates = res.data?.shipment.rates?.map((rate) => ({
        cost: parseFloat(rate.payment_amount),
        description: `${rate.postage_description} --- ${rate.delivery_time_description} --- ${rate.postage_type} --- ${res.data?.shipment.id}`,
        guaranteedDaysToDelivery: 2,
        additionalInfos: `${rate.postage_type}--${res.data?.shipment.id}`,
        shippingProvider: `${rate.postage_type}--${res.data?.shipment.id}`,
    }));
    return rates;
}
exports.convertChitChatRatesToSnipCart = convertChitChatRatesToSnipCart;
