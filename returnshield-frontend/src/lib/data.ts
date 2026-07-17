// ReturnShield AI — shared demo dataset.
// All values are INR-first per the PRD (Indian e-commerce operations).

export type Priority = 'P0' | 'P1' | 'P2'
export type OrderStatus = 'New' | 'Assigned' | 'Actioned' | 'Outcome pending' | 'Resolved'

export type Order = {
  id: string
  customer: string
  product: string
  category: string
  risk: number
  lossValue: number
  loss: string
  driver: string
  action: string
  alternatives: string[]
  priority: Priority
  status: OrderStatus
  payment: 'Credit Card' | 'Debit Card' | 'Gift Card' | 'PayPal'
  region: string
  slaHours: number
}

export const formatINR = (value: number) => {
  if (value >= 100000) return `INR ${(value / 100000).toFixed(2)}L`
  return `INR ${value.toLocaleString('en-IN')}`
}

// The risk-queue seed orders now come from real rows in orders_database.csv —
// see `seedOrders` in ./dataset.ts (scored by the local model at load time).

export const regions = [
  { rank: '01', name: 'City11', value: 'INR 3.21L' },
  { rank: '02', name: 'City6', value: 'INR 2.84L' },
  { rank: '03', name: 'City88', value: 'INR 2.11L' },
]

export type DateRange = {
  label: string
  atRisk: string
  atRiskDelta: string
  critical: string
  criticalDelta: string
  returnRate: string
  returnDelta: string
  prevented: string
  preventedDelta: string
  trend: number[]
}

export const dateRanges: DateRange[] = [
  {
    label: '1 - 30 July 2026',
    atRisk: 'INR 12.84L',
    atRiskDelta: '12.6%',
    critical: '93',
    criticalDelta: '18 today',
    returnRate: '14.8%',
    returnDelta: '2.4 pts',
    prevented: 'INR 2.37L',
    preventedDelta: '82 actions',
    trend: [39, 35, 42, 37, 48, 54, 45, 61, 57, 70, 67, 81],
  },
  {
    label: '1 - 30 June 2026',
    atRisk: 'INR 11.41L',
    atRiskDelta: '8.9%',
    critical: '78',
    criticalDelta: '11 daily avg',
    returnRate: '14.1%',
    returnDelta: '1.7 pts',
    prevented: 'INR 2.02L',
    preventedDelta: '71 actions',
    trend: [44, 39, 41, 46, 43, 52, 49, 55, 58, 54, 63, 66],
  },
  {
    label: 'Last 90 days',
    atRisk: 'INR 34.62L',
    atRiskDelta: '10.2%',
    critical: '241',
    criticalDelta: '81 monthly avg',
    returnRate: '14.4%',
    returnDelta: '2.0 pts',
    prevented: 'INR 6.11L',
    preventedDelta: '226 actions',
    trend: [31, 36, 34, 41, 39, 47, 52, 49, 58, 63, 69, 78],
  },
  {
    label: 'Year to date',
    atRisk: 'INR 71.08L',
    atRiskDelta: '6.4%',
    critical: '512',
    criticalDelta: '73 monthly avg',
    returnRate: '13.9%',
    returnDelta: '1.2 pts',
    prevented: 'INR 13.4L',
    preventedDelta: '478 actions',
    trend: [28, 31, 35, 33, 40, 44, 42, 51, 55, 61, 68, 74],
  },
]

export const trendWindows: Record<string, number[]> = {
  'Last 12 weeks': [39, 35, 42, 37, 48, 54, 45, 61, 57, 70, 67, 81],
  'Last 6 weeks': [48, 45, 61, 57, 70, 81],
  'Last 4 quarters': [52, 61, 58, 81],
}

export type Notification = {
  id: number
  title: string
  body: string
  time: string
  unread: boolean
}

export const initialNotifications: Notification[] = [
  {
    id: 1,
    title: 'P0 cutoff approaching',
    body: 'ORD100429 must be actioned in the next 4 hours to hold dispatch.',
    time: '8 min ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Model v2.4 recalibrated',
    body: 'Footwear cohort calibration drift resolved. Scores refreshed.',
    time: '1 h ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Policy outcome confirmed',
    body: 'OTP verification prevented INR 21,300 of loss this week.',
    time: '3 h ago',
    unread: false,
  },
]

export type Policy = {
  id: string
  condition: string
  recommendation: string
  guardrail: string
  owner: string
  enabled: boolean
  adoption: string
  prevented: string
}

export const initialPolicies: Policy[] = [
  {
    id: 'PL-01',
    condition: 'High loss + high risk + Gift Card',
    recommendation: 'Verify payment method or hold for analyst review.',
    guardrail: 'Only when merchant policy permits.',
    owner: 'Operations',
    enabled: true,
    adoption: '87%',
    prevented: 'INR 1.12L',
  },
  {
    id: 'PL-02',
    condition: 'High risk + exchangeable SKU',
    recommendation: 'Offer exchange-first flow instead of refund.',
    guardrail: 'Never suppress statutory rights.',
    owner: 'CX',
    enabled: true,
    adoption: '74%',
    prevented: 'INR 64,800',
  },
  {
    id: 'PL-03',
    condition: 'Fragile product + damage signal',
    recommendation: 'Manual quality inspection and reinforced packaging.',
    guardrail: 'Save packing evidence.',
    owner: 'Warehouse',
    enabled: true,
    adoption: '91%',
    prevented: 'INR 38,400',
  },
  {
    id: 'PL-04',
    condition: 'High delivery-delay contribution',
    recommendation: 'Prioritize dispatch or escalate delivery.',
    guardrail: 'Log carrier action and ETA.',
    owner: 'Logistics',
    enabled: false,
    adoption: '52%',
    prevented: 'INR 22,100',
  },
  {
    id: 'PL-05',
    condition: 'Repeat-return pattern + low value',
    recommendation: 'Monitor or use low-friction verification.',
    guardrail: 'Avoid punitive treatment; analyst review when escalated.',
    owner: 'Risk analysts',
    enabled: true,
    adoption: '68%',
    prevented: 'INR 18,900',
  },
]

export const DEMO_EMAIL = 'analyst@northstar.in'
export const DEMO_PASSWORD = 'returnshield'
