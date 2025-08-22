"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import type { FilterState } from "@/app/dashboard/page"

const weatherData = {
  "uttar-pradesh": [
    { month: "Jan", temperature: 18, rainfall: 20 },
    { month: "Feb", temperature: 22, rainfall: 18 },
    { month: "Mar", temperature: 28, rainfall: 15 },
    { month: "Apr", temperature: 33, rainfall: 12 },
    { month: "May", temperature: 37, rainfall: 25 },
    { month: "Jun", temperature: 36, rainfall: 85 },
    { month: "Jul", temperature: 32, rainfall: 285 },
    { month: "Aug", temperature: 31, rainfall: 275 },
    { month: "Sep", temperature: 32, rainfall: 165 },
    { month: "Oct", temperature: 28, rainfall: 45 },
    { month: "Nov", temperature: 23, rainfall: 15 },
    { month: "Dec", temperature: 19, rainfall: 12 },
  ],
  punjab: [
    { month: "Jan", temperature: 15, rainfall: 25 },
    { month: "Feb", temperature: 18, rainfall: 20 },
    { month: "Mar", temperature: 25, rainfall: 15 },
    { month: "Apr", temperature: 30, rainfall: 10 },
    { month: "May", temperature: 35, rainfall: 20 },
    { month: "Jun", temperature: 38, rainfall: 45 },
    { month: "Jul", temperature: 35, rainfall: 180 },
    { month: "Aug", temperature: 33, rainfall: 160 },
    { month: "Sep", temperature: 30, rainfall: 80 },
    { month: "Oct", temperature: 25, rainfall: 15 },
    { month: "Nov", temperature: 20, rainfall: 5 },
    { month: "Dec", temperature: 16, rainfall: 10 },
  ],
  kerala: [
    { month: "Jan", temperature: 28, rainfall: 25 },
    { month: "Feb", temperature: 30, rainfall: 35 },
    { month: "Mar", temperature: 32, rainfall: 45 },
    { month: "Apr", temperature: 33, rainfall: 125 },
    { month: "May", temperature: 32, rainfall: 195 },
    { month: "Jun", temperature: 29, rainfall: 485 },
    { month: "Jul", temperature: 28, rainfall: 385 },
    { month: "Aug", temperature: 28, rainfall: 285 },
    { month: "Sep", temperature: 29, rainfall: 195 },
    { month: "Oct", temperature: 30, rainfall: 285 },
    { month: "Nov", temperature: 29, rainfall: 185 },
    { month: "Dec", temperature: 28, rainfall: 65 },
  ],
  default: [
    { month: "Jan", temperature: 22, rainfall: 15 },
    { month: "Feb", temperature: 25, rainfall: 12 },
    { month: "Mar", temperature: 30, rainfall: 18 },
    { month: "Apr", temperature: 35, rainfall: 25 },
    { month: "May", temperature: 38, rainfall: 45 },
    { month: "Jun", temperature: 35, rainfall: 165 },
    { month: "Jul", temperature: 32, rainfall: 285 },
    { month: "Aug", temperature: 31, rainfall: 275 },
    { month: "Sep", temperature: 32, rainfall: 195 },
    { month: "Oct", temperature: 30, rainfall: 85 },
    { month: "Nov", temperature: 26, rainfall: 35 },
    { month: "Dec", temperature: 23, rainfall: 18 },
  ],
}

interface WeatherChartProps {
  filters: FilterState
}

export function WeatherChart({ filters }: WeatherChartProps) {
  const selectedState = filters.state.length > 0 ? filters.state[0] : "default"
  const data = weatherData[selectedState as keyof typeof weatherData] || weatherData.default

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
        <YAxis className="text-xs fill-muted-foreground" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
          formatter={(value, name) => [
            name === "temperature" ? `${value}°C` : `${value}mm`,
            name === "temperature" ? "Temperature" : "Rainfall",
          ]}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="temperature"
          stackId="1"
          stroke="hsl(var(--chart-1))"
          fill="hsl(var(--chart-1))"
          fillOpacity={0.6}
        />
        <Area
          type="monotone"
          dataKey="rainfall"
          stackId="2"
          stroke="hsl(var(--chart-2))"
          fill="hsl(var(--chart-2))"
          fillOpacity={0.6}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
