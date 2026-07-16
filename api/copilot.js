export default async function handler(req, res) {
  // CORS configuration for local development if needed
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { messages } = req.body
    const apiKey = req.body.apiKey || process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY

    if (!apiKey) {
      return res.status(400).json({ error: 'Groq API Key is required. Please set VITE_GROQ_API_KEY or GROQ_API_KEY environment variable.' })
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: messages,
        temperature: 0.6,
        max_tokens: 450,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return res.status(response.status).json({ error: `Groq API Error: ${errorText}` })
    }

    const data = await response.json()
    return res.status(200).json(data)
  } catch (error) {
    console.error('Serverless proxy error:', error)
    return res.status(500).json({ error: error.message || 'Server error' })
  }
}
