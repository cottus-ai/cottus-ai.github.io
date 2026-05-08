import { Link, Navigate } from 'react-router-dom'
import { ArrowRight, Github } from 'lucide-react'
import { repoCatalog } from '@/data/repoCatalog'
import { paths } from '@/sitePaths'

/** Hub landing for public repos that use top-level URLs (`/argus`, `/cottus-runtime`). agent-kernl uses `/akernl` + `AkernlPage`. */
export default function RepoDocLandingPage({ repoSlug }: { repoSlug: string }) {
  const repo = repoCatalog.find((r) => r.siteSlug === repoSlug)
  if (!repo?.href || repo.name === 'agent-kernl') {
    return <Navigate to={paths.docs} replace />
  }

  const meta = [repo.license, repo.language].filter(Boolean).join(' · ')

  return (
    <div className="pt-[3.5rem] pb-24">
      <section className="border-b border-lime-950/12 bg-gradient-to-b from-lime-200/35 via-lime-50 to-lime-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-14 md:py-20">
          <p className="text-[11px] font-mono text-lime-900/75 uppercase tracking-[0.14em] mb-3">
            {repo.name} · public
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-neutral-950 tracking-tight mb-4">
            {repo.name}
          </h1>
          {meta ? <p className="text-[11px] font-mono text-neutral-500 mb-6">{meta}</p> : null}
          <p className="text-base text-neutral-600 max-w-2xl leading-relaxed mb-8">{repo.description}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-neutral-950 text-[#ecfccb] text-sm font-semibold hover:bg-neutral-800 transition-colors"
            >
              <Github className="w-4 h-4 text-lime-300" />
              Repository & README
            </a>
            <Link
              to={paths.docs}
              className="inline-flex items-center gap-2 px-5 py-3 border border-lime-950/25 text-sm text-neutral-800 font-medium hover:border-neutral-950/40 hover:bg-white/60 transition-colors"
            >
              Documentation hub
              <ArrowRight className="w-4 h-4 opacity-80" />
            </Link>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-12">
        <p className="text-sm text-neutral-600 leading-relaxed max-w-2xl">
          Install notes, APIs, and changelog live on GitHub today; follow the repository link above. This URL mirrors how
          other public trees are linked from the docs hub—same pattern as{' '}
          <Link to={paths.agentKernl} className="text-neutral-900 underline decoration-lime-950/25 underline-offset-2">
            /akernl
          </Link>{' '}
          for agent-kernl.
        </p>
      </section>
    </div>
  )
}
