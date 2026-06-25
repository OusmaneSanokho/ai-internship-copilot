'use client'

import { useState } from 'react'

interface Props {
  onTextChange: (text: string) => void
}

export default function JobDescriptionInput({ onTextChange }: Props) {
  const [text, setText] = useState('')
  const maxChars = 3000

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value
    if (value.length <= maxChars) {
      setText(value)
      onTextChange(value)
    }
  }

  const charPercent = Math.round((text.length / maxChars) * 100)
  const charColor =
    charPercent > 90
      ? 'text-red-400'
      : charPercent > 70
      ? 'text-yellow-400'
      : 'text-zinc-500'

  return (
    <div className="mt-4">

      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-zinc-300">
            Job Description
          </p>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-zinc-500">
            Optional but recommended
          </span>
        </div>
        <span className={`text-xs ${charColor}`}>
          {text.length}/{maxChars}
        </span>
      </div>

      <div className="relative">
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Paste internship description here..."
          rows={6}
          className="textarea-glow w-full resize-none rounded-xl border border-white/10 bg-[var(--surface)] px-4 py-3 text-sm text-zinc-300 placeholder-zinc-600 transition-all duration-200"
        />

        {text.length === 0 && (
          <div className="pointer-events-none absolute bottom-3 right-3">
            <svg
              className="h-4 w-4 text-zinc-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        )}

        {text.length > 0 && (
          <button
            onClick={() => { setText(''); onTextChange('') }}
            className="absolute right-3 top-3 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-500 hover:bg-white/10 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {text.length > 0 && (
        <p className="mt-2 text-xs text-zinc-600">
          ✓ Claude will compare your resume against this job description
        </p>
      )}

    </div>
  )
}