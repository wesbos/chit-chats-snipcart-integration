export interface Shipment {
  data?: {
    error?: {
      message?: string;
    };
  };
  id: string;
  status: string;
  batch_id?: null;
  to_name: string;
  to_address_1: string;
  to_address_2?: null;
  to_city: string;
  to_province_code: string;
  to_postal_code: string;
  to_country_code: string;
  to_phone?: null;
  return_name: string;
  return_address_1: string;
  return_address_2?: null;
  return_city: string;
  return_province_code: string;
  return_postal_code: string;
  return_country_code: string;
  return_phone: string;
  package_contents: string;
  description: string;
  value: string;
  value_currency: string;
  order_id?: string | null;
  order_store?: null;
  package_type: string;
  size_unit?: string | null;
  size_x: number;
  size_y: number;
  size_z: number;
  weight_unit: string;
  weight: number;
  is_insured: boolean;
  is_insurance_requested: boolean;
  is_media_mail_requested: boolean;
  is_signature_requested: boolean;
  postage_type: string;
  carrier: string;
  carrier_tracking_code?: string | null;
  tracking_url: string;
  ship_date: string;
  purchase_amount: string;
  provincial_tax?: null;
  provincial_tax_label?: null;
  federal_tax?: null;
  federal_tax_label?: null;
  postage_fee: string;
  insurance_fee?: string | null;
  delivery_fee?: string | null;
  created_at: string;
  postage_label_png_url: string;
  postage_label_zpl_url: string;
  rates?: RatesEntity[] | null;
}

export interface RatesEntity {
  postage_type: string;
  postage_carrier_type: string;
  postage_description: string;
  signature_confirmation_description?: null;
  delivery_time_description: string;
  tracking_type_description: string;
  is_insured: boolean;
  purchase_amount: string;
  provincial_tax?: null;
  provincial_tax_label?: null;
  federal_tax?: null;
  federal_tax_label?: null;
  postage_fee: string;
  insurance_fee?: string | null;
  delivery_fee?: string | null;
  payment_amount: string;
}

type PackageTypes =
  | 'unknown'
  | 'card'
  | 'letter'
  | 'envelope'
  | 'thick_envelope'
  | 'parcel'
  | 'flat_rate_envelope'
  | 'flat_rate_legal_envelope'
  | 'flat_rate_padded_envelope'
  | 'flat_rate_gift_card_envelope'
  | 'flat_rate_window_envelope'
  | 'flat_rate_cardboard_envelope'
  | 'small_flat_rate_envelope'
  | 'small_flat_rate_box'
  | 'medium_flat_rate_box_1'
  | 'medium_flat_rate_box_2'
  | 'large_flat_rate_box'
  | 'large_flat_rate_board_game_box'
  | 'regional_rate_box_a_1'
  | 'regional_rate_box_a_2'
  | 'regional_rate_box_b_1'
  | 'regional_rate_box_b_2';

type PackageContents =
  | 'merchandise'
  | 'documents'
  | 'gift'
  | 'returned_goods'
  | 'sample'
  | 'other';

type PostageType =
  | 'unknown'
  | 'usps_express'
  | 'usps_express_mail_international'
  | 'usps_first'
  | 'usps_first_class_mail_international'
  | 'usps_first_class_package_international_servic'
  | 'usps_library_mail'
  | 'usps_media_mail'
  | 'usps_parcel_select'
  | 'usps_priority'
  | 'usps_priority_mail_international'
  | 'usps_other'
  | 'ups_other'
  | 'fedex_other'
  | 'chit_chats_canada_tracked'
  | 'chit_chats_international_not_tracked'
  | 'chit_chats_us_tracked'
  | 'dhl_other'
  | 'asendia_priority_tracked'
  | 'ups_mi_expedited';

export interface CreateShipmentInput {
  package_contents: PackageContents;
  package_type: PackageTypes;
  postage_type: PostageType;
  size_unit: 'm' | 'cm' | 'in';
  weight_unit: 'lb' | 'oz' | 'kg' | 'g';
  value_currency: 'cad' | 'usd';
  name: string;
  address_1: string;
  address_2?: string;
  city: string;
  province_code?: string;
  postal_code: string;
  country_code: string;
  phone?: string;
  description: string;
  value: string;
  order_id?: string;
  order_store?: string;
  weight: number;
  size_x: number;
  size_y: number;
  size_z: number;
  insurance_requested?: boolean;
  signature_requested?: boolean;
  tracking_number?: string;
  ship_date: string;
}

