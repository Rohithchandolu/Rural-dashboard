import { type NextRequest, NextResponse } from "next/server"
import { TrendingUp, AlertTriangle, Lightbulb, BarChart3 } from "lucide-react"

// Mock Gemini API response for demonstration
// In production, replace with actual Gemini API call
async function generateInsightWithGemini(topic: string) {
  // This would be replaced with actual Gemini API call
  // const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     contents: [{
  //       parts: [{
  //         text: `Generate an agricultural insight about ${topic} based on crop production and weather data...`
  //       }]
  //     }]
  //   })
  // })

  // Mock responses for different topics
  const mockInsights = {
    "crop-yield": {
      title: "Wheat Yield Optimization Through Precision Timing",
      content:
        "Analysis of 5-year data reveals that wheat sowing between October 15-30 results in 18% higher yields compared to early or late sowing. This optimal window aligns with temperature patterns that favor germination while avoiding frost damage during grain filling stages.",
      category: "Yield Optimization",
      impact: "high" as const,
      confidence: 91,
      icon: TrendingUp,
    },
    "weather-impact": {
      title: "Monsoon Delay Impact on Kharif Crops",
      content:
        "A 2-week delay in monsoon onset reduces kharif crop yields by an average of 8-12%. Rice is most affected with 15% yield reduction, while cotton shows better resilience with only 6% impact. Early warning systems can help farmers adapt planting schedules.",
      category: "Weather Analysis",
      impact: "high" as const,
      confidence: 88,
      icon: AlertTriangle,
    },
    "regional-comparison": {
      title: "Northern vs Southern Rice Production Efficiency",
      content:
        "Northern states achieve 15% higher rice productivity per unit water compared to southern regions, primarily due to cooler temperatures reducing evapotranspiration. However, southern states show better pest resistance and longer growing seasons.",
      category: "Regional Analysis",
      impact: "medium" as const,
      confidence: 85,
      icon: BarChart3,
    },
    "seasonal-trends": {
      title: "Shifting Harvest Patterns Due to Climate Change",
      content:
        "Harvest seasons have shifted 7-10 days earlier over the past decade across most crops. This trend is most pronounced in wheat (12 days earlier) and least in rice (5 days earlier), indicating varying climate sensitivity among crops.",
      category: "Climate Trends",
      impact: "medium" as const,
      confidence: 93,
      icon: TrendingUp,
    },
    "climate-adaptation": {
      title: "Drought-Resistant Crop Varieties Performance",
      content:
        "New drought-resistant varieties show 25% better performance in water-stressed conditions while maintaining 95% of normal yields in optimal conditions. Adoption rates are highest in Maharashtra (45%) and lowest in Punjab (12%).",
      category: "Adaptation Strategy",
      impact: "high" as const,
      confidence: 89,
      icon: Lightbulb,
    },
  }

  const insight = mockInsights[topic as keyof typeof mockInsights] || mockInsights["crop-yield"]

  return {
    id: Date.now(),
    ...insight,
  }
}

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json()

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 })
    }

    // Check for API key (in production)
    // if (!process.env.GEMINI_API_KEY) {
    //   return NextResponse.json(
    //     { error: "Gemini API key not configured" },
    //     { status: 500 }
    //   )
    // }

    const insight = await generateInsightWithGemini(topic)

    return NextResponse.json({ insight })
  } catch (error) {
    console.error("Error generating insight:", error)
    return NextResponse.json({ error: "Failed to generate insight" }, { status: 500 })
  }
}
