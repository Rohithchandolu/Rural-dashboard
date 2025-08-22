"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import type { FilterState } from "@/app/dashboard/page"

const allData = [
  { name: "Rice", value: 41.6, color: "hsl(var(--chart-1))" },
  { name: "Wheat", value: 34.6, color: "hsl(var(--chart-2))" },
  { name: "Sugarcane", value: 11.5, color: "hsl(var(--chart-3))" },
  { name: "Maize", value: 7.2, color: "hsl(var(--chart-4))" },
  { name: "Others", value: 5.1, color: "hsl(var(--chart-5))" },
]

interface CropDistributionChartProps {
  filters: FilterState
}

export function CropDistributionChart({ filters }: CropDistributionChartProps) {
  let data = allData

  if (filters.crop.length > 0) {
    // When specific crops are selected, show only those crops or highlight them
    if (filters.crop.length === 1) {
      // Single crop selected - highlight it
      data = allData.map((item) => ({
        ...item,
        value: filters.crop.includes(item.name.toLowerCase()) ? item.value * 1.2 : item.value * 0.8,
      }))
    } else {
      // Multiple crops selected - filter to show only selected crops
      data = allData.filter((item) => filters.crop.includes(item.name.toLowerCase()) || item.name === "Others")
    }
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
          formatter={(value) => [`${value.toFixed(1)}%`]}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
