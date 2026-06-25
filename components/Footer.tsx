export default function Footer() {
  return (
    <footer className="border-t border-white/6 px-4 py-8">
      <div className="mx-auto max-w-2xl flex flex-col items-center gap-2 text-center">

        <p className="text-sm font-medium text-zinc-400">
          AI Internship Copilot
        </p>

        <p className="text-xs text-zinc-600">
          Built with Next.js • Claude API • Vercel
        </p>

        <p className="text-xs text-zinc-700">
          © 2026
        </p>

      </div>
    </footer>
  )
}