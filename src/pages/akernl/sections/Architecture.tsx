import React from 'react'

interface FlowStep {
  label: string
  sub?: string
  accent?: boolean
}

interface DiagramProps {
  index: string
  title: string
  steps: FlowStep[]
}

function FlowDiagram({ index, title, steps }: DiagramProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-5 pb-4 border-b border-lime-950/12">
        <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.14em] block mb-1">
          {index}
        </span>
        <span className="text-xs font-mono text-neutral-700 uppercase tracking-wider">{title}</span>
      </div>

      <div className="flex flex-col items-stretch">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div
              className={`relative border px-4 py-3 font-mono text-sm text-center ${
                step.accent
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-lime-950/12 bg-lime-100/40 text-neutral-900'
              }`}
            >
              {step.label}
              {step.sub && (
                <span
                  className={`block text-[10px] mt-1 font-mono normal-case ${
                    step.accent ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {step.sub}
                </span>
              )}
            </div>

            {i < steps.length - 1 && (
              <div className="flex flex-col items-center my-0" aria-hidden>
                <div className="w-px h-4 bg-lime-950/25" />
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 6L0 0H10L5 6Z" fill="#a1a1aa" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

const diagrams: DiagramProps[] = [
  {
    index: '01',
    title: 'Execution Packaging Pipeline',
    steps: [
      { label: 'Agent Code', sub: 'user-provided source' },
      { label: 'agent-kernl package', sub: 'packaging layer' },
      { label: '.krn bundle', sub: 'portable execution unit', accent: true },
      { label: 'Sandbox Runtime', sub: 'unpacked inside VM' },
      { label: 'Firecracker microVM', sub: 'hardware-level isolation', accent: true },
    ],
  },
  {
    index: '02',
    title: 'Runtime Architecture',
    steps: [
      { label: 'SDK', sub: 'Python / TypeScript' },
      { label: 'REST API', sub: 'HTTP sandbox API', accent: true },
      { label: 'Sandbox Orchestrator', sub: 'lifecycle controller' },
      { label: 'VM Pool Manager', sub: 'hot/cold VM pool' },
      { label: 'Firecracker microVMs', sub: 'N × isolated guests', accent: true },
    ],
  },
  {
    index: '03',
    title: 'Isolation Model',
    steps: [
      { label: 'Request', sub: 'execute(code, language)' },
      { label: 'Sandbox Allocation', sub: 'acquire from pool' },
      { label: 'MicroVM Execution', sub: 'kernel-isolated run', accent: true },
      { label: 'Filesystem Layer', sub: 'ephemeral overlay FS' },
      { label: 'Output Streaming', sub: 'stdout / stderr' },
      { label: 'VM Recycling', sub: 'reset → pool return', accent: true },
    ],
  },
]

export default function Architecture() {
  return (
    <section id="architecture" className="scroll-mt-28 border-b border-lime-950/12 bg-lime-50/35">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4 lg:col-span-3">
            <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.14em] mb-2">03 · Systems</p>
            <h2 className="font-display text-xl md:text-2xl font-medium text-neutral-950 tracking-tight mb-4">
              Architecture
            </h2>
            <p className="text-xs text-neutral-500 leading-relaxed">
              End-to-end system design from SDK call to Firecracker microVM execution.
            </p>
          </div>

          <div className="md:col-span-8 lg:col-span-9">
            <div className="flex items-start gap-3 mb-8 px-4 py-3 border border-lime-950/12 bg-lime-100/50 text-xs text-neutral-600 font-mono leading-relaxed">
              <span className="text-neutral-400 flex-shrink-0 mt-0.5">▸</span>
              Each box is a system boundary. Filled nodes are infrastructure primitives.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {diagrams.map((d) => (
                <FlowDiagram key={d.index} {...d} />
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-lime-950/12 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { color: 'bg-neutral-900', label: 'Infrastructure primitives' },
                { color: 'bg-lime-300/70', label: 'Orchestration layer' },
                { color: 'bg-lime-500', label: 'Connector' },
                { color: 'bg-white border border-lime-950/12', label: 'Application layer' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`w-3 h-3 flex-shrink-0 ${item.color}`} />
                  <span className="text-[10px] font-mono text-neutral-500 leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
