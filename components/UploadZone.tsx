'use client'

import { useRef, useState } from 'react'

interface Props {
  onFileSelected: (file: File) => void
}

type UploadState = 'idle' | 'dragging' | 'success' | 'error'

export default function UploadZone({ onFileSelected }: Props) {
  const [state, setState] = useState<UploadState>('idle')
  const [fileName, setFileName] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File) {
    if (file.type !== 'application/pdf') {
      setErrorMsg('Only PDF files are supported.')
      setState('error')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File too large. Maximum size is 10MB.')
      setState('error')
      return
    }
    setFileName(file.name)
    setState('success')
    setErrorMsg(null)
    onFileSelected(file)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setState('idle')
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setState('dragging')
  }

  function handleDragLeave() {
    setState('idle')
  }

  function handleReset() {
    setState('idle')
    setFileName(null)
    setErrorMsg(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const stateStyles = {
    idle: 'border-white/10 bg-[var(--surface)] hover:border-indigo-500/50 hover:bg-[var(--surface-hover)]',
    dragging: 'border-indigo-500 bg-indigo-500/10 scale-[1.01]',
    success: 'border-green-500/40 bg-green-500/5',
    error: 'border-red-500/40 bg-red-500/5',
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-300">Resume</p>
        <span className="text-xs text-zinc-500">PDF only · Max 10MB</span>
      </div>

      <div
        onClick={() => state !== 'success' && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative cursor-pointer rounded-xl border transition-all duration-200 p-8 text-center ${stateStyles[state]}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleChange}
        />

        {state === 'idle' && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <svg className="h-6 w-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-300">
                Drop your resume here
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                or click to browse files
              </p>
            </div>
          </div>
        )}

        {state === 'dragging' && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/50 bg-indigo-500/10">
              <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-sm font-medium text-indigo-400">
              Release to upload
            </p>
          </div>
        )}

        {state === 'success' && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-green-500/30 bg-green-500/10">
                <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-green-400">
                  Resume uploaded
                </p>
                <p className="mt-0.5 text-xs text-zinc-500 truncate max-w-[200px]">
                  {fileName}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); handleReset() }}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 hover:bg-white/10 transition-colors"
            >
              Change
            </button>
          </div>
        )}

        {state === 'error' && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10">
              <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-red-400">
                {errorMsg}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Click to try again
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}