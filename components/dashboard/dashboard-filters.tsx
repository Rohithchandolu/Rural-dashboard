"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Filter, ChevronDown } from "lucide-react"
import { useState } from "react"
import type { FilterState } from "@/app/dashboard/page"

interface DashboardFiltersProps {
  filters: FilterState
  onFilterChange: (filters: Partial<FilterState>) => void
}

export function DashboardFilters({ filters, onFilterChange }: DashboardFiltersProps) {
  const [openSections, setOpenSections] = useState({
    crop: false,
    state: false,
    season: false,
  })

  const crops = [
    { value: "rice", label: "Rice" },
    { value: "wheat", label: "Wheat" },
    { value: "maize", label: "Maize" },
    { value: "sugarcane", label: "Sugarcane" },
    { value: "cotton", label: "Cotton" },
    { value: "pulses", label: "Pulses" },
  ]

  const states = [
    { value: "uttar-pradesh", label: "Uttar Pradesh" },
    { value: "punjab", label: "Punjab" },
    { value: "haryana", label: "Haryana" },
    { value: "andhra-pradesh", label: "Andhra Pradesh" },
    { value: "west-bengal", label: "West Bengal" },
    { value: "madhya-pradesh", label: "Madhya Pradesh" },
    { value: "bihar", label: "Bihar" },
    { value: "karnataka", label: "Karnataka" },
    { value: "tamil-nadu", label: "Tamil Nadu" },
    { value: "rajasthan", label: "Rajasthan" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "gujarat", label: "Gujarat" },
    { value: "kerala", label: "Kerala" },
  ]

  const seasons = [
    { value: "kharif", label: "Kharif (Monsoon)" },
    { value: "rabi", label: "Rabi (Winter)" },
    { value: "zaid", label: "Zaid (Summer)" },
  ]

  const years = [
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
    { value: "2018", label: "2018" },
  ]

  /* Updated clear filters for array-based filters */
  const clearFilters = () => {
    onFilterChange({
      crop: [],
      state: [],
      season: [],
      year: "2023",
    })
  }

  /* Updated active filters count for arrays */
  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.crop.length > 0) count++
    if (filters.state.length > 0) count++
    if (filters.season.length > 0) count++
    return count
  }

  /* Added multi-select handlers */
  const handleMultiSelect = (type: "crop" | "state" | "season", value: string, checked: boolean) => {
    const currentValues = filters[type] as string[]
    if (checked) {
      onFilterChange({ [type]: [...currentValues, value] })
    } else {
      onFilterChange({ [type]: currentValues.filter((v) => v !== value) })
    }
  }

  const toggleSection = (section: "crop" | "state" | "season") => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <CardTitle>Filters & Controls</CardTitle>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {activeFiltersCount} active
              </Badge>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Button variant="outline" onClick={() => toggleSection("crop")} className="w-full justify-between">
              {filters.crop.length === 0 ? "Select crops" : `${filters.crop.length} crop(s)`}
              <ChevronDown className="h-4 w-4" />
            </Button>
            {openSections.crop && (
              <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-popover border rounded-md shadow-lg max-h-48 overflow-y-auto">
                {crops.map((crop) => (
                  <div key={crop.value} className="flex items-center space-x-2 p-2 hover:bg-muted">
                    <Checkbox
                      id={`crop-${crop.value}`}
                      checked={filters.crop.includes(crop.value)}
                      onCheckedChange={(checked) => handleMultiSelect("crop", crop.value, checked as boolean)}
                    />
                    <label htmlFor={`crop-${crop.value}`} className="text-sm cursor-pointer">
                      {crop.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <Button variant="outline" onClick={() => toggleSection("state")} className="w-full justify-between">
              {filters.state.length === 0 ? "Select states" : `${filters.state.length} state(s)`}
              <ChevronDown className="h-4 w-4" />
            </Button>
            {openSections.state && (
              <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-popover border rounded-md shadow-lg max-h-48 overflow-y-auto">
                {states.map((state) => (
                  <div key={state.value} className="flex items-center space-x-2 p-2 hover:bg-muted">
                    <Checkbox
                      id={`state-${state.value}`}
                      checked={filters.state.includes(state.value)}
                      onCheckedChange={(checked) => handleMultiSelect("state", state.value, checked as boolean)}
                    />
                    <label htmlFor={`state-${state.value}`} className="text-sm cursor-pointer">
                      {state.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <Button variant="outline" onClick={() => toggleSection("season")} className="w-full justify-between">
              {filters.season.length === 0 ? "Select seasons" : `${filters.season.length} season(s)`}
              <ChevronDown className="h-4 w-4" />
            </Button>
            {openSections.season && (
              <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-popover border rounded-md shadow-lg max-h-48 overflow-y-auto">
                {seasons.map((season) => (
                  <div key={season.value} className="flex items-center space-x-2 p-2 hover:bg-muted">
                    <Checkbox
                      id={`season-${season.value}`}
                      checked={filters.season.includes(season.value)}
                      onCheckedChange={(checked) => handleMultiSelect("season", season.value, checked as boolean)}
                    />
                    <label htmlFor={`season-${season.value}`} className="text-sm cursor-pointer">
                      {season.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Year Filter (single select) */}
          <Select value={filters.year} onValueChange={(value) => onFilterChange({ year: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year.value} value={year.value}>
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.crop.length > 0 && (
              <Badge variant="outline" className="gap-1">
                Crops: {filters.crop.map((c) => crops.find((crop) => crop.value === c)?.label).join(", ")}
                <X className="h-3 w-3 cursor-pointer" onClick={() => onFilterChange({ crop: [] })} />
              </Badge>
            )}
            {filters.state.length > 0 && (
              <Badge variant="outline" className="gap-1">
                States: {filters.state.map((s) => states.find((state) => state.value === s)?.label).join(", ")}
                <X className="h-3 w-3 cursor-pointer" onClick={() => onFilterChange({ state: [] })} />
              </Badge>
            )}
            {filters.season.length > 0 && (
              <Badge variant="outline" className="gap-1">
                Seasons: {filters.season.map((s) => seasons.find((season) => season.value === s)?.label).join(", ")}
                <X className="h-3 w-3 cursor-pointer" onClick={() => onFilterChange({ season: [] })} />
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
