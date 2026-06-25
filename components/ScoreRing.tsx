interface Props {
  score: number
  label: string
}

export default function ScoreRing({ score, label }: Props) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const filled = circumference * (score / 100)
  const empty = circumference - filled

  const scoreColor =
    score >= 80
      ? '#22C55E'
      : score >= 60
      ? '#F59E0B'
      : '#EF4444'

  const scoreBg =
    score >= 80
      ? 'rgba(34, 197, 94, 0.08)'
      : score >= 60
      ? 'rgba(245, 158, 11, 0.08)'
      : 'rgba(239, 68, 68, 0.08)'

  const scoreBorder =
    score >= 80
      ? 'rgba(34, 197, 94, 0.2)'
      : score >= 60
      ? 'rgba(245, 158, 11, 0.2)'
      : 'rgba(239, 68, 68, 0.2)'

  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl p-8 text-center"
      style={{
        background: scoreBg,
        border: `1px solid ${scoreBorder}`,
      }}
    >
      <p className="mb-4 text-sm font-medium text-zinc-400">
        Compatibility Score
      </p>

      <div className="relative flex items-center justify-center">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>

          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="10"
          />

          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={score >= 60 ? 'url(#scoreGradient)' : scoreColor}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${empty}`}
            strokeDashoffset={circumference * 0.25}
            style={{ transition: 'stroke-dasharray 1s ease' }}
          />
        </svg>

        <div className="absolute flex flex-col items-center">
          <span
            className="text-4xl font-bold"
            style={{ color: scoreColor }}
          >
            {score}%
          </span>
        </div>
      </div>

      <p
        className="mt-4 text-base font-semibold"
        style={{ color: scoreColor }}
      >
        {label}
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Based on resume vs job description match
      </p>
    </div>
  )
}