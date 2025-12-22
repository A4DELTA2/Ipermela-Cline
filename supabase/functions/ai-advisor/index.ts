import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from "../_shared/cors.ts"

interface RequestBody {
  action: 'advice'
  productContext: {
    id: number
    name: string
    price: number
    category: string
    colors?: Array<{ name: string; code: string }>
    storage?: string[]
    configurations?: any
    currentConfig?: any
  }
  userQuery: string
}

interface GroqResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
const MODEL = "llama-3.3-70b-versatile" // Latest Llama 3.3 model

const systemPrompt = `Sei un esperto di prodotti Apple che lavora per "Ipermela", un negozio specializzato in prodotti Apple. Il tuo compito è fornire consigli professionali, accurati e personalizzati sui prodotti Apple.

Linee guida:
- Rispondi sempre in italiano
- Sii conciso ma esaustivo (max 3-4 frasi)
- Menziona caratteristiche specifiche del prodotto quando rilevante
- Suggerisci configurazioni ottimali in base all'uso previsto
- Confronta con altri modelli solo se pertinente
- Mantieni un tono professionale ma amichevole`

function buildProductContextString(productContext: RequestBody['productContext']): string {
  let context = `${productContext.name} - €${productContext.price}`

  if (productContext.category) {
    context += ` (${productContext.category})`
  }

  if (productContext.colors && productContext.colors.length > 0) {
    context += `\nColori disponibili: ${productContext.colors.map(c => c.name).join(', ')}`
  }

  if (productContext.storage && productContext.storage.length > 0) {
    context += `\nArchiviazione: ${productContext.storage.join(', ')}`
  }

  if (productContext.currentConfig) {
    context += `\nConfigurazione attuale:`
    if (productContext.currentConfig.chip) context += ` ${productContext.currentConfig.chip}`
    if (productContext.currentConfig.ram) context += `, ${productContext.currentConfig.ram} RAM`
    if (productContext.currentConfig.storage) context += `, ${productContext.currentConfig.storage} storage`
    if (productContext.currentConfig.color) context += `, colore ${productContext.currentConfig.color}`
  }

  return context
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders,
      status: 200
    })
  }

  try {
    // Parse request body
    const { action, productContext, userQuery } = await req.json() as RequestBody

    // Validate request
    if (action !== 'advice') {
      throw new Error('Invalid action. Expected "advice"')
    }

    if (!productContext || !productContext.name) {
      throw new Error('Missing product context')
    }

    // Get Groq API key
    const groqKey = Deno.env.get('GROQ_API_KEY')
    if (!groqKey) {
      throw new Error('GROQ_API_KEY not configured')
    }

    // Build context string
    const contextStr = buildProductContextString(productContext)

    console.log('[AI Advisor] Processing request for:', productContext.name)

    // Call Groq API
    const groqResponse = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Prodotto: ${contextStr}\n\nDomanda: ${userQuery}` }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    })

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text()
      console.error('[AI Advisor] Groq API error status:', groqResponse.status)
      console.error('[AI Advisor] Groq API error body:', errorText)
      console.error('[AI Advisor] Request was:', {
        model: MODEL,
        systemPrompt: systemPrompt.substring(0, 50) + '...',
        contextPreview: contextStr.substring(0, 100)
      })

      // Handle specific error cases
      if (groqResponse.status === 429) {
        throw new Error('Rate limit raggiunto. Riprova tra qualche secondo.')
      }
      if (groqResponse.status === 401) {
        throw new Error('API key non valida. Verifica la configurazione.')
      }

      throw new Error(`Groq API error: ${groqResponse.status} - ${errorText}`)
    }

    const data = await groqResponse.json() as GroqResponse
    const advice = data.choices[0]?.message?.content

    if (!advice) {
      throw new Error('No advice generated')
    }

    console.log('[AI Advisor] Successfully generated advice')

    // Return successful response
    return new Response(
      JSON.stringify({ advice }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 200
      }
    )

  } catch (error) {
    console.error('[AI Advisor] Error:', error)

    return new Response(
      JSON.stringify({
        error: error.message || 'Internal server error'
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 500
      }
    )
  }
})
