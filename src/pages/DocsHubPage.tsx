import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, ExternalLink, FileText, Github, Lock } from 'lucide-react'
import type { RepoCatalogItem } from '@/data/repoCatalog'
import { repoCatalog } from '@/data/repoCatalog'
import { paths } from '@/sitePaths'

function RepoDocCard({
  repo,
}: {
  repo: RepoCatalogItem
}) {
  const sitePath = repo.siteSlug != null ? `/${repo.siteSlug}` : null
  const meta = [repo.license, repo.language].filter(Boolean).join(' · ')

  return (
    <article className="flex flex-col border border-lime-950/12 bg-white p-6 shadow-[0_14px_40px_-28px_rgba(77,124,15,0.2)] hover:border-lime-500/40 transition-colors">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <h2 className="font-mono text-[15px] font-semibold text-neutral-950 leading-snug">
          {repo.name}
          {repo.sdkShort != null && <span className="font-normal text-neutral-500"> ({repo.sdkShort})</span>}
        </h2>
        <span className="text-[9px] font-mono uppercase tracking-[0.14em] text-lime-900 bg-lime-200/55 border border-lime-950/10 px-2 py-1">
          Public
        </span>
      </div>
      {meta && (
        <p className="text-[10px] font-mono text-neutral-400 mb-3">{meta}</p>
      )}
      <p className="text-sm text-neutral-600 leading-relaxed flex-1 mb-6">{repo.description}</p>
      <div className="flex flex-wrap gap-2 mt-auto pt-5 border-t border-lime-950/10">
        {repo.href != null && sitePath != null && (
          <>
            <Link
              to={sitePath}
              className="inline-flex flex-1 min-w-[140px] justify-center items-center gap-2 px-3 py-2.5 bg-lime-400 text-neutral-950 text-[10px] font-mono font-bold uppercase tracking-[0.12em] hover:bg-lime-300 transition-colors border border-neutral-950/15"
            >
              <BookOpen className="w-3.5 h-3.5" />
              {repo.name === 'agent-kernl' ? 'Guide' : 'Docs'}
            </Link>
            <a
              href={`${repo.href}#readme`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 min-w-[120px] justify-center items-center gap-2 px-3 py-2.5 border border-lime-950/22 text-neutral-800 text-[10px] font-mono uppercase tracking-[0.1em] hover:bg-lime-100/70 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              README
            </a>
          </>
        )}
        {repo.href != null && sitePath == null && (
          <a
            href={repo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 w-full justify-center items-center gap-2 px-3 py-2.5 bg-neutral-950 text-[#d9f99d] text-[10px] font-mono font-bold uppercase tracking-[0.12em] hover:bg-neutral-800 transition-colors"
          >
            <Github className="w-3.5 h-3.5 text-lime-300" />
            Repository & docs
          </a>
        )}
      </div>
    </article>
  )
}

function PrivateRoadmapRow({ repo }: { repo: RepoCatalogItem }) {
  return (
    <li className="flex flex-wrap items-start justify-between gap-4 px-5 py-4 border-b border-lime-950/10 last:border-b-0 bg-white/70">
      <div>
        <p className="font-mono text-sm font-medium text-neutral-800">{repo.name}</p>
        <p className="text-xs text-neutral-500 mt-1 max-w-xl">{repo.description}</p>
      </div>
      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.1em] text-neutral-400 flex-shrink-0">
        <Lock className="w-3 h-3" aria-hidden />
        Docs when open
      </span>
    </li>
  )
}

export default function DocsHubPage() {
  const publicRepos = repoCatalog.filter((r) => r.visibility === 'Public')
  const privateRepos = repoCatalog.filter((r) => r.visibility === 'Private')
  const onsiteDocsCount = publicRepos.filter((r) => r.siteSlug != null).length

  return (
    <div className="pt-[3.5rem] pb-28">
      <section className="relative overflow-hidden border-b border-lime-950/12 bg-gradient-to-b from-lime-200/35 via-lime-50 to-lime-50">
        <div className="absolute inset-0 pointer-events-none opacity-[0.35] bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(132,204,22,0.35),transparent)]" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16 md:py-24">
          <div>
            <p className="text-[11px] font-mono text-lime-900/75 uppercase tracking-[0.16em] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-600" aria-hidden />
              Cottus · documentation hub
            </p>
            <h1 className="font-display text-[2.125rem] sm:text-[2.65rem] font-medium text-neutral-950 tracking-[-0.03em] leading-[1.08] mb-6 text-balance max-w-3xl">
              Everything we publish, mapped in one place.
            </h1>
            <p className="text-base sm:text-[1.06rem] text-neutral-600 max-w-2xl leading-relaxed mb-10">
              Each public tree opens at a short URL —{' '}
              <span className="font-mono text-neutral-800">/akernl</span>,{' '}
              <span className="font-mono text-neutral-800">/argus</span>,{' '}
              <span className="font-mono text-neutral-800">/cottus-runtime</span> — matching how they appear from this
              hub. Deep README detail stays on GitHub alongside site overviews.
            </p>

            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 max-w-3xl">
              {[
                ['Public repos', String(publicRepos.length)],
                ['On-site docs URLs', String(onsiteDocsCount)],
                ['Private trees', String(privateRepos.length)],
                ['Org', 'cottus-ai'],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="border border-lime-950/14 bg-white/90 backdrop-blur-sm px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
                >
                  <dt className="text-[10px] font-mono uppercase tracking-[0.12em] text-neutral-400 mb-1">{k}</dt>
                  <dd className="font-display text-lg font-medium text-neutral-950">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="grid sm:grid-cols-3 gap-3 mb-10 max-w-4xl border border-lime-950/12 bg-white/80 p-5">
              <div className="flex gap-3 sm:border-r border-lime-950/12 sm:pr-4">
                <div className="mt-0.5 text-lime-700">
                  <BookOpen className="w-4 h-4" aria-hidden />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-neutral-500 mb-1">On this site</p>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Curated sections: quick start, execution model, architecture topic cards — plus more as we add them.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 sm:border-r border-lime-950/12 sm:pr-4">
                <div className="mt-0.5 text-lime-700">
                  <FileText className="w-4 h-4" aria-hidden />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-neutral-500 mb-1">
                    Repo default
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    README and issues remain the changelog for packages we have not ported yet.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-0.5 text-neutral-400">
                  <Lock className="w-4 h-4" aria-hidden />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-neutral-500 mb-1">Private</p>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    No handbook link until each tree lands on GitHub publicly.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/cottus-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-neutral-950 text-[#ecfccb] text-sm font-semibold hover:bg-neutral-800 transition-colors"
              >
                <Github className="w-4 h-4 text-lime-300" />
                GitHub organization
              </a>
              <Link
                to={paths.projects}
                className="inline-flex items-center gap-2 px-5 py-3 border border-lime-950/25 text-sm text-neutral-800 font-medium hover:border-neutral-950/40 hover:bg-white/60 transition-colors"
              >
                Projects catalog
                <ArrowRight className="w-4 h-4 opacity-80" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pt-16 md:pt-20 pb-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10 pb-6 border-b border-lime-950/12">
          <div>
            <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.14em] mb-2">
              Where to read
            </p>
            <h2 className="font-display text-xl md:text-2xl font-medium text-neutral-950 tracking-tight">
              Public repositories
            </h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-md leading-relaxed">
            Cards link to the same top-level paths as the hub copy (/akernl for the full guide, /argus and /cottus-runtime
            for repo landings) plus README on GitHub.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {publicRepos.map((repo) => (
            <RepoDocCard key={repo.name} repo={repo} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pt-14 pb-8">
        <div className="mb-8">
          <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.14em] mb-2">
            Pending public release
          </p>
          <h2 className="font-display text-xl md:text-2xl font-medium text-neutral-950 tracking-tight mb-3">
            Private work
          </h2>
          <p className="text-sm text-neutral-500 max-w-2xl leading-relaxed">
            These names match our internal trees. When they flip to public on GitHub, they will show up with README and
            issue links like the cards above.
          </p>
        </div>
        <ul className="border border-lime-950/12 border-b-0 bg-lime-100/30 overflow-hidden">
          {privateRepos.map((repo) => (
            <PrivateRoadmapRow key={repo.name} repo={repo} />
          ))}
        </ul>
      </section>
    </div>
  )
}
