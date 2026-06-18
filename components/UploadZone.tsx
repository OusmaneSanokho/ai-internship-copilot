'use client'

import { useRef, useState } from 'react'

interface Props {
  onFileSelected: (file: File) => void
}

export default function UploadZone({ onFileSelected }: Props) {
  const [fileName, setFileName] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File) {
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file only.')
      return
    }
    setFileName(file.name)
    onFileSelected(file)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave() {
    setIsDragging(false)
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`cursor-pointer border-2 border-dashed rounded-xl p-10 text-center transition-colors ${
        isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleChange}
      />

      {fileName ? (
        <div>
          <p className="text-green-600 font-medium text-lg">✓ {fileName}</p>
          <p className="text-gray-400 text-sm mt-1">Click to change file</p>
        </div>
      ) : (
        <div>
          <p className="text-gray-500 text-lg">Drag & drop your CV here</p>
          <p className="text-gray-400 text-sm mt-1">or click to browse</p>
          <p className="text-gray-300 text-xs mt-2">PDF files only</p>
        </div>
      )}
    </div>
  )
}