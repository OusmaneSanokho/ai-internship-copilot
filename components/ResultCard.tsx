interface Props {
  title: string
  icon: string
  items: string[]
  colorScheme: 'green' | 'red' | 'yellow' | 'purple' | 'blue' | 'orange'
}

const colorMap = {
  green: {
    bg: 'var(--card-green)',
    border: 'var(--border-green)',
    accent: '#22C55E',
    badge: 'rgba(34, 197, 94, 0.15)',
  },
  red: {
    bg: 'var(--card-red)',
    border: 'var(--border-red)',
    accent: '#EF4444',
    badge: 'rgba(239, 68, 68, 0.15)',
  },
  yellow: {
    bg: 'var(--card-yellow)',
    border: 'var(--border-yellow)',
    accent: '#F59E0B',
    badge: 'rgba(245, 158, 11, 0.15)',
  },
  purple: {
    bg: 'var(--card-purple)',
    border: 'var(--border-purple)',
    accent: '#8B5CF6',
    badge: 'rgba(139, 92, 246, 0.15)',
  },
  blue: {
    bg: 'var(--card-blue)',
    border: 'var(--border-blue)',
    accent: '#3B82F6',
    badge: 'rgba(59, 130, 246, 0.15)',
  },
  orange: {
    bg: 'var(--card-orange)',
    border: 'var(--border-orange)',
    accent: '#F97316',
    badge: 'rgba(249, 115, 22, 0.15)',
  },
}

export default function ResultCard({ title, icon, items, colorScheme }: Props) {
  const colors = colorMap[colorScheme]

  return (
    <div
      className="result-card rounded-2xl p-6"
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
      }}
    >
      <div className="mb-4 flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl text-lg"
          style={{ background: colors.badge }}
        >
          {icon}
        </div>
        <h3
          className="text-sm font-semibold"
          style={{ color: colors.accent }}
        >
          {title}
        </h3>
      </div>

      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: colors.accent }}
            />
            <p className="text-sm leading-relaxed text-zinc-300">
              {item.replace(/^[-•*]\s*/, '')}
            </p>
          </li>
        ))}
      </ul>

      {items.length === 0 && (
        <p className="text-sm text-zinc-600">No items found.</p>
      )}
    </div>
  )
}