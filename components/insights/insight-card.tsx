import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { LucideIcon } from "lucide-react"

interface InsightCardProps {
  insight: {
    id: number
    title: string
    content: string
    category: string
    impact: "high" | "medium" | "low"
    confidence: number
    icon: LucideIcon
  }
}

export function InsightCard({ insight }: InsightCardProps) {
  const { title, content, category, impact, confidence, icon: Icon } = insight

  const impactColors = {
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-serif">{title}</CardTitle>
              <CardDescription>{category}</CardDescription>
            </div>
          </div>
          <Badge className={impactColors[impact]} variant="secondary">
            {impact} impact
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 leading-relaxed">{content}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Confidence:</span>
            <Progress value={confidence} className="w-20 h-2" />
            <span className="text-sm font-medium">{confidence}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
