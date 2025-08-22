"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import type { FilterState } from "@/app/dashboard/page"

const allData = [
  { state: "Uttar Pradesh", production: 59.1, crop: "rice" },
  { state: "Punjab", production: 30.2, crop: "wheat" },
  { state: "Haryana", production: 18.6, crop: "wheat" },
  { state: "Andhra Pradesh", production: 16.8, crop: "rice" },
  { state: "West Bengal", production: 15.7, crop: "rice" },
  { state: "Madhya Pradesh", production: 14.9, crop: "wheat" },
  { state: "Bihar", production: 12.4, crop: "rice" },
  { state: "Karnataka", production: 11.8, crop: "sugarcane" },
  { state: "Tamil Nadu", production: 10.2, crop: "rice" },
  { state: "Rajasthan", production: 9.7, crop: "wheat" },
]

interface CropProductionChartProps {
  filters: FilterState
}

export function CropProductionChart({ filters }: CropProductionChartProps) {
  const filteredData = allData.filter((item) => {
    if (filters.crop.length > 0 && !filters.crop.includes(item.crop)) return false
    if (filters.state.length > 0 && !filters.state.includes(item.state.toLowerCase().replace(" ", "-"))) return false
    if (filters.search && !item.state.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="state" className="text-xs fill-muted-foreground" angle={-45} textAnchor="end" height={80} />
        <YAxis className="text-xs fill-muted-foreground" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
          formatter={(value) => [`${value}M tonnes`, "Production"]}
        />
        <Bar dataKey="production" className="fill-primary" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
