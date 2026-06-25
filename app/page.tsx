'use client'

import { useRef, useState } from 'react'
import UploadZone from '@/components/UploadZone'
import ResultsPanel from '@/components/ResultsPanel'
import Hero from '@/components/Hero'
import JobDescriptionInput from '@/components/JobDescriptionInput'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [jobDescription, setJobDescription] = useState('')
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
      formData.append('jobDescription', jobDescription)

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
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)]">

      <div className="glow-blob animate-pulse-glow h-[500px] w-[500px] bg-indigo-600 -top-20 left-1/4 -z-10" />
      <div className="glow-blob animate-pulse-glow h-[400px] w-[400px] bg-violet-700 top-10 right-1/4 -z-10" />
      <div className="glow-blob animate-pulse-glow h-[400px] w-[400px] bg-indigo-800 top-[60vh] left-10 -z-10" />
      <div className="glow-blob animate-pulse-glow h-[300px] w-[300px] bg-violet-800 top-[120vh] right-10 -z-10" />
      <div className="glow-blob animate-pulse-glow h-[400px] w-[400px] bg-indigo-900 top-[180vh] left-1/3 -z-10" />

      <Hero onGetStarted={scrollToUpload} />

      <div ref={uploadRef} className="flex flex-col items-center w-full px-4 pb-32 pt-8">
        <div className="w-full max-w-2xl">

          <div className="glass-card p-8">
            <UploadZone onFileSelected={(f) => setFile(f)} />
            <JobDescriptionInput onTextChange={(text) => setJobDescription(text)} />

            <button
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="gradient-button mt-6 w-full rounded-xl py-4 text-base font-semibold disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {loading ? 'Analyzing...' : 'Analyze CV'}
            </button>

            {loading && (
              <p className="mt-4 text-center text-sm text-zinc-500 animate-pulse">
                Claude is reading your CV. This takes about 15 seconds...
              </p>
            )}

            {error && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
          </div>

          {analysis && (
            <div className="animate-fade-up">
              <ResultsPanel analysis={analysis} />
            </div>
          )}

        </div>
      </div>

    </main>
  )
}