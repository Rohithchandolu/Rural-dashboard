"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import type { FilterState } from "@/app/dashboard/page"

const allData = [
  { year: "2018", rice: 116.4, wheat: 99.7, maize: 27.8, sugarcane: 86.0 },
  { year: "2019", rice: 118.4, wheat: 103.6, maize: 28.7, sugarcane: 88.1 },
  { year: "2020", rice: 124.4, wheat: 107.9, maize: 31.7, sugarcane: 90.2 },
  { year: "2021", rice: 129.7, wheat: 109.5, maize: 33.6, sugarcane: 92.8 },
  { year: "2022", rice: 132.0, wheat: 110.5, maize: 35.9, sugarcane: 95.1 },
  { year: "2023", rice: 135.8, wheat: 112.9, maize: 37.4, sugarcane: 97.6 },
]

interface CropTrendsChartProps {
  filters: FilterState
}

export function CropTrendsChart({ filters }: CropTrendsChartProps) {
  let data = allData

  if (filters.year !== "2023") {
    const yearIndex = allData.findIndex((item) => item.year === filters.year)
    if (yearIndex !== -1) {
      data = allData.slice(0, yearIndex + 1)
    }
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="year" className="text-xs fill-muted-foreground" />
        <YAxis className="text-xs fill-muted-foreground" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
          formatter={(value) => [`${value}M tonnes`]}
        />
        <Legend />
        {(filters.crop.length === 0 || filters.crop.includes("rice")) && (
          <Line type="monotone" dataKey="rice" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} />
        )}
        {(filters.crop.length === 0 || filters.crop.includes("wheat")) && (
          <Line type="monotone" dataKey="wheat" stroke="#dc2626" strokeWidth={3} dot={{ r: 4 }} />
        )}
        {(filters.crop.length === 0 || filters.crop.includes("maize")) && (
          <Line type="monotone" dataKey="maize" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
        )}
        {(filters.crop.length === 0 || filters.crop.includes("sugarcane")) && (
          <Line type="monotone" dataKey="sugarcane" stroke="#7c3aed" strokeWidth={3} dot={{ r: 4 }} />
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}
