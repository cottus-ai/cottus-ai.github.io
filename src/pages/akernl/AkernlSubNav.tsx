/** Sticky in-page jumps; sits below the fixed site navbar while scrolling. */
const LINKS = [
  { href: '#brief', label: 'Overview' },
  { href: '#why', label: 'Why' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#features', label: 'Features' },
  { href: '#status', label: 'Status' },
  { href: '#docs', label: 'Docs' },
  { href: '#vision', label: 'Vision' },
] as const

export default function AkernlSubNav() {
  return (
    <nav
      aria-label="Sections on this page"
      className="sticky top-[3.5rem] z-40 border-b border-lime-950/12 bg-lime-50/92 backdrop-blur-md shadow-[0_1px_0_rgba(120,171,51,0.12)]"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        <ul className="flex gap-0.5 sm:gap-1 overflow-x-auto py-2 [-webkit-overflow-scrolling:touch]">
          {LINKS.map(({ href, label }) => (
            <li key={href} className="flex-shrink-0">
              <a
                href={href}
                className="inline-flex px-2.5 sm:px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.12em] text-neutral-600 hover:text-neutral-950 hover:bg-white/85 rounded-sm transition-colors whitespace-nowrap border border-transparent hover:border-lime-950/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
