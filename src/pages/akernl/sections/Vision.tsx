export default function Vision() {
  return (
    <section id="vision" className="scroll-mt-28 border-b border-lime-950/12 bg-gradient-to-b from-white via-lime-50/25 to-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4 lg:col-span-3">
            <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.14em] mb-2">08 · North star</p>
            <h2 className="font-display text-xl md:text-2xl font-medium text-neutral-950 tracking-tight">Vision</h2>
          </div>

          <div className="md:col-span-8 lg:col-span-7">
            <div className="rounded-sm border border-lime-950/14 bg-white/90 p-6 md:p-8 shadow-[0_20px_48px_-36px_rgba(77,124,15,0.55)]">
              <div className="space-y-4">
                <p className="text-xl md:text-2xl text-neutral-900 leading-snug font-display italic tracking-tight">
                  We believe AI agents will become a foundational computing primitive.
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed max-w-xl">
                  The infrastructure powering them should remain open source, programmable, and self hostable.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-lime-950/12 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { label: 'Open', desc: 'Fully MIT licensed. Fork it, deploy it, extend it.' },
                { label: 'Composable', desc: 'Every layer is a discrete, replaceable component.' },
                {
                  label: 'Self hostable',
                  desc: 'No phone-home dependency. Your infrastructure stays yours.',
                },
              ].map((v) => (
                <div key={v.label}>
                  <p className="text-xs font-mono font-semibold text-neutral-950 uppercase tracking-[0.1em] mb-2">
                    {v.label}
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
