// ReturnShield AI — access layer for the bundled orders_database.csv (10,000 real rows).
// The CSV lives in public/ as a static asset; it is fetched lazily on first lookup
// and cached in memory. No database, everything stays on the frontend.

import { scoreCustomDraft, type CustomOrderDraft, type PaymentMethod, type ShippingMethod, type CustomerType } from './orderScoring'
import type { Order } from './data'

export type DatasetRow = {
  orderId: string
  productCategory: string
  productPrice: number
  orderQuantity: number
  userAge: number
  userGender: string
  userLocation: string
  paymentMethod: PaymentMethod
  shippingMethod: ShippingMethod
  discountApplied: number
  sellerRating: number
  productRating: number
  previousReturns: number
  customerType: CustomerType
  productReviewCount: number
  orderValue: number
}

// CSV header order:
// Order_ID,Product_Category,Product_Price,Order_Quantity,User_Age,User_Gender,User_Location,
// Payment_Method,Shipping_Method,Discount_Applied,Seller_Rating,Product_Rating,
// Previous_Returns,Customer_Type,Product_Review_Count,Order_Value
function parseRow(cells: string[]): DatasetRow | null {
  if (cells.length < 16) return null
  const [orderId, productCategory, productPrice, orderQuantity, userAge, userGender, userLocation, paymentMethod, shippingMethod, discountApplied, sellerRating, productRating, previousReturns, customerType, productReviewCount, orderValue] = cells
  if (!orderId) return null
  return {
    orderId: orderId.trim(),
    productCategory: productCategory.trim(),
    productPrice: Number.parseFloat(productPrice),
    orderQuantity: Number.parseInt(orderQuantity, 10),
    userAge: Number.parseInt(userAge, 10),
    userGender: userGender.trim(),
    userLocation: userLocation.trim(),
    paymentMethod: paymentMethod.trim() as PaymentMethod,
    shippingMethod: shippingMethod.trim() as ShippingMethod,
    discountApplied: Number.parseFloat(discountApplied),
    sellerRating: Number.parseFloat(sellerRating),
    productRating: Number.parseFloat(productRating),
    previousReturns: Number.parseInt(previousReturns, 10),
    customerType: customerType.trim() as CustomerType,
    productReviewCount: Number.parseInt(productReviewCount, 10),
    orderValue: Number.parseFloat(orderValue),
  }
}

let datasetCache: Map<string, DatasetRow> | null = null
let datasetPromise: Promise<Map<string, DatasetRow>> | null = null

async function loadDataset(): Promise<Map<string, DatasetRow>> {
  if (datasetCache) return datasetCache
  if (!datasetPromise) {
    datasetPromise = fetch('/orders_database.csv')
      .then((res) => {
        if (!res.ok) throw new Error(`Dataset fetch failed (${res.status})`)
        return res.text()
      })
      .then((text) => {
        const map = new Map<string, DatasetRow>()
        const lines = text.split(/\r?\n/)
        for (let i = 1; i < lines.length; i += 1) {
          const line = lines[i]
          if (!line) continue
          const row = parseRow(line.split(','))
          if (row) map.set(row.orderId.toUpperCase(), row)
        }
        datasetCache = map
        return map
      })
      .catch((error) => {
        datasetPromise = null
        throw error
      })
  }
  return datasetPromise
}

// Looks up an order by ID (case-insensitive, `ORD` prefix optional: "100429" works too).
export async function fetchDatasetOrder(orderId: string): Promise<DatasetRow | null> {
  const trimmed = orderId.trim().toUpperCase()
  if (!trimmed) return null
  const dataset = await loadDataset()
  return dataset.get(trimmed) ?? dataset.get(`ORD${trimmed}`) ?? null
}

export function datasetRowToDraft(row: DatasetRow): CustomOrderDraft {
  return {
    orderId: row.orderId,
    customerName: `${row.customerType} customer · ${row.userLocation}`,
    productName: `${row.productCategory} item`,
    productCategory: row.productCategory,
    productPrice: String(row.productPrice),
    orderQuantity: String(row.orderQuantity),
    userAge: String(row.userAge),
    userGender: row.userGender,
    userLocation: row.userLocation,
    paymentMethod: row.paymentMethod,
    shippingMethod: row.shippingMethod,
    discountApplied: String(row.discountApplied),
    sellerRating: String(row.sellerRating),
    productRating: String(row.productRating),
    previousReturns: String(row.previousReturns),
    customerType: row.customerType,
    productReviewCount: String(row.productReviewCount),
    orderValue: String(row.orderValue),
  }
}

