import { type NextRequest, NextResponse } from "next/server"
import type { AnalyzeRequest, PerformanceData } from "../../types/performance"
import puppeteer from "puppeteer"

export async function POST(request: NextRequest) {
  try {
    const { url }: AnalyzeRequest = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    const normalizedUrl = url.startsWith("http") ? url : `https://${url}`

    const performanceData = await analyzeWebsitePerformance(normalizedUrl)
    console.log("Performance data:", performanceData)


    return NextResponse.json(performanceData)
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json(
      { error: "Failed to analyze website performance. Please check if the URL is accessible." },
      { status: 500 },
    )
  }
}

async function analyzeWebsitePerformance(url: string): Promise<PerformanceData> {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  })
  const page = await browser.newPage()

  let totalBytes = 0
  let html = 0,
    css = 0,
    js = 0,
    images = 0,
    other = 0
  let requestCount = 0

  page.on("response", async (response) => {
    try {
      const headers = response.headers()
      const contentType = headers["content-type"] || ""
      const buffer = await response.buffer()
      const size = buffer.length
      totalBytes += size
      requestCount++

      if (contentType.includes("text/html")) html += size
      else if (contentType.includes("text/css")) css += size
      else if (contentType.includes("javascript")) js += size
      else if (contentType.includes("image/")) images += size
      else other += size
    } catch {
      // ignore errors here, like CORS or no body responses
    }
  })

  const navigationStart = Date.now()
  await page.goto(url, { waitUntil: "load", timeout: 45000 })
  const loadTime = Date.now() - navigationStart

  await browser.close()

  const recommendations: string[] = []
  if (loadTime > 3000) recommendations.push("Consider optimizing overall page load performance")
  if (js > 500000) recommendations.push("Large JavaScript bundles - consider code splitting")
  if (images > 1000000) recommendations.push("Optimize images - compress or use modern formats")
  if (requestCount > 50) recommendations.push("High number of requests - consider resource bundling")
  if (css > 200000) recommendations.push("Large CSS files - remove unused styles")

  return {
    url,
    loadTime,
    requestCount,
    pageSize: {
      total: totalBytes,
      html,
      css,
      js,
      images,
      other

    },
    timestamp: new Date().toISOString(),
    recommendations: recommendations.length > 0 ? recommendations : undefined,
  }
}
