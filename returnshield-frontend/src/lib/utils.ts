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

