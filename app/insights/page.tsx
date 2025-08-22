"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Brain, Lightbulb, TrendingUp, AlertTriangle } from "lucide-react"
import { InsightCard } from "@/components/insights/insight-card"
import { GenerateInsights } from "@/components/insights/generate-insights"
import { ThemeToggle } from "@/components/theme-toggle"

const sampleInsights = [
  {
    id: 1,
    title: "Rice Production Surge in Andhra Pradesh",
    content:
      "Rice production in Andhra Pradesh increased by 15% in 2023 compared to the previous year, primarily due to improved rainfall patterns during the monsoon season. The state received 1,250mm of rainfall, which is 8% above the long-term average, creating optimal conditions for rice cultivation.",
    category: "Production Analysis",
    impact: "high",
    confidence: 92,
    icon: TrendingUp,
  },
  {
    id: 2,
    title: "Maize Yield Correlation with Temperature",
    content:
      "Analysis reveals a strong negative correlation (-0.78) between high temperature variations and maize yields across northern states. Regions experiencing temperature fluctuations above 5°C daily show 12% lower yields compared to areas with stable temperatures.",
    category: "Weather Impact",
    impact: "medium",
    confidence: 87,
    icon: AlertTriangle,
  },
  {
    id: 3,
    title: "Optimal Rainfall Window for Wheat",
    content:
      "Wheat production shows peak performance when annual rainfall is between 1,100-1,400mm. States like Punjab and Haryana, which fall within this range, consistently produce 25% higher yields per hectare compared to regions with excessive or insufficient rainfall.",
    category: "Climate Optimization",
    impact: "high",
    confidence: 94,
    icon: Lightbulb,
  },
  {
    id: 4,
    title: "Sugarcane Drought Resilience Pattern",
    content:
      "Sugarcane demonstrates remarkable drought resilience, maintaining 85% of normal yields even with 20% below-average rainfall. This makes it an ideal crop for climate-adaptive agriculture in water-stressed regions of Maharashtra and Karnataka.",
    category: "Sustainability",
    impact: "medium",
    confidence: 89,
    icon: Brain,
  },
]

export default function InsightsPage() {
  const [insights, setInsights] = useState(sampleInsights)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleNewInsight = (newInsight: any) => {
    setInsights((prev) => [newInsight, ...prev])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <h1 className="text-2xl font-serif font-bold">AI Insights</h1>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Brain className="h-3 w-3 mr-1" />
                Powered by Gemini AI
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Overview */}
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold mb-4">Agricultural Intelligence</h2>
          <p className="text-lg text-muted-foreground mb-6">
            AI-generated insights from crop production and weather data analysis
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{insights.length}</div>
                <p className="text-xs text-muted-foreground">generated this session</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">
                  {Math.round(insights.reduce((acc, insight) => acc + insight.confidence, 0) / insights.length)}%
                </div>
                <p className="text-xs text-muted-foreground">AI confidence score</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">High Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">
                  {insights.filter((i) => i.impact === "high").length}
                </div>
                <p className="text-xs text-muted-foreground">actionable insights</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Generate New Insights */}
        <GenerateInsights onNewInsight={handleNewInsight} />

        {/* Insights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </main>
    </div>
  )
}
