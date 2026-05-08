import { ShieldCheck, Server, Workflow, Code2, Lock } from 'lucide-react'

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Isolated execution',
    body: 'Every workload runs inside a dedicated Firecracker microVM: full kernel-level isolation, not container namespaces.',
  },
  {
    icon: Server,
    title: 'Self hosted infrastructure',
    body: 'No cloud vendor lock-in. Deploy the entire sandbox stack on your own hardware or private cloud.',
  },
  {
    icon: Workflow,
    title: 'Programmable sandbox orchestration',
    body: 'Define lifecycle policies, resource limits, and runtime templates through a unified orchestration API.',
  },
  {
    icon: Code2,
    title: 'Language agnostic tooling',
    body: 'Execute Python, TypeScript, Go, Bash, and arbitrary executables within the same sandboxed runtime.',
  },
  {
    icon: Lock,
    title: 'Open source runtime infrastructure',
    body: 'Every layer of the stack is auditable, forkable, and extensible. No hidden execution environments.',
  },
]

export default function WhyAkernl() {
  return (
    <section id="why" className="scroll-mt-28 border-b border-lime-950/12 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4 lg:col-span-3">
            <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.14em] mb-2">02 · Motive</p>
            <h2 className="font-display text-xl md:text-2xl font-medium text-neutral-950 tracking-tight">
              Why agent-kernl exists
            </h2>
          </div>

          <div className="md:col-span-8 lg:col-span-9">
            <div className="grid gap-4 sm:grid-cols-2">
              {reasons.map((r) => {
                const Icon = r.icon
                return (
                  <div
                    key={r.title}
                    className="flex items-start gap-4 border border-lime-950/12 bg-lime-50/35 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] hover:border-lime-500/35 transition-colors"
                  >
                    <div className="flex-shrink-0 mt-0.5 p-2 border border-lime-950/15 bg-white/90">
                      <Icon className="w-4 h-4 text-lime-900" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-neutral-950 mb-1.5">{r.title}</p>
                      <p className="text-sm text-neutral-600 leading-relaxed">{r.body}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 pt-8 pb-6 border-t border-lime-950/12 border-l-[3px] border-l-lime-500 pl-6 pr-4 bg-lime-100/25">
              <p className="text-sm text-neutral-700 leading-relaxed">
                “We believe the execution layer powering AI systems should remain open, composable, and
                developer controlled.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
