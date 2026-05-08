export type RepoCatalogItem = {
  name: string
  /** Top-level site URL `cottus-ai.github.io/<slug>` when set (e.g. `akernl` → `/akernl`). */
  siteSlug?: string
  sdkShort?: string
  visibility: 'Public' | 'Private'
  href: string | null
  language: string | null
  license: string | null
  description: string
  stats: { stars: number; forks: number; watchers: number; issues: number }
  updated: string
}

export const repoCatalog: RepoCatalogItem[] = [
  {
    name: 'agent-kernl',
    siteSlug: 'akernl',
    sdkShort: 'akernl',
    visibility: 'Public',
    href: 'https://github.com/cottus-ai/kernl',
    language: 'Python',
    license: 'MIT License',
    description:
      'Compile AI agents into isolated bundles: ~3 KB images, sub-50ms boot, zero runtime deps. Imports as akernl.',
    stats: { stars: 0, forks: 0, watchers: 0, issues: 0 },
    updated: 'Updated 1 hour ago',
  },
  {
    name: 'cottus',
    visibility: 'Private',
    href: null,
    language: null,
    license: null,
    description: 'Coming soon · building in private.',
    stats: { stars: 0, forks: 0, watchers: 0, issues: 0 },
    updated: 'Updated last month',
  },
  {
    name: 'argus',
    siteSlug: 'argus',
    visibility: 'Public',
    href: 'https://github.com/cottus-ai/argus',
    language: 'Python',
    license: 'Apache License 2.0',
    description: 'Python on the agent stack. See GitHub for current scope and layout.',
    stats: { stars: 1, forks: 0, watchers: 5, issues: 0 },
    updated: 'Updated on Mar 27',
  },
  {
    name: 'barecott',
    visibility: 'Private',
    href: null,
    language: null,
    license: null,
    description: 'Coming soon · minimal runtime paths for agents.',
    stats: { stars: 1, forks: 0, watchers: 0, issues: 0 },
    updated: 'Updated on Mar 4',
  },
  {
    name: 'cottus-runtime',
    siteSlug: 'cottus-runtime',
    visibility: 'Public',
    href: 'https://github.com/cottus-ai/cottus-runtime',
    language: 'C++',
    license: 'Apache License 2.0',
    description:
      'Custom C++/CUDA inference engine with Python bindings: Llama-class models, KV cache, CUDA kernels.',
    stats: { stars: 0, forks: 0, watchers: 0, issues: 0 },
    updated: '',
  },
]

export function getPublicRepoCount(): number {
  return repoCatalog.filter((r) => r.visibility === 'Public').length
}
