export interface PerformanceData {
  url: string
  loadTime: number // in milliseconds
  pageSize: {
    total: number
    html: number
    css: number
    js: number
    images: number
    other: number 
  }
  requestCount: number
  timestamp: string
  recommendations?: string[]
}

export interface AnalyzeRequest {
  url: string
}

export interface AnalyzeResponse extends PerformanceData {}
