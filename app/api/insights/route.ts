import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { TrendingUp, AlertTriangle, Lightbulb, BarChart3 } from "lucide-react"

const fallbackInsights = {
  "crop-yield": { title: "Wheat Yield Optimization Through Precision Timing", content: "Wheat sown during the optimal seasonal window can improve germination and reduce frost exposure during grain filling.", category: "Yield Optimization", impact: "high" as const, confidence: 82 },
  "weather-impact": { title: "Weather Variability Is Increasing Planting Risk", content: "Monitoring rainfall timing and temperature extremes helps farmers adjust planting dates and protect kharif crop yields.", category: "Weather Analysis", impact: "high" as const, confidence: 80 },
  "regional-comparison": { title: "Regional Conditions Drive Production Efficiency", content: "Differences in water availability, temperature, and soil conditions explain much of the variation in regional crop productivity.", category: "Regional Analysis", impact: "medium" as const, confidence: 78 },
  "seasonal-trends": { title: "Harvest Timing Is Shifting Across Regions", content: "Recent seasonal changes make timely weather monitoring increasingly important for harvest planning and crop protection.", category: "Climate Trends", impact: "medium" as const, confidence: 79 },
  "climate-adaptation": { title: "Resilient Varieties Reduce Water-Stress Risk", content: "Drought-tolerant varieties can protect yields during water stress when paired with appropriate soil and irrigation management.", category: "Adaptation Strategy", impact: "high" as const, confidence: 81 },
} as const

type Topic = keyof typeof fallbackInsights

async function generateInsight(topic: Topic) {
  const fallback = fallbackInsights[topic]
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY
  if (!apiKey) return fallback

  const { text } = await generateText({
    model: google("gemini-2.0-flash"),
    temperature: 0.2,
    prompt: `Create one evidence-aware agricultural insight for the topic "${topic}". Return only valid JSON with title, content, category, impact (high, medium, or low), and confidence (0-100). Do not invent a specific dataset or cite unsupported statistics.`,
  })

  const parsed = JSON.parse(text.replace(/^```json\s*|\s*```$/g, "").trim())
  const impact = ["high", "medium", "low"].includes(parsed.impact) ? parsed.impact : fallback.impact
  return {
    title: String(parsed.title || fallback.title),
    content: String(parsed.content || fallback.content),
    category: String(parsed.category || fallback.category),
    impact,
    confidence: Math.max(0, Math.min(100, Number(parsed.confidence) || fallback.confidence)),
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const topic = body?.topic as Topic
    if (!topic || !(topic in fallbackInsights)) {
      return NextResponse.json({ error: "A valid topic is required" }, { status: 400 })
    }

    const fallback = fallbackInsights[topic]
    let insight
    try {
      insight = await generateInsight(topic)
    } catch (error) {
      console.error("[v0] Insight generation failed; using fallback:", error)
      insight = fallback
    }

    const icons = { high: AlertTriangle, medium: BarChart3, low: Lightbulb }
    return NextResponse.json({ insight: { id: Date.now(), ...insight, icon: icons[insight.impact] || TrendingUp } })
  } catch (error) {
    console.error("[v0] Error generating insight:", error)
    return NextResponse.json({ error: "Failed to generate insight" }, { status: 500 })
  }
}
