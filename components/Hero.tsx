export default function Hero({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div className="glow-blob animate-pulse-glow h-72 w-72 bg-indigo-600 -top-10 -left-10" />
      <div className="glow-blob animate-pulse-glow h-72 w-72 bg-cyan-500 top-20 right-0" />

      <div className="relative z-10">
        <span className="mb-6 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300">
          ✨ Powered by Claude AI
        </span>

        <h1 className="mx-auto max-w-3xl text-5xl font-bold leading-tight text-white md:text-6xl">
          Land Your Next{' '}
          <span className="gradient-text">Internship</span> Smarter
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-400">
          Upload your resume and compare it against any internship description.
          Receive instant feedback, missing skills analysis, interview questions
          and a personalized roadmap.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={onGetStarted}
            className="gradient-button rounded-xl px-8 py-3.5 text-base font-semibold text-white"
          >
            Analyze My Resume
          </button>
          <button
            onClick={onGetStarted}
            className="rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10"
          >
            View Demo
          </button>
        </div>
      </div>
    </section>
  )
}