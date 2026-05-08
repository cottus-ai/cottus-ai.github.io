export default function WhatIsAkernl() {
  return (
    <section id="brief" className="scroll-mt-28 border-b border-lime-950/12 bg-lime-50/45">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4 lg:col-span-3">
            <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.14em] mb-2">01 · Brief</p>
            <h2 className="font-display text-xl md:text-2xl font-medium text-neutral-950 tracking-tight">
              What is agent-kernl?
            </h2>
          </div>

          <div className="md:col-span-8 lg:col-span-9 space-y-5">
            <p className="text-base text-neutral-800 leading-8">
              <span className="font-medium text-neutral-950">agent-kernl</span> is the runtime product (
              <span className="font-mono text-neutral-800">akernl</span> on PyPI today). Sources live at{' '}
              <a
                href="https://github.com/cottus-ai/kernl"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-neutral-900 underline decoration-lime-950/30 underline-offset-2 hover:decoration-neutral-950"
              >
                cottus-ai/kernl
              </a>
              . When the rename lands, expect the repository to move to{' '}
              <span className="font-mono text-neutral-800">cottus-ai/akernl</span>.
            </p>
            <p className="text-base text-neutral-800 leading-8">
              It is an open source runtime platform for safely executing AI generated and untrusted code inside
              isolated Firecracker microVMs.
            </p>
            <p className="text-sm text-neutral-600 leading-8">
              It provides a self hosted sandbox API, VM orchestration layer, execution packaging pipeline, and
              unified SDK for managing sandbox lifecycle operations across multiple runtimes.
            </p>
            <p className="text-sm text-neutral-500 leading-8">
              The project is designed for AI agents, autonomous systems, code execution infrastructure, and
              programmable runtime environments.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Runtime', value: 'Firecracker' },
                { label: 'License', value: 'MIT' },
                { label: 'Language', value: 'Python / Rust' },
              ].map((item) => (
                <div key={item.label} className="border border-lime-950/12 bg-lime-100/40 px-4 py-3.5">
                  <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-[0.12em] mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm font-mono text-neutral-950">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
