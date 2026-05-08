import { Link } from 'react-router-dom'
import { paths } from '@/sitePaths'
import { ArrowUpRight, Layers, Terminal, BookOpen } from 'lucide-react'

const KERNL_REPO = 'https://github.com/cottus-ai/kernl'

const toc = [
  { id: 'docs-overview', label: 'Overview' },
  { id: 'docs-quickstart', label: 'Quick start' },
  { id: 'docs-runtime', label: 'Execution model' },
  { id: 'docs-concepts', label: 'Architecture topics' },
] as const

interface Token {
  text: string
  type: 'keyword' | 'string' | 'comment' | 'function' | 'punctuation' | 'plain' | 'prompt'
}

function tokenizePython(code: string): Token[][] {
  const keywords = [
    'from',
    'import',
    'def',
    'class',
    'return',
    'print',
    'if',
    'else',
    'for',
    'in',
    'with',
    'as',
  ]
  const lines = code.split('\n')
  return lines.map((line) => {
    const tokens: Token[] = []
    let remaining = line

    if (remaining.startsWith('#')) {
      tokens.push({ text: remaining, type: 'comment' })
      return tokens
    }

    while (remaining.length > 0) {
      const strMatch = remaining.match(/^("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"]*"|'[^']*')/)
      if (strMatch) {
        tokens.push({ text: strMatch[0], type: 'string' })
        remaining = remaining.slice(strMatch[0].length)
        continue
      }
      const kwMatch = remaining.match(new RegExp(`^(${keywords.join('|')})(?=\\W|$)`))
      if (kwMatch) {
        tokens.push({ text: kwMatch[0], type: 'keyword' })
        remaining = remaining.slice(kwMatch[0].length)
        continue
      }
      const fnMatch = remaining.match(/^([a-zA-Z_]\w*)\s*(?=\()/)
      if (fnMatch) {
        tokens.push({ text: fnMatch[0], type: 'function' })
        remaining = remaining.slice(fnMatch[0].length)
        continue
      }
      tokens.push({ text: remaining[0], type: 'plain' })
      remaining = remaining.slice(1)
    }
    return tokens
  })
}

function tokenizeTS(code: string): Token[][] {
  const keywords = [
    'import',
    'from',
    'const',
    'let',
    'await',
    'new',
    'async',
    'return',
    'interface',
    'type',
    'export',
  ]
  const lines = code.split('\n')
  return lines.map((line) => {
    const tokens: Token[] = []
    let remaining = line

    if (remaining.trimStart().startsWith('//')) {
      tokens.push({ text: remaining, type: 'comment' })
      return tokens
    }

    while (remaining.length > 0) {
      const strMatch = remaining.match(/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/)
      if (strMatch) {
        tokens.push({ text: strMatch[0], type: 'string' })
        remaining = remaining.slice(strMatch[0].length)
        continue
      }
      const kwMatch = remaining.match(new RegExp(`^(${keywords.join('|')})(?=\\W|$)`))
      if (kwMatch) {
        tokens.push({ text: kwMatch[0], type: 'keyword' })
        remaining = remaining.slice(kwMatch[0].length)
        continue
      }
      const fnMatch = remaining.match(/^([a-zA-Z_]\w*)\s*(?=\()/)
      if (fnMatch) {
        tokens.push({ text: fnMatch[0], type: 'function' })
        remaining = remaining.slice(fnMatch[0].length)
        continue
      }
      tokens.push({ text: remaining[0], type: 'plain' })
      remaining = remaining.slice(1)
    }
    return tokens
  })
}

/** High-contrast palette for dark code panels (`bg-[#131313]`); avoid dark Tailwind text-* on dark fills. */
const TOKEN_CLASSES: Record<Token['type'], string> = {
  keyword: 'text-lime-300',
  string: 'text-amber-300',
  comment: 'text-neutral-500 italic',
  function: 'text-violet-300',
  punctuation: 'text-neutral-400',
  plain: 'text-neutral-200',
  prompt: 'text-neutral-500 select-none',
}

function HighlightedCode({
  code,
  lang,
}: {
  code: string
  lang: 'python' | 'typescript'
}) {
  const lines = lang === 'python' ? tokenizePython(code) : tokenizeTS(code)
  return (
    <pre className="text-[13px] font-mono leading-[1.65] overflow-x-auto">
      {lines.map((lineTokens, li) => (
        <div key={li} className="flex">
          <span className="select-none w-8 shrink-0 text-right pr-4 text-neutral-500 text-[11px] tabular-nums">
            {li + 1}
          </span>
          <span className="min-w-0">
            {lineTokens.map((tok, ti) => (
              <span key={ti} className={TOKEN_CLASSES[tok.type]}>
                {tok.text}
              </span>
            ))}
          </span>
        </div>
      ))}
    </pre>
  )
}

const pythonCode = `from akernl import Sandbox

sandbox = Sandbox()

result = sandbox.execute(
    language="python",
    code="print('hello world')"
)

print(result.stdout)`

const tsCode = `import { Sandbox } from "akernl"

const sandbox = new Sandbox()

const result = await sandbox.execute({
  language: "typescript",
  code: "console.log('hello world')"
})

console.log(result.stdout)`

function CodePanel({
  lang,
  code,
  label,
}: {
  lang: 'python' | 'typescript'
  code: string
  label: string
}) {
  return (
    <div className="flex flex-col rounded-[2px] border border-lime-950/12 bg-neutral-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] overflow-hidden ring-1 ring-black/5">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-700/50 bg-neutral-900/95">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-400/85" aria-hidden />
          <span className="w-2 h-2 rounded-full bg-amber-300/85" aria-hidden />
          <span className="w-2 h-2 rounded-full bg-lime-400/85" aria-hidden />
        </div>
        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-[0.14em]">{label}</span>
      </div>
      <div className="p-5 bg-[#131313] text-neutral-100">
        <HighlightedCode code={code} lang={lang} />
      </div>
    </div>
  )
}

type DocTopic = {
  index: string
  title: string
  pillar: string
  summary: string
  tags: string[]
}

const docTopics: DocTopic[] = [
  {
    index: '01',
    title: 'Firecracker vs Docker',
    pillar: 'Isolation',
    summary:
      'MicroVM vs container tradeoffs for untrusted agent payloads: isolation strength, startup time, ops complexity, where each fits.',
    tags: ['microvm', 'containers'],
  },
  {
    index: '02',
    title: 'VM pooling & snapshots',
    pillar: 'Runtime',
    summary:
      'Pooling, snapshot/restore, eviction, and sizing memory so callers see stable low latency without exploding resident set.',
    tags: ['cold-start', 'pooling'],
  },
  {
    index: '03',
    title: 'Sandbox scheduling',
    pillar: 'Orchestration',
    summary:
      'Short-lived jobs across queues and reservations — fairness hints, quotas, noisy-neighbor avoidance on shared hosts.',
    tags: ['queues', 'resources'],
  },
  {
    index: '04',
    title: 'Isolation boundaries',
    pillar: 'Security',
    summary:
      'Filesystem, namespaces, syscall policy, egress: what callers can assume breaks first and how failures surface cleanly.',
    tags: ['syscall', 'egress'],
  },
  {
    index: '05',
    title: 'Networking in microVMs',
    pillar: 'Networking',
    summary:
      'Tap/virtio paths, egress allowlists, deny-by-default patterns, observable agent outbound without silent bypass.',
    tags: ['virtio', 'policy'],
  },
  {
    index: '06',
    title: 'Multi-node execution',
    pillar: 'Distribution',
    summary:
      'Stretching orchestration fleet-wide — placement hints, retries, what stays logically centralized versus per-node.',
    tags: ['placement', 'retries'],
  },
]

function PillarVisual({ pillar }: { pillar: string }) {
  const hues: Record<string, string> = {
    Isolation: 'bg-lime-500',
    Runtime: 'bg-emerald-500',
    Orchestration: 'bg-teal-500',
    Security: 'bg-amber-500',
    Networking: 'bg-sky-500',
    Distribution: 'bg-violet-500',
  }
  const c = hues[pillar] ?? 'bg-lime-600'
  return <span className={`inline-block w-1 self-stretch min-h-[4rem] rounded-full ${c} opacity-85`} aria-hidden />
}

function DocConceptCard({ topic }: { topic: DocTopic }) {
  return (
    <a
      href={KERNL_REPO}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 p-5 border border-lime-950/12 bg-white hover:border-lime-400/65 hover:bg-lime-50/40 transition-colors shadow-[0_12px_32px_-24px_rgba(65,104,28,0.35)] min-h-[9.5rem]"
    >
      <PillarVisual pillar={topic.pillar} />
      <div className="min-w-0 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <span className="text-[10px] font-mono text-neutral-400 tabular-nums">{topic.index}</span>
            <h3 className="font-display text-base font-medium text-neutral-950 mt-0.5 leading-snug group-hover:text-lime-950 transition-colors">
              {topic.title}
            </h3>
          </div>
          <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-lime-800 flex-shrink-0 mt-0.5 transition-colors" />
        </div>
        <span className="inline-block text-[9px] font-mono uppercase tracking-[0.14em] text-lime-900/85 mb-2 w-fit">
          {topic.pillar}
        </span>
        <p className="text-xs text-neutral-600 leading-relaxed flex-1 mb-3">{topic.summary}</p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {topic.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-mono text-neutral-500 bg-lime-100/55 border border-lime-950/10 px-1.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}

function TocNav({ className = '' }: { className?: string }) {
  return (
    <nav aria-label="On this page" className={className}>
      <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-[0.14em] mb-3">On this page</p>
      <ul className="space-y-2 border-l border-lime-950/18 pl-4">
        {toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-[11px] font-mono text-neutral-500 hover:text-neutral-950 transition-colors block py-0.5 -translate-x-[1px]"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <Link
        to={paths.docs}
        className="mt-6 inline-flex items-center gap-2 text-[11px] font-mono text-neutral-600 hover:text-neutral-950 border border-transparent hover:border-lime-950/18 px-2 py-1.5 -ml-2 transition-colors"
      >
        <BookOpen className="w-3.5 h-3.5" />
        Org doc hub
      </Link>
      <a
        href={`${KERNL_REPO}#readme`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 block text-[11px] font-mono text-neutral-500 hover:text-neutral-950 underline decoration-lime-950/25 underline-offset-2"
      >
        README on GitHub →
      </a>
    </nav>
  )
}

export default function DocsPreview() {
  return (
    <section
      id="docs"
      className="relative scroll-mt-28 border-b border-lime-950/12 bg-gradient-to-b from-white via-lime-50/35 to-white"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16 md:py-28">
        <header className="mb-14 md:mb-16 lg:grid lg:grid-cols-12 lg:gap-10 items-start">
          <div className="lg:col-span-12 mb-10">
            <p className="text-[11px] font-mono text-lime-800/85 uppercase tracking-[0.14em] mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 opacity-80" aria-hidden />
              Docs · agent-kernl · akernl
            </p>
            <h2 className="font-display text-[1.875rem] sm:text-[2.25rem] font-medium text-neutral-950 tracking-[-0.028em] leading-[1.1] mb-5 max-w-3xl">
              Runtime documentation
            </h2>
            <p className="text-base text-neutral-600 max-w-2xl leading-relaxed mb-6">
              How to invoke the sandbox from Python or TypeScript, what happens under the hood in a coarse sense, and
              which architectural notes to read inside the kernl repo next.
            </p>
          </div>
          <div className="lg:hidden mb-12">
            <TocNav className="rounded-sm border border-lime-950/12 bg-white/90 p-4" />
          </div>
        </header>

        <div className="lg:grid lg:grid-cols-12 gap-14 items-start">
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-3">
            <div className="sticky top-[5.75rem]">
              <TocNav />
            </div>
          </aside>

          <div className="lg:col-span-9 xl:col-span-9 space-y-20 lg:space-y-24">
            <div id="docs-overview" className="scroll-mt-32">
              <div className="rounded-sm border border-lime-950/12 bg-white p-6 md:p-8 shadow-[0_22px_50px_-32px_rgba(77,124,15,0.45)]">
                <h3 className="font-display text-lg font-medium text-neutral-950 mb-4">Overview</h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-8">
                  Import <span className="font-mono text-neutral-800">akernl</span>, allocate a{' '}
                  <span className="font-mono text-neutral-800">Sandbox</span>, and send small code snippets execution in
                  a Firecracker-backed guest. The REST or library surface you glue in front is yours; kernl owns the{' '}
                  pool, isolation, recycle path, and observable failure semantics.
                </p>
                <div className="grid sm:grid-cols-2 gap-6 text-sm border-t border-lime-950/10 pt-6">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-neutral-400 mb-2">
                      Prerequisites
                    </p>
                    <ul className="text-neutral-600 space-y-1.5 leading-relaxed list-disc pl-4 marker:text-lime-600">
                      <li>Compatible host runtime (Linux + Firecracker per repo instructions)</li>
                      <li>Python 3.x or Node with the SDK available to your bundle</li>
                      <li>Network reachability between your orchestrator and the daemon</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-neutral-400 mb-2">
                      What ships here vs repo
                    </p>
                    <ul className="text-neutral-600 space-y-1.5 leading-relaxed list-disc pl-4 marker:text-lime-600">
                      <li>This page: ergonomics plus an architecture checklist</li>
                      <li>GitHub README: exact knobs, versioning, changelog, issues</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div id="docs-quickstart" className="scroll-mt-32">
              <div className="flex items-center gap-2 mb-6">
                <Terminal className="w-5 h-5 text-lime-800/90" aria-hidden />
                <div>
                  <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.14em]">Quick start</p>
                  <h3 className="font-display text-xl font-medium text-neutral-950 tracking-tight">Minimal examples</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">
                <CodePanel lang="python" code={pythonCode} label="Python" />
                <CodePanel lang="typescript" code={tsCode} label="TypeScript" />
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:items-start">
                <div className="flex-1 flex gap-3 px-5 py-4 border border-lime-950/14 bg-lime-100/40">
                  <span className="text-lime-700 font-mono text-sm mt-0.5" aria-hidden>
                    ▸
                  </span>
                  <p className="text-[13px] text-neutral-700 leading-relaxed">
                    Every <span className="font-mono text-neutral-800">execute()</span> hop borrows an idle microVM from
                    the warm pool when possible — then tears down or returns it so the fleet stays amortized cheap.
                  </p>
                </div>
              </div>
            </div>

            <div id="docs-runtime" className="scroll-mt-32">
              <h3 className="font-display text-xl font-medium text-neutral-950 tracking-tight mb-4">Execution model</h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-8 max-w-3xl">
                Think in three beats: enqueue work, isolate inside a pooled guest, reconcile stdout/stderr, exit codes,
                and telemetry. Limits (wall clock, CPUs, egress) tighten at host policy — wire them upstream of the SDK
                for predictable failure surfaces.
              </p>
              <ol className="grid sm:grid-cols-3 gap-4 text-sm border border-lime-950/12 divide-y sm:divide-y-0 sm:divide-x divide-lime-950/12 bg-white">
                {[
                  ['Allocate', 'Pool hands you a warmed guest or allocates cold if policy allows overflow.'],
                  ['Run', 'Short-lived interpreters execute your snippet inside the hardened boundary.'],
                  ['Recycle', 'Structured teardown: logs captured, disks scrubbed slot returns to idle.'],
                ].map(([t, body], i) => (
                  <li key={t} className="p-5">
                    <span className="text-[10px] font-mono text-lime-800 uppercase tracking-[0.12em]">{`0${i + 1}`}</span>
                    <p className="font-mono text-sm font-medium text-neutral-950 mt-1 mb-2">{t}</p>
                    <p className="text-xs text-neutral-600 leading-relaxed">{body}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div id="docs-concepts" className="scroll-mt-32">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.14em] mb-2">
                    Architecture topics
                  </p>
                  <h3 className="font-display text-xl font-medium text-neutral-950 tracking-tight">
                    Deepening in the kernl repo
                  </h3>
                </div>
                <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
                  Cards expand on design decisions referenced in README. Selecting one opens kernl until we inline those
                  write-ups locally.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {docTopics.map((topic) => (
                  <DocConceptCard key={topic.index} topic={topic} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