// Hand-picked real rows from orders_database.csv, shipped inline so the initial
// queue renders instantly without waiting for the ~960KB CSV fetch.
export const seedDatasetRows: DatasetRow[] = [
  { orderId: 'ORD100429', productCategory: 'Clothing', productPrice: 5040.89, orderQuantity: 2, userAge: 57, userGender: 'Male', userLocation: 'City76', paymentMethod: 'PayPal', shippingMethod: 'Next-Day', discountApplied: 46.46, sellerRating: 2.9, productRating: 2.5, previousReturns: 9, customerType: 'New', productReviewCount: 3256, orderValue: 10081.78 },
  { orderId: 'ORD104515', productCategory: 'Clothing', productPrice: 2937.85, orderQuantity: 3, userAge: 68, userGender: 'Male', userLocation: 'City39', paymentMethod: 'Credit Card', shippingMethod: 'Next-Day', discountApplied: 46.72, sellerRating: 3.1, productRating: 2.6, previousReturns: 9, customerType: 'Frequent', productReviewCount: 1211, orderValue: 8813.55 },
  { orderId: 'ORD103618', productCategory: 'Home', productPrice: 13338.13, orderQuantity: 2, userAge: 45, userGender: 'Female', userLocation: 'City88', paymentMethod: 'Debit Card', shippingMethod: 'Express', discountApplied: 28.34, sellerRating: 2.8, productRating: 2.5, previousReturns: 9, customerType: 'Regular', productReviewCount: 1410, orderValue: 26676.26 },
  { orderId: 'ORD104182', productCategory: 'Books', productPrice: 1269.28, orderQuantity: 5, userAge: 27, userGender: 'Male', userLocation: 'City74', paymentMethod: 'Credit Card', shippingMethod: 'Next-Day', discountApplied: 9.05, sellerRating: 4.5, productRating: 3.7, previousReturns: 7, customerType: 'New', productReviewCount: 1053, orderValue: 6346.4 },
  { orderId: 'ORD109183', productCategory: 'Electronics', productPrice: 74473.09, orderQuantity: 4, userAge: 24, userGender: 'Male', userLocation: 'City6', paymentMethod: 'Gift Card', shippingMethod: 'Standard', discountApplied: 10.02, sellerRating: 3.9, productRating: 3.8, previousReturns: 6, customerType: 'New', productReviewCount: 1962, orderValue: 297892.36 },
  { orderId: 'ORD101563', productCategory: 'Home', productPrice: 10535.65, orderQuantity: 3, userAge: 32, userGender: 'Female', userLocation: 'City11', paymentMethod: 'Gift Card', shippingMethod: 'Express', discountApplied: 15.01, sellerRating: 2.9, productRating: 2.8, previousReturns: 1, customerType: 'Frequent', productReviewCount: 1411, orderValue: 31606.95 },
  { orderId: 'ORD103441', productCategory: 'Electronics', productPrice: 110940.28, orderQuantity: 4, userAge: 25, userGender: 'Male', userLocation: 'City11', paymentMethod: 'Debit Card', shippingMethod: 'Next-Day', discountApplied: 8.62, sellerRating: 4.9, productRating: 5.0, previousReturns: 0, customerType: 'Frequent', productReviewCount: 2484, orderValue: 443761.12 },
  { orderId: 'ORD104493', productCategory: 'Books', productPrice: 1157.69, orderQuantity: 4, userAge: 67, userGender: 'Female', userLocation: 'City92', paymentMethod: 'PayPal', shippingMethod: 'Standard', discountApplied: 5.13, sellerRating: 5.0, productRating: 4.9, previousReturns: 0, customerType: 'Regular', productReviewCount: 663, orderValue: 4630.76 },
]

// Scored seed queue — real dataset rows run through the local risk model.
export const seedOrders: Order[] = seedDatasetRows.map((row) => scoreCustomDraft(datasetRowToDraft(row)))
