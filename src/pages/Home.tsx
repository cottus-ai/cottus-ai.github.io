import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import RepoCatalogGrid from '@/components/projects/RepoCatalogGrid'
import { getPublicRepoCount, repoCatalog } from '@/data/repoCatalog'
import { paths } from '@/sitePaths'

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
}

/** Hero fleet panel: mono session + public repo lines */
type FleetRepoLine = {
  slug: string
  sdkShort?: string
  href: string
  lane: string
  hint: string
}

const fleetSurface: FleetRepoLine[] = [
  {
    slug: 'agent-kernl',
    sdkShort: 'akernl',
    href: 'https://github.com/cottus-ai/kernl',
    lane: 'EXEC',
    hint: '.krn bundles · sub-50ms boot · 0 deps',
  },
  {
    slug: 'cottus-runtime',
    href: 'https://github.com/cottus-ai/cottus-runtime',
    lane: 'INFER',
    hint: 'C++/CUDA · Llama-class · Py bindings',
  },
  {
    slug: 'argus',
    href: 'https://github.com/cottus-ai/argus',
    lane: 'TOOL',
    hint: 'Python · agent stack',
  },
]

const heroStats = [
  { k: 'Surface', v: `${repoCatalog.length} repos · ${getPublicRepoCount()} public` },
  { k: 'Languages', v: 'Python · C++' },
  { k: 'Licenses', v: 'MIT · Apache-2.0' },
] as const

const capabilityStripe = [
  'ISOLATED BUNDLES',
  'CUDA INFERENCE',
  'PYTHON TOOLING',
  'SOURCE-FIRST',
  'SELF-HOSTABLE',
] as const

