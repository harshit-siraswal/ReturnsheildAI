import { formatINR, type Order, type OrderStatus, type Priority } from './data'

const STORAGE_KEY = 'returnshield-orders-store-v1'

export type CustomOrderDraft = {
  orderId: string
  customerName: string
  productName: string
  productCategory: string
  productPrice: string
  orderQuantity: string
  userAge: string
  userGender: string
  userLocation: string
  paymentMethod: 'COD' | 'UPI' | 'Card'
  shippingMethod: 'Express' | 'Standard' | 'Economy'
  discountApplied: string
  sellerRating: string
  productRating: string
  previousReturns: string
  customerType: 'New' | 'Returning'
  productReviewCount: string
  orderValue: string
}

const DEFAULT_DRAFT: CustomOrderDraft = {
  orderId: '',
  customerName: '',
  productName: '',
  productCategory: 'Electronics',
  productPrice: '',
  orderQuantity: '1',
  userAge: '',
  userGender: 'Male',
  userLocation: '',
  paymentMethod: 'COD',
  shippingMethod: 'Express',
  discountApplied: '0',
  sellerRating: '4.1',
  productRating: '4.0',
  previousReturns: '0',
  customerType: 'New',
  productReviewCount: '25',
  orderValue: '',
}

export function createBlankDraft(): CustomOrderDraft {
  return { ...DEFAULT_DRAFT }
}

export function draftFromOrder(order: Order): CustomOrderDraft {
  return {
    orderId: order.id,
    customerName: order.customer,
    productName: order.product,
    productCategory: order.category,
    productPrice: String(order.lossValue || 0),
    orderQuantity: '1',
    userAge: '',
    userGender: 'Male',
    userLocation: order.region,
    paymentMethod: order.payment,
    shippingMethod: order.slaHours <= 8 ? 'Express' : order.slaHours <= 18 ? 'Standard' : 'Economy',
    discountApplied: '',
    sellerRating: '4.0',
    productRating: String(Math.max(1, Math.min(5, 5 - Math.round(order.risk / 25) * 0.4)).toFixed(1)),
    previousReturns: String(Math.max(0, Math.round(order.risk / 15))),
    customerType: 'Returning',
    productReviewCount: '25',
    orderValue: String(order.lossValue || 0),
  }
}

