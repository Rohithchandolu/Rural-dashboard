"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Loader2, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface GenerateInsightsProps {
  onNewInsight: (insight: any) => void
}

export function GenerateInsights({ onNewInsight }: GenerateInsightsProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState("")
  const { toast } = useToast()

  const topics = [
    { value: "crop-yield", label: "Crop Yield Analysis" },
    { value: "weather-impact", label: "Weather Impact Assessment" },
    { value: "regional-comparison", label: "Regional Comparison" },
    { value: "seasonal-trends", label: "Seasonal Trends" },
    { value: "climate-adaptation", label: "Climate Adaptation" },
  ]

  const generateInsight = async () => {
    if (!selectedTopic) {
      toast({
        title: "Please select a topic",
        description: "Choose a topic to generate insights about.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch("/api/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: selectedTopic }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate insight")
      }

      const data = await response.json()
      onNewInsight(data.insight)

      toast({
        title: "New insight generated!",
        description: "AI has analyzed the data and generated a new insight.",
      })
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please check your Gemini API key in environment variables.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="mb-8 border-2 border-dashed border-primary/20 bg-primary/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle>Generate New Insights</CardTitle>
        </div>
        <CardDescription>Use AI to analyze crop and weather data for new insights</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select analysis topic" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((topic) => (
                <SelectItem key={topic.value} value={topic.value}>
                  {topic.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={generateInsight} disabled={isGenerating || !selectedTopic} className="sm:w-auto">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Generate Insight
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
