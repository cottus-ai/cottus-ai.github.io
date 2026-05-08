import { ExternalLink, Star, GitFork, Eye, CircleDot } from 'lucide-react'
import type { RepoCatalogItem } from '@/data/repoCatalog'

export default function RepoCatalogGrid({ repos }: { repos: RepoCatalogItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {repos.map((repo) => {
        const bodyClass =
          repo.href != null
            ? 'group flex flex-col border border-lime-950/12 bg-white p-7 hover:border-lime-500/55 transition-colors min-h-[260px]'
            : 'flex flex-col border border-dashed border-lime-950/22 bg-lime-50/40 p-7 min-h-[260px]'
        const inner = (
          <>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="min-w-0">
                <span className="font-mono text-base font-medium text-neutral-950 block">
                  <span className="truncate inline-block max-w-full align-bottom">
                    {repo.name}
                    {repo.sdkShort != null && (
                      <span className="text-neutral-500 font-normal"> ({repo.sdkShort})</span>
                    )}
                  </span>
                </span>
                {(repo.language != null || repo.license != null) && (
                  <span className="text-[10px] font-mono text-neutral-500 mt-1 block">
                    {[repo.language, repo.license].filter(Boolean).join(' · ')}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 uppercase tracking-wider flex-shrink-0 border ${
                  repo.visibility === 'Public'
                    ? 'text-neutral-600 border-lime-950/12 bg-white'
                    : 'text-neutral-500 border-lime-950/18 bg-white/70'
                }`}
              >
                {repo.visibility}
              </span>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed mb-6 flex-1">{repo.description}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono text-neutral-500 mb-5">
              <span className="inline-flex items-center gap-1" title="Stars">
                <Star className="w-3 h-3 opacity-65" aria-hidden />
                {repo.stats.stars}
              </span>
              <span className="inline-flex items-center gap-1" title="Forks">
                <GitFork className="w-3 h-3 opacity-65" aria-hidden />
                {repo.stats.forks}
              </span>
              <span className="inline-flex items-center gap-1" title="Watchers">
                <Eye className="w-3 h-3 opacity-65" aria-hidden />
                {repo.stats.watchers}
              </span>
              <span className="inline-flex items-center gap-1" title="Issues">
                <CircleDot className="w-3 h-3 opacity-65" aria-hidden />
                {repo.stats.issues}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mt-auto pt-4 border-t border-lime-950/10">
              <span className="text-neutral-400">{repo.updated || 'Updated recently'}</span>
              {repo.href != null ? (
                <span className="inline-flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" aria-hidden />
                  <span className="group-hover:text-neutral-950 transition-colors">GitHub</span>
                  <span className="text-neutral-400 group-hover:text-neutral-950 transition-colors">→</span>
                </span>
              ) : (
                <span className="text-neutral-400">Not listed publicly</span>
              )}
            </div>
          </>
        )

        return repo.href != null ? (
          <a key={repo.name} href={repo.href} target="_blank" rel="noopener noreferrer" className={bodyClass}>
            {inner}
          </a>
        ) : (
          <div key={repo.name} className={bodyClass}>
            {inner}
          </div>
        )
      })}
    </div>
  )
}
