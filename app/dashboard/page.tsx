"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CropProductionChart } from "@/components/dashboard/crop-production-chart"
import { CropTrendsChart } from "@/components/dashboard/crop-trends-chart"
import { CropDistributionChart } from "@/components/dashboard/crop-distribution-chart"
import { WeatherChart } from "@/components/dashboard/weather-chart"
import { YieldCorrelationChart } from "@/components/dashboard/yield-correlation-chart"
import { DashboardFilters } from "@/components/dashboard/dashboard-filters"
import { ExportMenu } from "@/components/export-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export interface FilterState {
  crop: string[]
  state: string[]
  season: string[]
  year: string
}

export default function DashboardPage() {
  const [filters, setFilters] = useState<FilterState>({
    crop: [],
    state: [],
    season: [],
    year: "2023",
  })

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const getFilteredStats = () => {
    // This would normally filter actual data based on current filters
    // For demo purposes, showing dynamic values based on filters
    const baseProduction = 284.8
    const multiplier = filters.crop.includes("rice") ? 1.2 : filters.crop.includes("wheat") ? 0.9 : 1.0

    return {
      totalProduction: (baseProduction * multiplier).toFixed(1),
      topCrop:
        filters.crop.length === 0
          ? "Rice"
          : filters.crop.length === 1
            ? filters.crop[0].charAt(0).toUpperCase() + filters.crop[0].slice(1)
            : `${filters.crop.length} crops`,
      avgRainfall: filters.state.includes("punjab") ? "850" : filters.state.includes("kerala") ? "2,650" : "1,194",
      growthRate: filters.year === "2023" ? "+3.2" : filters.year === "2022" ? "+2.8" : "+4.1",
    }
  }

  const stats = getFilteredStats()

  const exportData = [
    {
      state: "Uttar Pradesh",
      crop: "Rice",
      production_tonnes: 59100000,
      area_hectares: 5800000,
      yield_kg_per_hectare: 2400,
      season: "Kharif",
      year: 2023,
      rainfall_mm: 1200,
      temperature_avg: 28.5,
      growth_rate: 3.2,
    },
    {
      state: "Punjab",
      crop: "Wheat",
      production_tonnes: 30200000,
      area_hectares: 3500000,
      yield_kg_per_hectare: 4800,
      season: "Rabi",
      year: 2023,
      rainfall_mm: 850,
      temperature_avg: 22.1,
      growth_rate: 2.8,
    },
    {
      state: "Haryana",
      crop: "Wheat",
      production_tonnes: 18600000,
      area_hectares: 2500000,
      yield_kg_per_hectare: 4200,
      season: "Rabi",
      year: 2023,
      rainfall_mm: 900,
      temperature_avg: 23.2,
      growth_rate: 4.1,
    },
    {
      state: "Andhra Pradesh",
      crop: "Rice",
      production_tonnes: 16800000,
      area_hectares: 2800000,
      yield_kg_per_hectare: 3200,
      season: "Kharif",
      year: 2023,
      rainfall_mm: 1400,
      temperature_avg: 29.8,
      growth_rate: 2.5,
    },
    {
      state: "West Bengal",
      crop: "Rice",
      production_tonnes: 15700000,
      area_hectares: 5500000,
      yield_kg_per_hectare: 2850,
      season: "Kharif",
      year: 2023,
      rainfall_mm: 1600,
      temperature_avg: 27.9,
      growth_rate: 3.8,
    },
    {
      state: "Madhya Pradesh",
      crop: "Wheat",
      production_tonnes: 14200000,
      area_hectares: 5200000,
      yield_kg_per_hectare: 2730,
      season: "Rabi",
      year: 2023,
      rainfall_mm: 1100,
      temperature_avg: 25.4,
      growth_rate: 1.9,
    },
    {
      state: "Bihar",
      crop: "Rice",
      production_tonnes: 12800000,
      area_hectares: 3200000,
      yield_kg_per_hectare: 2200,
      season: "Kharif",
      year: 2023,
      rainfall_mm: 1300,
      temperature_avg: 26.7,
      growth_rate: 4.2,
    },
    {
      state: "Karnataka",
      crop: "Maize",
      production_tonnes: 11500000,
      area_hectares: 1800000,
      yield_kg_per_hectare: 3800,
      season: "Kharif",
      year: 2023,
      rainfall_mm: 950,
      temperature_avg: 24.8,
      growth_rate: 5.1,
    },
    {
      state: "Tamil Nadu",
      crop: "Rice",
      production_tonnes: 10900000,
      area_hectares: 1900000,
      yield_kg_per_hectare: 3600,
      season: "Kharif",
      year: 2023,
      rainfall_mm: 1250,
      temperature_avg: 28.9,
      growth_rate: 2.1,
    },
    {
      state: "Rajasthan",
      crop: "Wheat",
      production_tonnes: 9800000,
      area_hectares: 2800000,
      yield_kg_per_hectare: 2900,
      season: "Rabi",
      year: 2023,
      rainfall_mm: 650,
      temperature_avg: 26.3,
      growth_rate: 3.5,
    },
    {
      state: "Maharashtra",
      crop: "Sugarcane",
      production_tonnes: 8900000,
      area_hectares: 950000,
      yield_kg_per_hectare: 75000,
      season: "Annual",
      year: 2023,
      rainfall_mm: 1100,
      temperature_avg: 27.1,
      growth_rate: 1.8,
    },
    {
      state: "Gujarat",
      crop: "Cotton",
      production_tonnes: 7200000,
      area_hectares: 2600000,
      yield_kg_per_hectare: 550,
      season: "Kharif",
      year: 2023,
      rainfall_mm: 800,
      temperature_avg: 28.4,
      growth_rate: 6.2,
    },
    {
      state: "Kerala",
      crop: "Rice",
      production_tonnes: 5400000,
      area_hectares: 195000,
      yield_kg_per_hectare: 2800,
      season: "Kharif",
      year: 2023,
      rainfall_mm: 2650,
      temperature_avg: 26.8,
      growth_rate: 1.2,
    },
  ]

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
              <h1 className="text-2xl font-serif font-bold">Analytics Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <ExportMenu data={exportData} filename="crop-analytics" />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <DashboardFilters filters={filters} onFilterChange={handleFilterChange} />

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Production</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalProduction}M</div>
              <p className="text-xs text-muted-foreground">tonnes this year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Top Crop</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{stats.topCrop}</div>
              <p className="text-xs text-muted-foreground">118.4M tonnes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Rainfall</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.avgRainfall}mm</div>
              <p className="text-xs text-muted-foreground">annual average</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Growth Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-1">{stats.growthRate}%</div>
              <p className="text-xs text-muted-foreground">vs last year</p>
            </CardContent>
          </Card>
        </div>

        {/* Crop Production Analytics */}
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold mb-6">Crop Production Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Production by State</CardTitle>
                <CardDescription>Top 10 states by total crop production</CardDescription>
              </CardHeader>
              <CardContent>
                <CropProductionChart filters={filters} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Crop Distribution</CardTitle>
                <CardDescription>Percentage share of major crops</CardDescription>
              </CardHeader>
              <CardContent>
                <CropDistributionChart filters={filters} />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Production Trends Over Years</CardTitle>
              <CardDescription>Historical crop production trends from 2018-2023</CardDescription>
            </CardHeader>
            <CardContent>
              <CropTrendsChart filters={filters} />
            </CardContent>
          </Card>
        </div>

        {/* Weather & Agriculture */}
        <div>
          <h2 className="text-3xl font-serif font-bold mb-6">Weather & Agriculture</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weather Conditions</CardTitle>
                <CardDescription>Temperature and rainfall patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <WeatherChart filters={filters} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Weather-Yield Correlation</CardTitle>
                <CardDescription>Impact of rainfall on crop yields</CardDescription>
              </CardHeader>
              <CardContent>
                <YieldCorrelationChart filters={filters} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
