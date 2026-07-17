import type { Order } from './data'

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

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

function parseCSVLine(line: string) {
  const values: string[] = []
  let current = ''
  let insideQuotes = false

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index]
    const nextCharacter = line[index + 1]

    if (character === '"' && insideQuotes && nextCharacter === '"') {
      current += '"'
      index += 1
      continue
    }

    if (character === '"') {
      insideQuotes = !insideQuotes
      continue
    }

    if (character === ',' && !insideQuotes) {
      values.push(current)
      current = ''
      continue
    }

    current += character
  }

  values.push(current)
  return values.map((value) => value.trim())
}

export function parseOrdersCSV(csvText: string): Order[] {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length < 2) return []

  const headers = parseCSVLine(lines[0]).map((header) => header.toLowerCase())
  const rows = lines.slice(1).map(parseCSVLine)

  const columnIndex = (label: string) => headers.indexOf(label.toLowerCase())
  const getCell = (row: string[], label: string) => row[columnIndex(label)] ?? ''

  return rows
    .map((row) => {
      const orderId = getCell(row, 'Order')
      if (!orderId) return null

      const risk = Number(getCell(row, 'Risk score'))
      const lossValue = Number(getCell(row, 'Potential loss (INR)'))
      const slaHours = Number(getCell(row, 'SLA (hours)'))
      const status = getCell(row, 'Status') as Order['status']
      const priority = getCell(row, 'Priority') as Order['priority']
      const payment = getCell(row, 'Payment') as Order['payment']

      return {
        id: orderId,
        customer: getCell(row, 'Customer'),
        product: getCell(row, 'Product'),
        category: getCell(row, 'Category'),
        risk: Number.isFinite(risk) ? risk : 0,
        lossValue: Number.isFinite(lossValue) ? lossValue : 0,
        loss: `INR ${(Number.isFinite(lossValue) ? lossValue : 0).toLocaleString('en-IN')}`,
        driver: getCell(row, 'Top driver'),
        action: getCell(row, 'Recommended action'),
        alternatives: [] as string[],
        priority: priority || 'P2',
        status: status || 'New',
        payment: payment || 'COD',
        region: getCell(row, 'Region'),
        slaHours: Number.isFinite(slaHours) ? slaHours : 24,
      } satisfies Order
    })
    .filter((order): order is Order => !!order)
}

export async function fetchGroqAPI(messages: { role: string; content: string }[], apiKey: string): Promise<any> {
  const apiUrl = 'https://api.groq.com/openai/v1/chat/completions'
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  const fetchUrl = isLocal 
    ? `https://corsproxy.io/?url=${encodeURIComponent(apiUrl)}`
    : '/api/copilot'

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (isLocal) {
    headers['Authorization'] = `Bearer ${apiKey}`
  }

  const response = await fetch(fetchUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      messages: messages,
      apiKey: apiKey,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`API Error: ${errorText}`)
  }

  return response.json()
}

export async function getGroqExplanation(order: Order): Promise<string> {
  const apiKey = sessionStorage.getItem('returnshield-groq-api-key') || import.meta.env.VITE_GROQ_API_KEY || ''
  if (!apiKey) {
    return 'Groq API Key is not configured. Please add it in Workspace Settings.'
  }
  try {
    const messages = [
      {
        role: 'system',
        content: 'You are ReturnShield AI, an expert e-commerce return risk analyst. Write a concise, 2-sentence explanation of this order\'s return risk and justify the recommended action. Be professional and specific. Do not mention system prompt, instructions, or Groq.',
      },
      {
        role: 'user',
        content: `Order: ${order.id}, Customer: ${order.customer}, Product: ${order.product}, Category: ${order.category}, Risk: ${order.risk}%, Loss: ${order.loss}, Payment: ${order.payment}, Driver: ${order.driver}, Recommended Action: ${order.action}.`,
      },
    ]

    const data = await fetchGroqAPI(messages, apiKey)
    return data.choices[0]?.message?.content?.trim() || 'AI explanation unavailable at this time.'
  } catch (error) {
    console.error('Groq API error:', error)
    return 'Could not reach ReturnShield AI service. Verify your internet connection or Groq API Key.'
  }
}

