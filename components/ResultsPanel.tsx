import ScoreRing from '@/components/ScoreRing'
import ResultCard from '@/components/ResultCard'
import RoadmapTimeline from '@/components/RoadmapTimeline'

interface Props {
  analysis: string
}

function extractSection(text: string, label: string, nextLabel?: string): string {
  const pattern = nextLabel
    ? new RegExp(`${label}:[\\s\\S]*?(?=${nextLabel}:|$)`, 'i')
    : new RegExp(`${label}:[\\s\\S]*?$`, 'i')
  const match = text.match(pattern)
  return match ? match[0].replace(new RegExp(`^${label}:`, 'i'), '').trim() : ''
}

function extractLines(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.replace(/^[-•*\d.]\s*/, '').trim())
    .filter((line) => line.length > 10)
}

function extractScore(text: string): number {
  const match = text.match(/COMPATIBILITY SCORE[:\s]*(\d+)/i)
  return match ? Math.min(100, Math.max(0, parseInt(match[1]))) : 0
}

function getScoreLabel(score: number): string {
  if (score >= 85) return 'Excellent Match'
  if (score >= 70) return 'Strong Match'
  if (score >= 55) return 'Good Match'
  if (score >= 40) return 'Partial Match'
  return 'Low Match'
}

function extractWeeks(text: string): { week: string; title: string; tasks: string[] }[] {
  const weeks = []

  for (let i = 1; i <= 4; i++) {
    const pattern = new RegExp(
      `WEEK\\s*${i}[:\\s]*([^\\n]*)([\\s\\S]*?)(?=WEEK\\s*${i + 1}|$)`,
      'i'
    )
    const match = text.match(pattern)
    if (match) {
      const title = match[1].trim()
      const body = match[2]
      const tasks = body
        .split('\n')
        .map((l) => l.replace(/^[-•*\d.]\s*/, '').trim())
        .filter((l) => l.length > 5)
      weeks.push({ week: `Week ${i}`, title: title || `Week ${i}`, tasks })
    }
  }

  return weeks
}

export default function ResultsPanel({ analysis }: Props) {
  const score = extractScore(analysis)
  const scoreLabel = getScoreLabel(score)

  const strengthsRaw = extractSection(analysis, 'STRENGTHS', 'WEAKNESSES')
  const weaknessesRaw = extractSection(analysis, 'WEAKNESSES', 'MISSING SKILLS')
  const missingRaw = extractSection(analysis, 'MISSING SKILLS', 'RECOMMENDED CERTIFICATIONS')
  const certificationsRaw = extractSection(analysis, 'RECOMMENDED CERTIFICATIONS', 'SUGGESTED PORTFOLIO PROJECTS')
  const projectsRaw = extractSection(analysis, 'SUGGESTED PORTFOLIO PROJECTS', 'INTERVIEW QUESTIONS')
  const interviewRaw = extractSection(analysis, 'INTERVIEW QUESTIONS', 'LEARNING ROADMAP')
  const roadmapRaw = extractSection(analysis, 'LEARNING ROADMAP')

  const strengths = extractLines(strengthsRaw)
  const weaknesses = extractLines(weaknessesRaw)
  const missing = extractLines(missingRaw)
  const certifications = extractLines(certificationsRaw)
  const projects = extractLines(projectsRaw)
  const interview = extractLines(interviewRaw)
  const weeks = extractWeeks(roadmapRaw)

  return (
    <div className="mt-8 space-y-6">

      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Your Analysis</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Powered by Claude Sonnet 4.6
        </p>
      </div>

      {score > 0 && (
        <ScoreRing score={score} label={scoreLabel} />
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ResultCard
          title="Strengths"
          icon="✅"
          items={strengths}
          colorScheme="green"
        />
        <ResultCard
          title="Weaknesses"
          icon="⚠️"
          items={weaknesses}
          colorScheme="red"
        />
        <ResultCard
          title="Missing Skills"
          icon="🎯"
          items={missing}
          colorScheme="yellow"
        />
        <ResultCard
          title="Recommended Certifications"
          icon="🏆"
          items={certifications}
          colorScheme="purple"
        />
        <ResultCard
          title="Suggested Portfolio Projects"
          icon="💼"
          items={projects}
          colorScheme="orange"
        />
        <ResultCard
          title="Interview Questions"
          icon="💬"
          items={interview}
          colorScheme="blue"
        />
      </div>

      {weeks.length > 0 && (
        <RoadmapTimeline weeks={weeks} />
      )}

      <div className="flex justify-center pt-4">
        <button
          onClick={() => window.location.reload()}
          className="rounded-xl border border-white/10 bg-white/5 px-8 py-3 text-sm font-medium text-zinc-300 transition-all hover:bg-white/10 hover:border-white/20"
        >
          Analyze Another CV
        </button>
      </div>

    </div>
  )
}