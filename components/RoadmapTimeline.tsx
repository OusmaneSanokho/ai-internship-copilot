interface Week {
  week: string
  title: string
  tasks: string[]
}

interface Props {
  weeks: Week[]
}

export default function RoadmapTimeline({ weeks }: Props) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: 'var(--card-indigo)',
        border: '1px solid var(--border-indigo)',
      }}
    >
      <div className="mb-6 flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl text-lg"
          style={{ background: 'rgba(99, 102, 241, 0.15)' }}
        >
          🗺️
        </div>
        <h3 className="text-sm font-semibold text-indigo-400">
          Personalized Learning Roadmap
        </h3>
      </div>

      <div className="relative">
        <div className="absolute left-[18px] top-2 bottom-2 timeline-line" />

        <div className="space-y-8">
          {weeks.map((week, i) => (
            <div key={i} className="relative flex gap-6">

              <div className="relative z-10 flex flex-col items-center">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold"
                  style={{
                    background: 'var(--background)',
                    borderColor: '#6366F1',
                    color: '#6366F1',
                  }}
                >
                  {i + 1}
                </div>
              </div>

              <div className="flex-1 pb-2">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xs font-medium text-indigo-400">
                    {week.week}
                  </span>
                </div>
                <h4 className="mb-3 text-sm font-semibold text-zinc-200">
                  {week.title}
                </h4>

                <ul className="space-y-2">
                  {week.tasks.map((task, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/60" />
                      <p className="text-sm leading-relaxed text-zinc-400">
                        {task.replace(/^[-•*]\s*/, '')}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </div>

      {weeks.length === 0 && (
        <p className="text-sm text-zinc-600">No roadmap generated.</p>
      )}
    </div>
  )
}