function parseNumber(value: string, fallback = 0) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function buildOrderId(draft: CustomOrderDraft) {
  const suffix = (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`).replaceAll('-', '')
  const seed = draft.productCategory.slice(0, 3).toUpperCase() || 'CUS'
  return `#RS-${seed}${suffix.slice(-5).toUpperCase()}`
}

function chooseAction(risk: number, paymentMethod: CustomOrderDraft['paymentMethod'], sellerRating: number, productRating: number, shippingMethod: CustomOrderDraft['shippingMethod'], discountApplied: number) {
  if (risk >= 88 && paymentMethod === 'COD') return 'Require OTP verification'
  if (risk >= 84 && sellerRating < 3.2) return 'Manual review before dispatch'
  if (risk >= 76 && productRating < 3.4) return 'Confirm exchange policy'
  if (shippingMethod === 'Standard' && discountApplied >= 30) return 'Reconfirm delivery details'
  if (risk >= 70) return 'Hold for analyst review'
  return 'Monitor only'
}

function chooseAlternatives(risk: number, paymentMethod: CustomOrderDraft['paymentMethod'], shippingMethod: CustomOrderDraft['shippingMethod']) {
  const alternatives = [] as string[]
  if (paymentMethod === 'COD') alternatives.push('Restrict COD for this order')
  alternatives.push(risk >= 80 ? 'Hold for analyst review' : 'Require customer confirmation')
  alternatives.push(shippingMethod === 'Express' ? 'Verify delivery slot' : 'Offer exchange-first flow')
  return alternatives.slice(0, 3)
}

function determineDriver(
  paymentMethod: CustomOrderDraft['paymentMethod'],
  discountApplied: number,
  sellerRating: number,
  productRating: number,
  previousReturns: number,
  reviewCount: number,
  orderQuantity: number,
  orderValue: number,
  shippingMethod: CustomOrderDraft['shippingMethod'],
) {
  const factors = [
    { label: 'Repeated return history', score: previousReturns * 3.2 },
    { label: paymentMethod === 'COD' ? 'Cash on Delivery' : `${paymentMethod} payment pattern`, score: paymentMethod === 'COD' ? 14 : 6 },
    { label: discountApplied >= 30 ? 'Heavy discount signal' : 'Low discount risk', score: discountApplied >= 30 ? discountApplied / 2.3 : 2 },
    { label: productRating < 3.4 ? 'Low product rating' : 'Product rating is healthy', score: productRating < 3.4 ? (3.4 - productRating) * 12 : 3 },
    { label: sellerRating < 3.6 ? 'Seller rating below average' : 'Seller performance stable', score: sellerRating < 3.6 ? (3.6 - sellerRating) * 11 : 2 },
    { label: reviewCount < 20 ? 'Limited review volume' : 'Healthy review volume', score: reviewCount < 20 ? 8 : 2 },
    { label: orderQuantity > 1 ? 'Multi-item basket' : 'Single-item order', score: orderQuantity > 1 ? 5 : 2 },
    { label: orderValue > 50000 ? 'High-value cart' : 'Value is manageable', score: orderValue > 50000 ? 7 : 2 },
    { label: shippingMethod === 'Standard' ? 'Standard shipping window' : 'Expedited shipping window', score: shippingMethod === 'Standard' ? 9 : 2 },
  ]

  return factors.sort((a, b) => b.score - a.score)[0]
}

export function scoreCustomDraft(draft: CustomOrderDraft): Order {
  const productPrice = clamp(parseNumber(draft.productPrice), 0, Number.POSITIVE_INFINITY)
  const orderQuantity = Math.max(1, Math.round(parseNumber(draft.orderQuantity, 1)))
  const orderValue = Math.max(
    clamp(parseNumber(draft.orderValue), 0, Number.POSITIVE_INFINITY),
    productPrice * orderQuantity,
  )
  const discountApplied = clamp(parseNumber(draft.discountApplied), 0, 100)
  const sellerRating = clamp(parseNumber(draft.sellerRating, 4), 0, 5)
  const productRating = clamp(parseNumber(draft.productRating, 4), 0, 5)
  const previousReturns = Math.max(0, Math.round(parseNumber(draft.previousReturns)))
  const reviewCount = Math.max(0, Math.round(parseNumber(draft.productReviewCount, 25)))
  const userAge = Math.max(0, Math.round(parseNumber(draft.userAge)))

  let risk = 14
  risk += draft.paymentMethod === 'COD' ? 14 : draft.paymentMethod === 'UPI' ? 5 : 9
  risk += draft.shippingMethod === 'Standard' ? 10 : draft.shippingMethod === 'Economy' ? 13 : 4
  risk += draft.customerType === 'Returning' ? 8 : 5
  risk += discountApplied >= 35 ? Math.round(discountApplied / 3) : Math.round(discountApplied / 5)
  risk += previousReturns * 4
  risk += (5 - productRating) * 8
  risk += (5 - sellerRating) * 6
  risk += reviewCount < 20 ? 7 : reviewCount < 60 ? 3 : 0
  risk += orderValue > 50000 ? 7 : orderValue > 15000 ? 4 : 0
  risk += orderQuantity > 1 ? 3 : 0
  risk += userAge > 0 && userAge < 21 ? 3 : 0
  risk = Math.round(clamp(risk, 6, 97))

  const priority: Priority = risk >= 85 ? 'P0' : risk >= 70 ? 'P1' : 'P2'
  const status: OrderStatus = risk >= 85 ? 'New' : risk >= 70 ? 'Assigned' : 'New'
  const topDriver = determineDriver(
    draft.paymentMethod,
    discountApplied,
    sellerRating,
    productRating,
    previousReturns,
    reviewCount,
    orderQuantity,
    orderValue,
    draft.shippingMethod,
  )
  const action = chooseAction(risk, draft.paymentMethod, sellerRating, productRating, draft.shippingMethod, discountApplied)
  const alternatives = chooseAlternatives(risk, draft.paymentMethod, draft.shippingMethod)
  const estimatedLoss = Math.round(orderValue * (risk / 100) * 0.42)
  const customer = draft.customerName.trim() || `${draft.customerType} customer`

  return {
    id: draft.orderId.trim() || buildOrderId(draft),
    customer,
    product: draft.productName.trim() || draft.productCategory,
    category: draft.productCategory,
    risk,
    lossValue: estimatedLoss,
    loss: formatINR(estimatedLoss),
    driver: topDriver.label,
    action,
    alternatives,
    priority,
    status,
    payment: draft.paymentMethod,
    region: draft.userLocation.trim() || 'Custom location',
    slaHours: draft.shippingMethod === 'Express' ? 8 : draft.shippingMethod === 'Standard' ? 18 : 28,
  }
}

export function loadStoredOrders(seedOrders: Order[]) {
  if (typeof window === 'undefined') return seedOrders

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedOrders
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return seedOrders

    return parsed
      .map((item) => ({
        ...item,
        risk: Number(item.risk),
        lossValue: Number(item.lossValue),
        slaHours: Number(item.slaHours),
      }))
      .filter((item): item is Order => typeof item?.id === 'string' && typeof item?.customer === 'string' && typeof item?.product === 'string')
  } catch {
    return seedOrders
  }
}

export function saveOrdersToStorage(orders: Order[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

export function clearStoredOrders() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
