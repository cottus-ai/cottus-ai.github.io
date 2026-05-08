import { Github, BookOpen, Layers } from 'lucide-react'
import { motion } from 'framer-motion'

const HERO_METRICS = [
  { label: 'Bundle target', value: '~3 KB', hint: '.krn-class images' },
  { label: 'Boot target', value: 'Sub-50 ms', hint: 'warm-pool path' },
  { label: 'Guest deps', value: 'Zero', hint: 'host-owned runtime' },
] as const

export default function AkernlHero() {
  return (
    <section className="relative border-b border-lime-950/12 overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        aria-hidden
      >
        <div className="absolute -top-24 left-1/2 h-[28rem] w-[min(56rem,100vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_75%_55%_at_50%_-10%,rgba(132,204,22,0.28),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-950/15 to-transparent" />
      </div>
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-20 md:py-28">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.04 }}
          >
            <p className="inline-flex items-center gap-2 text-[11px] font-mono text-neutral-500 uppercase tracking-[0.16em] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-600" />
              Runtime infrastructure
            </p>
          </motion.div>

          <motion.h1
            className="font-display text-[2.5rem] sm:text-5xl md:text-[3.25rem] font-medium text-neutral-950 tracking-[-0.03em] leading-[1.08] mb-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
          >
            agent-kernl <span className="text-neutral-500">(akernl)</span>
          </motion.h1>

          <motion.p
            className="text-[13px] font-mono text-neutral-500 mb-5 tracking-tight"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.07 }}
          >
            Agent runtime · imports <span className="text-neutral-700">akernl</span> · repo{' '}
            <a
              href="https://github.com/cottus-ai/kernl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-800 underline decoration-lime-950/25 underline-offset-2 hover:text-neutral-950 hover:decoration-neutral-950"
            >
              cottus-ai/kernl
            </a>
          </motion.p>

          <motion.p
            className="text-lg text-neutral-700 leading-relaxed mb-3 text-balance"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            Firecracker microVM runtime infrastructure for AI agent execution.
          </motion.p>

          <motion.p
            className="text-sm text-neutral-500 leading-relaxed mb-8 text-balance max-w-2xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.13 }}
          >
            Self hosted sandbox orchestration, execution isolation, filesystem management, and runtime lifecycle
            infrastructure for programmable AI systems.
          </motion.p>

          <motion.dl
            className="mb-4 grid w-full max-w-2xl grid-cols-3 gap-2 sm:gap-3 mx-auto border border-lime-950/12 bg-lime-100/35 px-3 py-4 sm:px-5 sm:py-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.145 }}
          >
            {HERO_METRICS.map((m) => (
              <div key={m.label} className="text-center px-0.5">
                <dt className="text-[9px] font-mono uppercase tracking-[0.12em] text-neutral-500 mb-1 leading-tight">
                  {m.label}
                </dt>
                <dd className="space-y-1">
                  <span className="block font-display text-lg sm:text-xl font-medium text-neutral-950 tracking-tight">
                    {m.value}
                  </span>
                  <span className="hidden sm:block text-[9px] font-mono text-neutral-400 leading-snug">{m.hint}</span>
                </dd>
              </div>
            ))}
          </motion.dl>
          <p className="text-[10px] font-mono text-neutral-400 mb-10 max-w-xl mx-auto text-center">
            Design targets from the product brief — verify against README for your revision and hardware.
          </p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
          >
            <a
              href="https://github.com/cottus-ai/kernl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-lime-400 text-neutral-950 text-sm font-semibold hover:bg-lime-300 transition-colors border border-neutral-950/15"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="#docs"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-lime-950/22 text-sm text-neutral-900 font-medium hover:border-neutral-950 hover:bg-lime-50/80 transition-colors shadow-[0_1px_0_rgba(0,0,0,0.04)]"
            >
              <BookOpen className="w-4 h-4" />
              Documentation
            </a>
            <a
              href="#architecture"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-lime-950/20 text-sm text-neutral-800 font-medium hover:border-neutral-900 hover:bg-white/70 transition-colors"
            >
              <Layers className="w-4 h-4" />
              Architecture
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
