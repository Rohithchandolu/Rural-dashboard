"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileText, BarChart3, TrendingUp, Loader2, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ReportData {
  summary: string
  insights: string[]
  chartData: any[]
  chartType: string
  fileName: string
  reportId: string
}

export function CsvReportWidget() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    const fileName = selectedFile?.name.toLowerCase() ?? ""

    // Browsers may report CSV files as text/plain, application/vnd.ms-excel, or an empty MIME type.
    // The extension is the reliable signal for this upload because the API validates the contents too.
    if (selectedFile && fileName.endsWith(".csv")) {
      setFile(selectedFile)
      setReportData(null)
      return
    }

    e.target.value = ""
    setFile(null)
    toast({
      title: "Invalid file type",
      description: "Please select a file with a .csv extension.",
      variant: "destructive",
    })
  }

  const generateReport = async () => {
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/generate-csv-report", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to generate report")
      }

      const data = await response.json()
      const reportWithId = {
        ...data,
        reportId: `report-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      }
      setReportData(reportWithId)

      toast({
        title: "Report generated successfully",
        description: `Analysis complete for ${file.name}`,
      })
    } catch (error) {
      console.error("Error generating report:", error)
      toast({
        title: "Error generating report",
        description: "Please try again or check your file format.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const openDashboardReport = () => {
    if (reportData) {
      // Keep the report in this tab so sessionStorage is available on the report page.
      sessionStorage.setItem(`report-${reportData.reportId}`, JSON.stringify(reportData))
      window.location.assign(`/report/${reportData.reportId}`)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          CSV Report Generator
        </CardTitle>
        <CardDescription>Upload a CSV file to generate detailed analytics reports with AI insights</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="csv-file">Upload CSV File</Label>
          <div className="flex items-center gap-2">
            <Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} className="flex-1" />
            <Button onClick={generateReport} disabled={!file || loading} className="flex items-center gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {loading ? "Generating..." : "Generate Report"}
            </Button>
          </div>
        </div>

        {file && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium">Selected file: {file.name}</p>
            <p className="text-xs text-muted-foreground">Size: {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}

        {reportData && (
          <div className="space-y-4 mt-6">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <BarChart3 className="h-5 w-5" />
              Report for {reportData.fileName}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{reportData.summary}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {reportData.insights.map((insight, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {insight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Button onClick={openDashboardReport} className="w-full flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              View Full Dashboard Report
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