export interface ShippingRatesRequest {
  eventName: string;
  mode: string;
  createdOn: string;
  content: Content;
}

// This is a snipcart interface, no chitchats
// TODO: Move to own file
export interface Content {
  vnexT_MigrationFailed: boolean;
  token: string;
  isRecurringOrder: boolean;
  parentToken?: null;
  parentInvoiceNumber?: null;
  subscriptionId?: null;
  currency: string;
  creationDate: string;
  modificationDate: string;
  recoveredFromCampaignId?: null;
  status: string;
  paymentStatus?: null;
  email: string;
  willBePaidLater: boolean;
  billingAddress: BillingAddressOrShippingAddress;
  shippingAddress: BillingAddressOrShippingAddress;
  shippingAddressSameAsBilling: boolean;
  creditCardLast4Digits?: null;
  trackingNumber?: null;
  trackingUrl?: null;
  shippingFees: number;
  shippingProvider?: null;
  shippingMethod: string;
  cardHolderName?: null;
  paymentMethod: string;
  notes?: null;
  customFieldsJson: string;
  userId?: null;
  completionDate?: null;
  paymentGatewayUsed: string;
  paymentDetails: PaymentDetails;
  taxProvider: string;
  discounts?: null[] | null;
  plans?: null[] | null;
  taxes?: null[] | null;
  user?: null;
  items?: (null[] | null)[] | null;
  refunds?: null[] | null;
  lang: string;
  refundsAmount: number;
  adjustedAmount: number;
  finalGrandTotal: number;
  billingAddressFirstName?: null;
  billingAddressName: string;
  billingAddressCompanyName?: null;
  billingAddressAddress1: string;
  billingAddressAddress2: string;
  billingAddressCity: string;
  billingAddressCountry: string;
  billingAddressProvince: string;
  billingAddressPostalCode: string;
  billingAddressPhone?: null;
  shippingAddressFirstName?: null;
  shippingAddressName: string;
  shippingAddressCompanyName?: null;
  shippingAddressAddress1: string;
  shippingAddressAddress2: string;
  shippingAddressCity: string;
  shippingAddressCountry: string;
  shippingAddressProvince: string;
  shippingAddressPostalCode: string;
  shippingAddressPhone?: null;
  totalNumberOfItems: number;
  invoiceNumber: string;
  billingAddressComplete: boolean;
  shippingAddressComplete: boolean;
  shippingMethodComplete: boolean;
  savedAmount: number;
  subtotal: number;
  baseTotal: number;
  itemsTotal: number;
  totalPriceWithoutDiscountsAndTaxes: number;
  taxableTotal: number;
  grandTotal: number;
  total: number;
  totalWeight: number;
  totalRebateRate: number;
  customFields?: null[] | null;
  shippingEnabled: boolean;
  numberOfItemsInOrder: number;
  paymentTransactionId: string;
  metadata?: null;
  taxesTotal: number;
  itemsCount: number;
  summary: Summary;
  ipAddress: string;
  userAgent: string;
  hasSubscriptions: boolean;
  userDefinedId?: string;
  shippingRateUserDefinedId: string;
}
export interface BillingAddressOrShippingAddress {
  fullName: string;
  firstName?: null;
  name: string;
  company?: null;
  address1: string;
  address2: string;
  fullAddress: string;
  city: string;
  country: string;
  postalCode: string;
  province: string;
  phone?: null;
  vatNumber?: null;
  hasMinimalRequiredInfo: boolean;
}

export interface PaymentDetails {
  iconUrl?: null;
  display?: null;
  instructions?: null;
}
export interface Summary {
  subtotal: number;
  taxableTotal: number;
  total: number;
  payableNow: number;
  paymentMethod: string;
  taxes?: null[] | null;
  discountInducedTaxesVariation: number;
  adjustedTotal: number;
  shipping?: null;
}

export interface ChitChatsBatch {
  id: number;
  status: 'received' | 'ready' | 'pending';
  created_at: string;
  label_png_url: string;
  label_zpl_url: string;
}

export interface BatchRequest {
  batchId: string;
  shipmentIds: string[];
}
