"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, FileImage, FileSpreadsheet, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExportMenuProps {
  data?: any[]
  chartRefs?: React.RefObject<any>[]
  filename?: string
}

export function ExportMenu({ data, chartRefs, filename = "rural-dashboard" }: ExportMenuProps) {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const exportToCSV = () => {
    if (!data || data.length === 0) {
      toast({
        title: "No data to export",
        description: "There is no data available for export.",
        variant: "destructive",
      })
      return
    }

    setIsExporting(true)

    try {
      const headers = Object.keys(data[0]).join(",")
      const csvContent = [headers, ...data.map((row) => Object.values(row).join(","))].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `${filename}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Export successful",
        description: "Data has been exported to CSV file.",
      })
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting the data.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const exportChartAsImage = async () => {
    setIsExporting(true)

    try {
      // This is a simplified version - in a real app you'd use libraries like html2canvas
      toast({
        title: "Feature coming soon",
        description: "Chart image export will be available in the next update.",
      })
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting the chart.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const exportReport = () => {
    setIsExporting(true)

    try {
      const reportContent = `
Rural Development Analytics Report
Generated on: ${new Date().toLocaleDateString()}

Summary:
- Total data points: ${data?.length || 0}
- Export timestamp: ${new Date().toISOString()}

This report contains agricultural data analysis including crop production,
weather patterns, and regional comparisons.
      `

      const blob = new Blob([reportContent], { type: "text/plain;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `${filename}-report.txt`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Report exported",
        description: "Analytics report has been generated.",
      })
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error generating the report.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isExporting}>
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? "Exporting..." : "Export"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={exportToCSV}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportChartAsImage}>
          <FileImage className="h-4 w-4 mr-2" />
          Export Charts as Images
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={exportReport}>
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
