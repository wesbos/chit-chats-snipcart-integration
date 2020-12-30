export interface SnipCartOrderResponse {
  items?: SnipCartOrder[];
  status?: null;
  paymentStatus?: null;
  campaignId?: null;
  invoiceNumber?: null;
  isRecurringOrder?: null;
  placedBy?: null;
  productId?: null;
  cascade: boolean;
  from?: null;
  to?: null;
  format?: null;
  totalItems: number;
  offset: number;
  limit: number;
}

export interface SnipCartOrder {
  discounts?: null[] | null;
  items?: SnipCartOrderItem[] | null;
  plans?: null[] | null;
  refunds?: null[] | null;
  taxes?: (TaxesEntity | null)[] | null;
  user: User;
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
  paymentStatus: string;
  email: string;
  willBePaidLater: boolean;
  billingAddress: BillingAddressOrShippingAddress;
  shippingAddress: BillingAddressOrShippingAddress;
  shippingAddressSameAsBilling: boolean;
  creditCardLast4Digits: string;
  trackingNumber?: null;
  trackingUrl?: null;
  shippingFees: number;
  shippingProvider?: null;
  shippingMethod: string;
  cardHolderName?: null;
  paymentMethod: string;
  notes?: null;
  customFieldsJson: string;
  userId: string;
  completionDate: string;
  cardType: string;
  paymentGatewayUsed: string;
  paymentDetails: PaymentDetails;
  taxProvider: string;
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
}
export interface SnipCartOrderItem {
  paymentSchedule: PaymentSchedule;
  pausingAction: string;
  cancellationAction: string;
  token: string;
  name: string;
  price: number;
  quantity: number;
  fileGuid?: null;
  url: string;
  id: string;
  initialData: string;
  description: string;
  categories?: null[] | null;
  totalPriceWithoutTaxes: number;
  weight: number;
  image: string;
  originalPrice?: null;
  uniqueId: string;
  stackable: boolean;
  minQuantity?: null;
  maxQuantity: number;
  addedOn: string;
  modificationDate: string;
  shippable: boolean;
  taxable: boolean;
  duplicatable: boolean;
  width: number;
  height: number;
  length: number;
  metadata?: null;
  __VNEXT_OrderId: number;
  totalPrice: number;
  totalWeight: number;
  taxes?: null[] | null;
  alternatePrices: AlternatePricesOrValidationErrors;
  customFields?: null[] | null;
  unitPrice: number;
  hasDimensions: boolean;
  hasTaxesIncluded: boolean;
  totalPriceWithoutDiscountsAndTaxes: number;
}
export interface PaymentSchedule {
  interval: number;
  intervalCount: number;
  trialPeriodInDays?: null;
  startsOn: string;
}
export interface AlternatePricesOrValidationErrors {}
export interface TaxesEntity {
  __VNEXT_OrderId: number;
  taxName: string;
  taxRate: number;
  amount: number;
  numberForInvoice: string;
  includedInPrice: boolean;
  appliesOnShipping: boolean;
  discountInducedAmountVariation: number;
}
export interface User {
  id: string;
  email: string;
  mode: string;
  statistics: Statistics;
  creationDate: string;
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
  shippingAddressSameAsBilling: boolean;
  status: string;
  sessionToken?: null;
  gravatarUrl: string;
  billingAddress: BillingAddressOrShippingAddress;
  shippingAddress: BillingAddressOrShippingAddress;
}
export interface Statistics {
  ordersCount: number;
  ordersAmount?: null;
  subscriptionsCount: number;
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
  validationErrors: AlternatePricesOrValidationErrors;
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
  taxes?: (TaxesEntity1 | null)[] | null;
  discountInducedTaxesVariation: number;
  adjustedTotal: number;
  shipping?: null;
}
export interface TaxesEntity1 {
  taxId?: null;
  name: string;
  rate: number;
  amount: number;
  unroundedAmount: number;
  numberForInvoice: string;
  includedInPrice: boolean;
  appliesOnShipping: boolean;
  discountInducedAmountVariation: number;
}

export interface SnipcartShipmentRate {
  cost: number;
  description?: string;
  guaranteedDaysToDelivery?: number;
  additionalInfos?: string;
  shippingProvider?: string;
}
