interface Props {
  analysis: string
}

export default function ResultsPanel({ analysis }: Props) {
  const sections = {
    strengths: '',
    weaknesses: '',
    missingSkills: '',
    roadmap: '',
  }

  const strengthsMatch = analysis.match(
    /STRENGTHS:([\s\S]*?)(?=WEAKNESSES:|$)/i
  )
  const weaknessesMatch = analysis.match(
    /WEAKNESSES:([\s\S]*?)(?=MISSING SKILLS:|$)/i
  )
  const missingMatch = analysis.match(
    /MISSING SKILLS:([\s\S]*?)(?=LEARNING ROADMAP:|$)/i
  )
  const roadmapMatch = analysis.match(/LEARNING ROADMAP:([\s\S]*?)$/i)

  sections.strengths = strengthsMatch ? strengthsMatch[1].trim() : ''
  sections.weaknesses = weaknessesMatch ? weaknessesMatch[1].trim() : ''
  sections.missingSkills = missingMatch ? missingMatch[1].trim() : ''
  sections.roadmap = roadmapMatch ? roadmapMatch[1].trim() : ''

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Your CV Analysis</h2>

      <div className="rounded-xl border border-green-200 bg-green-50 p-6">
        <h3 className="mb-3 text-lg font-semibold text-green-700">
          ✅ Strengths
        </h3>
        <pre className="whitespace-pre-wrap font-sans text-sm text-green-800">
          {sections.strengths || 'No strengths found.'}
        </pre>
      </div>

      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h3 className="mb-3 text-lg font-semibold text-red-700">
          ❌ Weaknesses
        </h3>
        <pre className="whitespace-pre-wrap font-sans text-sm text-red-800">
          {sections.weaknesses || 'No weaknesses found.'}
        </pre>
      </div>

      <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
        <h3 className="mb-3 text-lg font-semibold text-yellow-700">
          ⚠️ Missing Skills
        </h3>
        <pre className="whitespace-pre-wrap font-sans text-sm text-yellow-800">
          {sections.missingSkills || 'No missing skills found.'}
        </pre>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
        <h3 className="mb-3 text-lg font-semibold text-blue-700">
          🗺️ Learning Roadmap
        </h3>
        <pre className="whitespace-pre-wrap font-sans text-sm text-blue-800">
          {sections.roadmap || 'No roadmap found.'}
        </pre>
      </div>
    </div>
  )
}