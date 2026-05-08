const STATUS_COLORS = {
  Stable: 'text-lime-950 bg-lime-100 border-lime-950/25',
  'In Progress': 'text-lime-950 bg-lime-200/50 border-lime-800/25',
  Planned: 'text-neutral-700 bg-lime-100/70 border-lime-950/12',
  Research: 'text-violet-950 bg-violet-100 border-violet-300',
} as const

type StatusLabel = keyof typeof STATUS_COLORS

const roadmap: { component: string; status: StatusLabel; note?: string }[] = [
  { component: 'Runtime Engine', status: 'Stable', note: 'Core execution loop' },
  { component: 'Firecracker Integration', status: 'Stable', note: 'microVM driver layer' },
  { component: 'VM Pooling', status: 'Stable', note: 'Hot-start pool manager' },
  { component: 'Sandbox API', status: 'In Progress', note: 'REST + websocket interface' },
  { component: 'TypeScript SDK', status: 'Planned', note: 'Client library' },
  { component: 'Go SDK', status: 'Planned', note: 'Client library' },
  { component: 'Streaming Runtime', status: 'Research', note: 'Real-time output streaming' },
  { component: 'Distributed Scheduler', status: 'Research', note: 'Multi-node execution' },
]

export default function ProjectStatus() {
  return (
    <section id="status" className="scroll-mt-28 border-b border-lime-950/12 bg-lime-50/40">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4 lg:col-span-3">
            <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.14em] mb-2">05 · Roadmap</p>
            <h2 className="font-display text-xl md:text-2xl font-medium text-neutral-950 tracking-tight mb-4">
              Status
            </h2>
            <p className="text-xs text-neutral-500 leading-relaxed font-mono">
              Component-level project status and roadmap.
            </p>
          </div>

          <div className="md:col-span-8 lg:col-span-9">
            <div className="border border-lime-950/12 divide-y divide-lime-950/12 overflow-hidden rounded-none">
              <div className="grid grid-cols-12 px-4 py-2.5 bg-lime-100/50">
                <span className="col-span-5 text-[10px] font-mono text-neutral-500 uppercase tracking-[0.12em]">
                  Component
                </span>
                <span className="col-span-3 text-[10px] font-mono text-neutral-500 uppercase tracking-[0.12em]">
                  Status
                </span>
                <span className="col-span-4 text-[10px] font-mono text-neutral-500 uppercase tracking-[0.12em] hidden sm:block">
                  Notes
                </span>
              </div>

              {roadmap.map((row) => (
                <div
                  key={row.component}
                  className="grid grid-cols-12 px-4 py-3.5 hover:bg-lime-100/50 transition-colors items-center"
                >
                  <span className="col-span-5 text-sm font-mono text-neutral-900">{row.component}</span>
                  <div className="col-span-3">
                    <span
                      className={`text-[10px] font-mono border px-2 py-0.5 uppercase tracking-wider ${STATUS_COLORS[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </div>
                  <span className="col-span-4 text-xs font-mono text-neutral-500 hidden sm:block">{row.note}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.12em] mb-2">Install</p>
              <div className="border border-lime-950/12 bg-lime-100/40 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-lime-950/12 bg-white">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-lime-300/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-lime-300/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-lime-300/70" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">terminal</span>
                </div>
                <pre className="px-4 py-4 text-sm font-mono text-neutral-900 overflow-x-auto bg-white">
                  <span className="text-neutral-400 select-none">$ </span>
                  <span className="text-lime-900">pip install</span>
                  <span className="text-neutral-800"> akernl</span>
                </pre>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {(Object.keys(STATUS_COLORS) as StatusLabel[]).map((s) => (
                <span key={s} className={`text-[10px] font-mono border px-2 py-0.5 uppercase ${STATUS_COLORS[s]}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
