'use client'

import { useEffect, useState } from 'react'

const messages = [
  'Analyzing Resume...',
  'Identifying Missing Skills...',
  'Preparing Interview Questions...',
  'Generating Learning Roadmap...',
  'Calculating Compatibility Score...',
  'Almost there...',
]

export default function LoadingSpinner() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length)
        setVisible(true)
      }, 300)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">

      <div className="relative flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-2 border-white/10" />
        <div className="animate-spin-slow absolute h-12 w-12 rounded-full border-2 border-transparent border-t-indigo-500" />
        <div className="absolute h-3 w-3 rounded-full bg-indigo-500 opacity-80" />
      </div>

      <div
        className="text-center transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <p className="text-sm font-medium text-zinc-300">
          {messages[index]}
        </p>
        <p className="mt-1 text-xs text-zinc-600">
          This usually takes 15–20 seconds
        </p>
      </div>

      <div className="flex gap-1.5">
        {messages.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === index
                ? 'w-4 bg-indigo-500'
                : 'w-1 bg-white/10'
            }`}
          />
        ))}
      </div>

    </div>
  )
}