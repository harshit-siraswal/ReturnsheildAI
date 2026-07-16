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
  payment: 'COD' | 'UPI' | 'Card'
  region: string
  slaHours: number
}

export const formatINR = (value: number) => {
  if (value >= 100000) return `INR ${(value / 100000).toFixed(2)}L`
  return `INR ${value.toLocaleString('en-IN')}`
}

export const orders: Order[] = [
  {
    id: '#RS-18492',
    customer: 'Aarav Mehta',
    product: 'Pulse air purifier',
    category: 'Home essentials',
    risk: 91,
    lossValue: 7840,
    loss: 'INR 7,840',
    driver: '3 returns in 90 days',
    action: 'Verify by OTP',
    alternatives: ['Restrict COD for this order', 'Hold for analyst review'],
    priority: 'P0',
    status: 'New',
    payment: 'COD',
    region: 'Maharashtra',
    slaHours: 4,
  },
  {
    id: '#RS-18484',
    customer: 'Maya Srinivasan',
    product: 'Arc glass kettle',
    category: 'Kitchen',
    risk: 86,
    lossValue: 4220,
    loss: 'INR 4,220',
    driver: 'Fragile SKU + carrier delay',
    action: 'Quality inspection',
    alternatives: ['Reinforced packaging', 'Prioritize dispatch'],
    priority: 'P0',
    status: 'Assigned',
    payment: 'UPI',
    region: 'Karnataka',
    slaHours: 7,
  },
  {
    id: '#RS-18475',
    customer: 'Rohan Kapoor',
    product: 'Trail runner v2',
    category: 'Footwear',
    risk: 79,
    lossValue: 3990,
    loss: 'INR 3,990',
    driver: 'Size exchange pattern',
    action: 'Offer exchange first',
    alternatives: ['Send size guide message', 'Monitor only'],
    priority: 'P1',
    status: 'New',
    payment: 'Card',
    region: 'Delhi NCR',
    slaHours: 12,
  },
  {
    id: '#RS-18451',
    customer: 'Isha Verma',
    product: 'Cove carry-on case',
    category: 'Travel',
    risk: 72,
    lossValue: 3450,
    loss: 'INR 3,450',
    driver: 'COD + delivery change',
    action: 'Confirm delivery',
    alternatives: ['Escalate to carrier', 'Verify by OTP'],
    priority: 'P1',
    status: 'New',
    payment: 'COD',
    region: 'Maharashtra',
    slaHours: 16,
  },
  {
    id: '#RS-18443',
    customer: 'Devansh Rao',
    product: 'Nimbus desk lamp',
    category: 'Home essentials',
    risk: 68,
    lossValue: 2980,
    loss: 'INR 2,980',
    driver: 'Address changed after order',
    action: 'Confirm delivery',
    alternatives: ['Verify by OTP', 'Monitor only'],
    priority: 'P1',
    status: 'Assigned',
    payment: 'COD',
    region: 'Telangana',
    slaHours: 20,
  },
  {
    id: '#RS-18437',
    customer: 'Ananya Joshi',
    product: 'Slate ceramic set',
    category: 'Kitchen',
    risk: 64,
    lossValue: 2640,
    loss: 'INR 2,640',
    driver: 'Fragile SKU + long haul',
    action: 'Reinforced packaging',
    alternatives: ['Quality inspection', 'Prioritize dispatch'],
    priority: 'P2',
    status: 'New',
    payment: 'UPI',
    region: 'Karnataka',
    slaHours: 26,
  },
  {
    id: '#RS-18426',
    customer: 'Kabir Malhotra',
    product: 'Strato hoodie',
    category: 'Apparel',
    risk: 61,
    lossValue: 1890,
    loss: 'INR 1,890',
    driver: '2 size exchanges in 60 days',
    action: 'Send size guide message',
    alternatives: ['Offer exchange first', 'Monitor only'],
    priority: 'P2',
    status: 'Actioned',
    payment: 'Card',
    region: 'Delhi NCR',
    slaHours: 30,
  },
  {
    id: '#RS-18419',
    customer: 'Sara Iyer',
    product: 'Flux blender pro',
    category: 'Kitchen',
    risk: 58,
    lossValue: 3120,
    loss: 'INR 3,120',
    driver: 'Delivery promise moved 2 days',
    action: 'Escalate to carrier',
    alternatives: ['Confirm delivery', 'Monitor only'],
    priority: 'P2',
    status: 'Outcome pending',
    payment: 'UPI',
    region: 'Tamil Nadu',
    slaHours: 36,
  },
]

export const regions = [
  { rank: '01', name: 'Maharashtra', value: 'INR 3.21L' },
  { rank: '02', name: 'Karnataka', value: 'INR 2.84L' },
  { rank: '03', name: 'Delhi NCR', value: 'INR 2.11L' },
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
    body: '#RS-18492 must be actioned in the next 4 hours to hold dispatch.',
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
    condition: 'High loss + high risk + COD',
    recommendation: 'Require OTP verification or restrict COD for this order.',
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
