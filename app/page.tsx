'use client'

import { useRef, useState } from 'react'
import UploadZone from '@/components/UploadZone'
import ResultsPanel from '@/components/ResultsPanel'
import Hero from '@/components/Hero'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const uploadRef = useRef<HTMLDivElement>(null)

  function scrollToUpload() {
    uploadRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  async function handleAnalyze() {
    if (!file) return

    setLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
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
    <main className="min-h-screen bg-[var(--background)]">
      <Hero onGetStarted={scrollToUpload} />

      <div ref={uploadRef} className="mx-auto max-w-2xl px-4 pb-24">
        <div className="glass-card rounded-2xl p-8 transition-all">
          <UploadZone onFileSelected={(f) => setFile(f)} />

          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className={`mt-6 w-full rounded-xl py-3.5 px-6 text-white font-semibold text-lg transition-all ${
              !file || loading
                ? 'bg-white/10 cursor-not-allowed text-gray-500'
                : 'gradient-button cursor-pointer'
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
            <div className="mt-4 rounded-xl bg-red-500/10 border border-red-500/20 p-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>

        {analysis && <ResultsPanel analysis={analysis} />}
      </div>
    </main>
  )
}