export default function Home() {
  return (
    <div className="pt-[3.5rem]">
      <section className="relative border-b border-lime-950/12 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-20 md:py-28 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-start">
            {/* Left: editorial */}
            <div className="lg:col-span-7 flex flex-col">
              <motion.div
                className="mb-8 flex flex-col gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span className="inline-flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-[0.18em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-600" aria-hidden />
                  Open source · operating
                </span>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-[0.14em]">
                  Infrastructure · agents and models
                </span>
              </motion.div>

              <motion.h1
                className="font-display text-[2.5rem] sm:text-5xl lg:text-[3.25rem] font-medium text-neutral-950 tracking-[-0.035em] leading-[1.05] mb-6 text-balance"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                Systems code for agents and models.
                <br />
                <span className="text-neutral-500">
                  Public trees, plain licenses, no secret control plane.
                </span>
              </motion.h1>

              <motion.p
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 }}
                className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl mb-8 text-balance"
              >
                Cottus builds systems code you can read and run yourself. agent-kernl compiles agents into small
                isolated bundles you can boot in milliseconds. cottus-runtime runs Llama-class inference on a custom
                C++/CUDA engine with Python bindings. argus is supporting Python work on the same stack. All of it
                stays public under plain MIT and Apache-2.0 terms.
              </motion.p>

              {/* Capability ticker */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.14 }}
                className="mb-8 overflow-hidden border-y border-lime-950/12 py-3"
              >
                <div
                  aria-hidden="true"
                  className="flex w-max gap-8 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:w-full motion-safe:animate-[cottus-marquee_24s_linear_infinite]"
                >
                  {[0, 1].map((pass) =>
                    capabilityStripe.map((t) => (
                      <span key={`${pass}-${t}`}>{t}</span>
                    )),
                  )}
                </div>
                <span className="sr-only">
                  Focus areas include {capabilityStripe.join(', ')}.
                </span>
              </motion.div>

              <motion.div
                className="flex flex-wrap items-center gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16 }}
              >
                <Link
                  to={paths.projects}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-lime-400 text-neutral-950 text-sm font-semibold tracking-tight hover:bg-lime-300 transition-colors border border-neutral-950/15"
                >
                  Browse catalog
                  <ArrowRight className="w-4 h-4 opacity-80" />
                </Link>
                <a
                  href="https://github.com/cottus-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-lime-950/20 text-sm text-neutral-800 font-medium hover:border-neutral-900 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub org
                </a>
              </motion.div>

              <motion.ul
                className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-lime-950/12 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.22 }}
              >
                {heroStats.map((row) => (
                  <li key={row.k}>
                    <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-400 mb-1">
                      {row.k}
                    </p>
                    <p className="text-sm font-medium text-neutral-950">{row.v}</p>
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* Right: mono fleet panel */}
            <motion.div
              className="lg:col-span-5 lg:sticky lg:top-28"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              <div className="border border-lime-950/12 bg-white shadow-[0_24px_60px_-28px_rgba(77,124,15,0.14)]">
                <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-lime-950/12 bg-lime-100/55">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] font-mono text-neutral-500 truncate uppercase tracking-[0.12em]">
                      cottus-fleet · public
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.12em] text-lime-800 flex-shrink-0">
                    <span className="w-1 h-1 rounded-full bg-lime-500 animate-pulse" aria-hidden />
                    live
                  </span>
                </div>

                <div className="px-4 py-3 border-b border-lime-950/10 bg-white">
                  <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-[0.14em] mb-2">
                    tail -f /github.com/cottus-ai
                  </p>
                  <div className="space-y-0 divide-y divide-lime-950/10">
                    {fleetSurface.map((line) => {
                      const catalogRow = repoCatalog.find((r) => r.name === line.slug)
                      const rowClass =
                        'group flex items-start gap-3 py-3 first:pt-0 last:pb-0 hover:bg-lime-100/50 transition-colors -mx-2 px-2'
                      const body = (
                        <>
                          <span className="text-neutral-300 font-mono text-[11px] pt-0.5 select-none">▸</span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                              <span className="font-mono text-[12px] text-neutral-950 group-hover:underline underline-offset-2 decoration-lime-950/25">
                                {line.slug}
                                {line.sdkShort != null && (
                                  <span className="text-neutral-500 font-normal"> ({line.sdkShort})</span>
                                )}
                              </span>
                              <span className="font-mono text-[10px] px-1.5 py-0.5 border border-lime-950/12 text-neutral-600 uppercase tracking-wider">
                                {line.lane}
                              </span>
                            </div>
                            <p className="font-mono text-[10px] text-neutral-500 mt-1 leading-relaxed">{line.hint}</p>
                          </div>
                          {catalogRow?.siteSlug != null ? (
                            <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-neutral-900 flex-shrink-0 mt-1" />
                          ) : (
                            <ExternalLink className="w-3.5 h-3.5 text-neutral-300 group-hover:text-neutral-900 flex-shrink-0 mt-1" />
                          )}
                        </>
                      )
                      if (catalogRow?.siteSlug != null) {
                        return (
                          <Link key={line.slug} to={`/${catalogRow.siteSlug}`} className={rowClass}>
                            {body}
                          </Link>
                        )
                      }
                      return (
                        <a
                          key={line.slug}
                          href={line.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={rowClass}
                        >
                          {body}
                        </a>
                      )
                    })}
                  </div>
                </div>

                <div className="px-4 py-2.5 bg-lime-100/50 border-t border-lime-950/10 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.1em]">
                    next: projects page →
                  </span>
                  <Link
                    to={paths.projects}
                    className="text-[10px] font-mono text-neutral-950 uppercase tracking-[0.12em] hover:underline underline-offset-2"
                  >
                    full catalog →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <style>{`
          @keyframes cottus-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      <section id="projects" className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-20 md:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 pb-6 border-b border-lime-950/12">
          <div>
            <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.14em] mb-2">01 · Work</p>
            <h2 className="font-display text-2xl md:text-3xl font-medium text-neutral-950 tracking-tight">
              Projects
            </h2>
            <Link
              to={paths.projects}
              className="inline-flex items-center gap-1 mt-4 text-[11px] font-mono text-neutral-600 hover:text-neutral-950 uppercase tracking-[0.12em]"
            >
              Full projects page →
            </Link>
          </div>
          <p className="text-sm text-neutral-500 max-w-md leading-relaxed">
            Catalog for the{' '}
            <a
              href="https://github.com/cottus-ai"
              className="text-neutral-800 underline decoration-lime-950/25 underline-offset-2 hover:decoration-neutral-950"
            >
              cottus-ai
            </a>{' '}
            org. Public repos link out; private work is flagged as{' '}
            <span className="text-neutral-700">coming soon</span>.
          </p>
        </div>

        <RepoCatalogGrid repos={repoCatalog} />
      </section>

      <section className="border-t border-lime-950/12 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-4">
              <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.14em] mb-2">02 · Posture</p>
              <h2 className="font-display text-2xl font-medium text-neutral-950 tracking-tight">About</h2>
            </div>
            <div className="md:col-span-8 space-y-5 max-w-2xl">
              <p className="text-base text-neutral-700 leading-relaxed">
                Cottus is an infrastructure company: we build the software that runs agent workloads and model
                inference close to the metal: tight bundles for agent workloads, low-latency CUDA execution, and the
                Python surfaces that tie them into real products.
              </p>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Everything we ship is meant to be forked, benchmarked, and deployed on your hardware. If it is
                not on our public GitHub yet, it is not part of the story we ask you to trust.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
