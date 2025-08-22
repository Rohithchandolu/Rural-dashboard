import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Read CSV content
    const csvContent = await file.text()
    const lines = csvContent.split("\n")
    const headers = lines[0]?.split(",") || []
    const dataRows = lines.slice(1, 11) // Limit to first 10 rows for analysis

    const apiKey = process.env.GEMINI_API_KEY || "AIzaSyA5VoIT2F0AtPGyfPLnoZCmU5WbncDkRm0"

    // Set the environment variable that the Google AI SDK expects
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      process.env.GOOGLE_GENERATIVE_AI_API_KEY = apiKey
    }

    // Generate AI analysis
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: `Analyze this CSV data and provide insights:

Headers: ${headers.join(", ")}
Sample Data (first 10 rows):
${dataRows.join("\n")}

Please provide:
1. A brief summary of what this data represents
2. 3-5 key insights or patterns you notice
3. Suggest what type of chart would be best for visualizing this data

Format your response as JSON with this structure:
{
  "summary": "Brief description of the data",
  "insights": ["insight 1", "insight 2", "insight 3"],
  "chartType": "bar|line|pie|scatter",
  "recommendations": ["recommendation 1", "recommendation 2"]
}`,
    })

    let analysisResult
    try {
      analysisResult = JSON.parse(text)
    } catch {
      // Fallback if JSON parsing fails
      analysisResult = {
        summary: "Data analysis completed for uploaded CSV file",
        insights: [
          "Data contains " + headers.length + " columns",
          "Sample includes " + (lines.length - 1) + " rows of data",
          "Suitable for statistical analysis and visualization",
        ],
        chartType: "bar",
        recommendations: ["Consider data cleaning", "Explore correlations between variables"],
      }
    }

    // Generate sample chart data based on the first few columns
    const chartData = dataRows.slice(0, 5).map((row, index) => {
      const values = row.split(",")
      const dataPoint: any = { index: index + 1 }
      headers.slice(0, 3).forEach((header, i) => {
        const value = values[i]
        dataPoint[header.trim()] = isNaN(Number(value)) ? value : Number(value)
      })
      return dataPoint
    })

    return NextResponse.json({
      summary: analysisResult.summary,
      insights: analysisResult.insights,
      chartData,
      chartType: analysisResult.chartType,
      fileName: file.name,
      headers: headers.slice(0, 5), // Limit headers for display
    })
  } catch (error) {
    console.error("Error processing CSV:", error)
    return NextResponse.json({ error: "Failed to process CSV file" }, { status: 500 })
  }
}
