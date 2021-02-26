// 1. Get Rates from Stallion
// 2. Purchase Shipment from Stallion
// 3. Get tracking From Stallion
// 3. Get Label from Stallion

// Purchase Shipment
// package_type: For all non US shipments please select Parcel.

// Get Label
await fetch('https://ship.stallionexpress.ca/api/shipments/print', {
  credentials: 'include',
  headers: {
    Authorization: 'Bearer ABC123',
    'Content-Type': 'application/json;charset=utf-8',
  },
  referrer: 'https://ship.stallionexpress.ca/shipments',
  body: '{"ids":["210224N0CY"],"sort_by":"created_at","sort_order":"asc"}',
  method: 'POST',
  mode: 'cors',
});

// Rates Request

// curl -X POST "https://ship.stallionexpress.ca/api/v3/rates" -H  "accept: application/json" -H  "Authorization: Bearer XXX" -H  "Content-Type: application/json" -d "{  \"name\": \"Pramod Thomson\",  \"address1\": \"30 Clearview Dr\",  \"address2\": \"Lot 2\",  \"city\": \"Rock Springs\",  \"province_code\": \"WY\",  \"postal_code\": \"82901\",  \"country_code\": \"US\",  \"weight_unit\": \"lbs\",  \"weight\": 0.6,  \"length\": 9,  \"width\": 12,  \"height\": 1,  \"size_unit\": \"cm\",  \"package_contents\": \"Two pair of socks\",  \"value\": 10,  \"currency\": \"USD\",  \"package_type\": \"legal_flat_rate_envelope\",  \"signature_confirmation\": true,  \"purchase_label\": true}"
