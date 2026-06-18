'use client'

import { useState } from 'react'
import UploadZone from '@/components/UploadZone'
import ResultsPanel from '@/components/ResultsPanel'
import { extractTextFromPDF } from '@/lib/parseCV'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleAnalyze() {
    if (!file) return

    setLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      const cvText = await extractTextFromPDF(file)

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Something went wrong.')
        return
      }

      setAnalysis(data.analysis)
    } catch (err) {
      setError('Failed to analyze CV. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-2xl">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            AI Internship Copilot
          </h1>
          <p className="mt-3 text-gray-500">
            Upload your CV and get instant AI feedback to boost your internship chances.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
          <UploadZone onFileSelected={(f) => setFile(f)} />

          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className={`mt-6 w-full rounded-xl py-3 px-6 text-white font-semibold text-lg transition-colors ${
              !file || loading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
            }`}
          >
            {loading ? 'Analyzing your CV...' : 'Analyze CV'}
          </button>

          {loading && (
            <p className="mt-4 text-center text-sm text-gray-400 animate-pulse">
              Claude is reading your CV. This takes about 10 seconds...
            </p>
          )}

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>

        {analysis && <ResultsPanel analysis={analysis} />}

      </div>
    </main>
  )
}