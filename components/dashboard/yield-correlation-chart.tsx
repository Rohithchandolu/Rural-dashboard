"use client"

import { Scatter, ScatterChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import type { FilterState } from "@/app/dashboard/page"

const correlationData = {
  rice: [
    { rainfall: 950, yield: 3.2 },
    { rainfall: 1020, yield: 3.8 },
    { rainfall: 1150, yield: 4.4 },
    { rainfall: 1280, yield: 5.1 },
    { rainfall: 1350, yield: 5.6 },
    { rainfall: 1420, yield: 5.9 },
    { rainfall: 1550, yield: 6.2 },
    { rainfall: 1680, yield: 6.4 },
    { rainfall: 1750, yield: 6.1 },
    { rainfall: 1850, yield: 5.8 },
    { rainfall: 1950, yield: 5.4 },
    { rainfall: 2050, yield: 5.0 },
  ],
  wheat: [
    { rainfall: 450, yield: 2.1 },
    { rainfall: 520, yield: 2.6 },
    { rainfall: 650, yield: 3.2 },
    { rainfall: 780, yield: 3.8 },
    { rainfall: 850, yield: 4.2 },
    { rainfall: 920, yield: 4.6 },
    { rainfall: 1050, yield: 4.9 },
    { rainfall: 1180, yield: 5.1 },
    { rainfall: 1250, yield: 4.8 },
    { rainfall: 1350, yield: 4.4 },
    { rainfall: 1450, yield: 4.0 },
    { rainfall: 1550, yield: 3.6 },
  ],
  maize: [
    { rainfall: 600, yield: 2.4 },
    { rainfall: 680, yield: 2.9 },
    { rainfall: 750, yield: 3.4 },
    { rainfall: 820, yield: 3.9 },
    { rainfall: 900, yield: 4.3 },
    { rainfall: 980, yield: 4.7 },
    { rainfall: 1080, yield: 5.0 },
    { rainfall: 1180, yield: 5.2 },
    { rainfall: 1280, yield: 5.1 },
    { rainfall: 1380, yield: 4.8 },
    { rainfall: 1480, yield: 4.5 },
    { rainfall: 1580, yield: 4.2 },
  ],
  sugarcane: [
    { rainfall: 1200, yield: 45 },
    { rainfall: 1350, yield: 52 },
    { rainfall: 1500, yield: 58 },
    { rainfall: 1650, yield: 64 },
    { rainfall: 1800, yield: 69 },
    { rainfall: 1950, yield: 73 },
    { rainfall: 2100, yield: 76 },
    { rainfall: 2250, yield: 78 },
    { rainfall: 2400, yield: 76 },
    { rainfall: 2550, yield: 73 },
    { rainfall: 2700, yield: 70 },
    { rainfall: 2850, yield: 67 },
  ],
  default: [
    { rainfall: 850, yield: 2.8 },
    { rainfall: 920, yield: 3.1 },
    { rainfall: 1050, yield: 3.6 },
    { rainfall: 1180, yield: 4.2 },
    { rainfall: 1250, yield: 4.5 },
    { rainfall: 1320, yield: 4.8 },
    { rainfall: 1450, yield: 5.1 },
    { rainfall: 1580, yield: 5.4 },
    { rainfall: 1650, yield: 5.2 },
    { rainfall: 1750, yield: 4.9 },
    { rainfall: 1850, yield: 4.6 },
    { rainfall: 1950, yield: 4.3 },
  ],
}

interface YieldCorrelationChartProps {
  filters: FilterState
}

export function YieldCorrelationChart({ filters }: YieldCorrelationChartProps) {
  const selectedCrop = filters.crop.length > 0 ? filters.crop[0] : "default"
  const data = correlationData[selectedCrop as keyof typeof correlationData] || correlationData.default

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="rainfall" className="text-xs fill-muted-foreground" name="Rainfall" unit="mm" />
        <YAxis dataKey="yield" className="text-xs fill-muted-foreground" name="Yield" unit="t/ha" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
          formatter={(value, name) => [
            name === "rainfall" ? `${value}mm` : `${value}t/ha`,
            name === "rainfall" ? "Rainfall" : "Yield",
          ]}
        />
        <Scatter dataKey="yield" fill="hsl(var(--primary))" />
      </ScatterChart>
    </ResponsiveContainer>
  )
}
