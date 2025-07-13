"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Globe, Activity } from "lucide-react"
import PerformanceResults from "./components/PerformanceResults"
import type { PerformanceData } from "./types/performance"

export default function Home() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<PerformanceData | null>(null)
  const [error, setError] = useState("")

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`)
      return true
    } catch {
      return false
    }
  }

  const analyzeUrl = async () => {
    if (!url.trim()) {
      setError("Please enter a URL")
      return
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid URL")
      return
    }

    setLoading(true)
    setError("")
    setResults(null)

    try {
      const normalizedUrl = url.startsWith("http") ? url : `https://${url}`
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: normalizedUrl }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze URL")
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    analyzeUrl()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
            <Globe className="h-8 w-8 text-blue-600" />
            URL Performance Analyzer
          </h1>
          <p className="text-gray-600 text-lg">
            Analyze website performance metrics including load time, page size, and request count
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Analyze Website Performance
            </CardTitle>
            <CardDescription>Enter a URL to get detailed performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Website URL</Label>
                <Input
                  id="url"
                  type="text"
                  placeholder="example.com or https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={loading}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" disabled={loading || !url.trim()} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Performance"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {results && <PerformanceResults data={results} />}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Built with React, Next.js, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  )
}
