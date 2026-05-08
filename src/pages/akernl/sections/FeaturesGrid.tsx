import {
  ShieldCheck,
  Layers,
  Server,
  Zap,
  Code2,
  Globe,
  FileCode2,
  BookOpen,
} from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    title: 'Firecracker Isolation',
    desc: 'Hardware-virtualized microVM per execution. No shared kernel between workloads.',
  },
  {
    icon: Layers,
    title: 'Unified SDK',
    desc: 'Single interface for all sandbox operations across Python and TypeScript.',
  },
  {
    icon: Server,
    title: 'Self Hosted',
    desc: 'Full stack deployable on bare metal or private cloud. No external dependencies.',
  },
  {
    icon: Zap,
    title: 'VM Pooling',
    desc: 'Pre-warmed VM pool reduces cold-start latency for high-frequency execution.',
  },
  {
    icon: Code2,
    title: 'Multi Language',
    desc: 'Execute Python, TypeScript, Go, Bash, and arbitrary binaries in isolation.',
  },
  {
    icon: Globe,
    title: 'REST API',
    desc: 'HTTP-native sandbox API. Integrates with any language or automation system.',
  },
  {
    icon: FileCode2,
    title: 'Runtime Templates',
    desc: 'Declarative template system for defining reproducible execution environments.',
  },
  {
    icon: BookOpen,
    title: 'Open Source',
    desc: 'MIT licensed. Every component is auditable, forkable, and community maintained.',
  },
]

export default function FeaturesGrid() {
  return (
    <section id="features" className="scroll-mt-28 border-b border-lime-950/12 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4 lg:col-span-3">
            <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.14em] mb-2">04 · Surface</p>
            <h2 className="font-display text-xl md:text-2xl font-medium text-neutral-950 tracking-tight">
              Features
            </h2>
          </div>

          <div className="md:col-span-8 lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 border border-lime-950/12">
              {features.map((f, i) => {
                const Icon = f.icon
                const right = i % 2 === 0 ? 'sm:border-r sm:border-lime-950/12' : ''
                const rightXl = i % 4 !== 3 ? 'xl:border-r xl:border-lime-950/12' : ''
                const bottomSm = i < 6 ? 'sm:border-b sm:border-lime-950/12' : ''
                const bottomXl = i < 4 ? 'xl:border-b xl:border-lime-950/12' : ''
                return (
                  <div
                    key={f.title}
                    className={`p-6 hover:bg-lime-100/50 transition-colors ${right} ${rightXl} ${bottomSm} ${bottomXl}`}
                  >
                    <div className="p-2 border border-lime-950/12 bg-lime-100/50 inline-flex mb-4">
                      <Icon className="w-3.5 h-3.5 text-neutral-700" />
                    </div>
                    <p className="text-sm font-medium text-neutral-950 mb-2">{f.title}</p>
                    <p className="text-xs text-neutral-600 leading-relaxed">{f.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
