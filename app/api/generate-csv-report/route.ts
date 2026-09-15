import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

function parseCsvLine(line: string) {
  const values: string[] = []
  let value = ""
  let quoted = false
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index]
    if (character === '"' && line[index + 1] === '"') {
      value += '"'
      index += 1
    } else if (character === '"') {
      quoted = !quoted
    } else if (character === "," && !quoted) {
      values.push(value.trim())
      value = ""
    } else {
      value += character
    }
  }
  values.push(value.trim())
  return values
}

function fallbackAnalysis(headers: string[], rows: string[][]) {
  const numericColumns = headers.filter((_, index) => rows.some((row) => Number.isFinite(Number(row[index]))))
  return {
    summary: `The uploaded file contains ${rows.length} data rows and ${headers.length} columns.`,
    insights: [
      `${numericColumns.length} columns contain numeric values suitable for comparison.`,
      `The report preview uses the first ${Math.min(rows.length, 10)} rows of the uploaded data.`,
      "Review missing values and units before using the results for planning.",
    ],
    chartType: numericColumns.length > 1 ? "bar" : "line",
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const fileValue = formData.get("file")
    if (!(fileValue instanceof File)) {
      return NextResponse.json({ error: "No CSV file provided" }, { status: 400 })
    }
    if (!fileValue.name.toLowerCase().endsWith(".csv")) {
      return NextResponse.json({ error: "Only CSV files are supported" }, { status: 415 })
    }
    if (fileValue.size === 0 || fileValue.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "CSV must be between 1 byte and 5 MB" }, { status: 413 })
    }

    const content = (await fileValue.text()).replace(/^\uFEFF/, "")
    const lines = content.split(/\r?\n/).filter((line) => line.trim().length > 0)
    if (lines.length < 2) {
      return NextResponse.json({ error: "CSV must include a header and at least one data row" }, { status: 422 })
    }

    const headers = parseCsvLine(lines[0]).map((header, index) => header || `Column ${index + 1}`)
    const rows = lines.slice(1).map(parseCsvLine)
    const fallback = fallbackAnalysis(headers, rows)
    let analysis = fallback

    if (process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY) {
      try {
        const { text } = await generateText({
          model: google("gemini-2.0-flash"),
          temperature: 0.2,
          prompt: `Analyze this CSV preview. Return only valid JSON with summary (string), insights (array of 3 strings), and chartType (bar, line, pie, or scatter). Do not invent exact statistics.\nHeaders: ${headers.join(", ")}\nRows:\n${rows.slice(0, 10).map((row) => row.join(" | ")).join("\n")}`,
        })
        const parsed = JSON.parse(text.replace(/^```json\s*|\s*```$/g, "").trim())
        analysis = {
          summary: String(parsed.summary || fallback.summary),
          insights: Array.isArray(parsed.insights) ? parsed.insights.slice(0, 5).map(String) : fallback.insights,
          chartType: ["bar", "line", "pie", "scatter"].includes(parsed.chartType) ? parsed.chartType : fallback.chartType,
        }
      } catch (error) {
        console.error("[v0] CSV AI analysis failed; using local analysis:", error)
      }
    }

    const chartData = rows.slice(0, 10).map((row, index) => {
      const point: Record<string, string | number> = { name: String(row[0] || index + 1), value: 0 }
      headers.slice(0, 5).forEach((header, columnIndex) => {
        const raw = row[columnIndex] || ""
        const numeric = Number(raw.replace(/,/g, ""))
        point[header] = raw !== "" && Number.isFinite(numeric) ? numeric : raw
      })
      const firstNumeric = row.map((value) => Number(value.replace(/,/g, ""))).find(Number.isFinite)
      point.value = firstNumeric ?? index + 1
      return point
    })

    return NextResponse.json({ ...analysis, chartData, fileName: fileValue.name, headers: headers.slice(0, 5) })
  } catch (error) {
    console.error("[v0] Error processing CSV:", error)
    return NextResponse.json({ error: "Failed to process CSV file" }, { status: 500 })
  }
}
