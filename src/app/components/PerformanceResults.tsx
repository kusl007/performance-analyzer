import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, HardDrive, Activity, Globe, ImageIcon, FileText, Palette } from "lucide-react"
import type { PerformanceData } from "../types/performance"

interface PerformanceResultsProps {
  data: PerformanceData
}

export default function PerformanceResults({ data }: PerformanceResultsProps) {
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const getPerformanceGrade = (loadTime: number): { grade: string; color: string } => {
    if (loadTime < 1000) return { grade: "A", color: "bg-green-500" }
    if (loadTime < 2000) return { grade: "B", color: "bg-yellow-500" }
    if (loadTime < 3000) return { grade: "C", color: "bg-orange-500" }
    return { grade: "D", color: "bg-red-500" }
  }

  const performanceGrade = getPerformanceGrade(data.loadTime)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Performance Analysis Results
          </CardTitle>
          <CardDescription>
            Analysis for: <span className="font-mono text-sm">{data.url}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Performance Grade:</span>
              <Badge className={`${performanceGrade.color} text-white`}>{performanceGrade.grade}</Badge>
            </div>
            <div className="text-sm text-gray-500">Analyzed at {new Date(data.timestamp).toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Load Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">{(data.loadTime / 1000).toFixed(2)}s</div>
            <p className="text-sm text-gray-600">Total page load duration</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-green-600" />
              Page Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">{formatSize(data.pageSize.total)}</div>
            <p className="text-sm text-gray-600">Total resource size</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600" />
              Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-2">{data.requestCount}</div>
            <p className="text-sm text-gray-600">Total HTTP requests</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Resource Breakdown
          </CardTitle>
          <CardDescription>Detailed breakdown of page resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="font-semibold text-blue-600">HTML</div>
              <div className="text-sm text-gray-600">{formatSize(data.pageSize.html)}</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Palette className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-semibold text-green-600">CSS</div>
              <div className="text-sm text-gray-600">{formatSize(data.pageSize.css)}</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Activity className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="font-semibold text-yellow-600">JavaScript</div>
              <div className="text-sm text-gray-600">{formatSize(data.pageSize.js)}</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <ImageIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="font-semibold text-purple-600">Images</div>
              <div className="text-sm text-gray-600">{formatSize(data.pageSize.images)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {data.recommendations && data.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Recommendations</CardTitle>
            <CardDescription>Suggestions to improve your website performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
