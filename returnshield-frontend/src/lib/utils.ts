import type { Order } from './data'

export function chartPoints(values: number[], width = 672, height = 188) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const innerRight = width - 16
  return values
    .map((value, index) => {
      const x = 16 + (index * (innerRight - 16)) / (values.length - 1)
      const y = height - 30 - ((value - min) / range) * (height - 76)
      return `${x},${y}`
    })
    .join(' ')
}

export function downloadOrdersCSV(orders: Order[], filenameLabel: string) {
  const header = ['Order', 'Customer', 'Product', 'Category', 'Risk score', 'Potential loss (INR)', 'Top driver', 'Recommended action', 'Priority', 'Status', 'Payment', 'Region', 'SLA (hours)']
  const rows = orders.map((o) => [
    o.id,
    o.customer,
    o.product,
    o.category,
    String(o.risk),
    String(o.lossValue),
    o.driver,
    o.action,
    o.priority,
    o.status,
    o.payment,
    o.region,
    String(o.slaHours),
  ])
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(','))
    .join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `returnshield-${filenameLabel.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}.csv`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
