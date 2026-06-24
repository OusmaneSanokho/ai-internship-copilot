export default function Hero({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 text-center">

      <div className="glow-blob animate-pulse-glow h-96 w-96 bg-indigo-600 -top-20 left-1/4" />
      <div className="glow-blob animate-pulse-glow h-80 w-80 bg-violet-700 top-10 right-1/4" />

      <div className="dot-grid absolute inset-0 opacity-40" />

      <div className="relative z-10 flex flex-col items-center">

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-400">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Powered by Claude Sonnet 4.6
        </div>

        <h1 className="mx-auto max-w-3xl text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
          Land Internships{' '}
          <span className="gradient-text">Smarter</span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base text-zinc-400 md:text-lg">
          AI-powered resume analysis, skill gap detection,
          interview preparation, and personalized learning paths.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <button
            onClick={onGetStarted}
            className="gradient-button rounded-xl px-8 py-3.5 text-base font-semibold"
          >
            Analyze My Resume
          </button>
          <button
            onClick={onGetStarted}
            className="rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-base font-semibold text-zinc-300 transition-all hover:bg-white/10 hover:border-white/20"
          >
            View Demo
          </button>
        </div>

      </div>
    </section>
  )
}