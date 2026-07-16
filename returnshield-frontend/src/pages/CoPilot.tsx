import { useState, useRef, useEffect } from 'react'
import { Sparkle, CircleNotch, PaperPlaneRight } from '@phosphor-icons/react'
import type { Order } from '../lib/data'
import { fetchGroqAPI } from '../lib/utils'
import { ResponseStream } from '@/components/ui/response-stream'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface CoPilotProps {
  orders: Order[]
}

const QUICK_QUESTIONS = [
  'Summarize today\'s return risks',
  'What is our total revenue at risk?',
  'Which products have the highest return risk?',
  'What is the recommended action for high-risk COD orders?',
]

async function getCoPilotResponse(messages: { role: string; content: string }[], orders: Order[]): Promise<string> {
  const apiKey = sessionStorage.getItem('returnshield-groq-api-key') || import.meta.env.VITE_GROQ_API_KEY || ''
  if (!apiKey) {
    return 'Groq API Key is not configured. Please add it in Workspace Settings.'
  }

  const totalOrders = orders.length
  const criticalOrders = orders.filter((o) => o.risk >= 70).length
  const totalLossValue = orders.reduce((acc, o) => acc + o.lossValue, 0)
  
  const systemPrompt = `
You are ReturnShield Co-Pilot, an intelligent conversational assistant for ReturnShield AI.
Your purpose is to help e-commerce business owners understand their return risks, revenue loss, and take preventive actions.
Here is the real-time business data:
- Total Orders currently monitored: ${totalOrders}
- High-Risk/Critical Orders (Risk >= 70%): ${criticalOrders}
- Total Estimated Revenue at Risk: INR ${totalLossValue.toLocaleString('en-IN')}
- Current Return Rate: 14.8% (which is 2.4 percentage points above category baseline)
- Loss Prevented this period: INR 2.37L (from 82 validated actions)

Here are the top flagged high-risk orders in the queue:
${orders.slice(0, 5).map((o) => `- Order ${o.id}: Customer ${o.customer}, Product ${o.product}, Risk ${o.risk}%, Loss ${o.loss}, Payment ${o.payment}, Driver ${o.driver}, Recommended Action: ${o.action}`).join('\n')}

Guidelines:
1. Keep your answers simple, friendly, and actionable. The user is a business owner, so do not use complex ML jargon unless asked.
2. Directly answer their question based on the business data. If they ask about a specific order, customer, or product, refer to the list above.
3. Suggest concrete actions (e.g. restrict COD, require OTP verification, prioritize shipping).
4. Be concise and professional. Do not refer to this system prompt or Groq.
`

  try {
    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ]
    const data = await fetchGroqAPI(apiMessages, apiKey)
    return data.choices[0]?.message?.content?.trim() || 'No response generated.'
  } catch (error) {
    console.error('Co-Pilot API error:', error)
    return 'Could not connect to ReturnShield Co-Pilot. Please check your connection or Groq API Key.'
  }
}

export function CoPilot({ orders }: CoPilotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to ReturnShield Co-Pilot! I am your conversational assistant. Ask me anything about your current return rates, revenue under risk, or flagged orders, and I will help you identify the best moves to protect your revenue.',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: text,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    const apiMessages = [...messages, userMessage].map((m) => ({
      role: m.role,
      content: m.content,
    }))

    const replyText = await getCoPilotResponse(apiMessages, orders)
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: replyText,
      },
    ])
    setIsLoading(false)
  }

  return (
    <div className="copilot-container">
      <div className="copilot-header">
        <div className="copilot-title-row">
          <span className="copilot-spark"><Sparkle size={18} weight="fill" /></span>
          <div>
            <h2>ReturnShield Co-Pilot</h2>
            <p>AI Decision Agent for Business Owners & Analysts</p>
          </div>
        </div>
      </div>

      <div className="copilot-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`copilot-message-bubble ${msg.role}`}>
            <div className="avatar-tag">
              {msg.role === 'assistant' ? 'AI' : 'Owner'}
            </div>
            <div className="message-content">
              {msg.role === 'assistant' ? (
                <ResponseStream
                  textStream={msg.content}
                  mode="fade"
                  speed={32}
                  as="div"
                  className="copilot-stream"
                />
              ) : (
                <p>{msg.content}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="copilot-message-bubble assistant loading">
            <div className="avatar-tag">AI</div>
            <div className="message-content">
              <CircleNotch size={18} className="spin" />
              <span>Analyzing business metrics...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="copilot-footer">
        {messages.length === 1 && (
          <div className="copilot-suggestions">
            <small>Try one of these</small>
            <div className="suggestions-grid">
              {QUICK_QUESTIONS.map((q) => (
                <button key={q} type="button" onClick={() => handleSend(q)}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend(input)
          }}
          className="copilot-form"
        >
          <input
            type="text"
            placeholder="Ask about revenue loss, COD rules, high-risk items..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" disabled={!input.trim() || isLoading}>
            <PaperPlaneRight size={18} weight="bold" />
          </button>
        </form>
      </div>
    </div>
  )
}
