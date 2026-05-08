import { Link } from 'react-router-dom'
import { paths } from '@/sitePaths'

type Variant = 'nav' | 'footer'

const tagline = 'Public agent & model infrastructure'

export default function BrandMark({
  variant = 'nav',
  asLink = true,
  onClick,
}: {
  variant?: Variant
  asLink?: boolean
  onClick?: () => void
}) {
  const inner = (
    <>
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] border border-lime-950/22 bg-neutral-950 font-mono text-[13px] font-semibold leading-none text-[#bef264] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
        aria-hidden
      >
        C
      </span>
      <span className="flex min-w-0 flex-wrap items-baseline gap-x-1.5">
        <span className="font-display text-lg font-semibold tracking-tight text-neutral-950 sm:text-xl">Cottus</span>
        {variant === 'nav' ? (
          <span className="hidden font-sans text-[13px] font-normal text-neutral-500 sm:inline">{tagline}</span>
        ) : null}
      </span>
    </>
  )

  const className =
    'flex items-center gap-3 text-inherit no-underline decoration-transparent hover:opacity-[0.92] transition-opacity'

  if (variant === 'nav' && asLink) {
    return (
      <Link
        to={paths.home}
        className={`${className} flex-shrink-0`}
        onClick={() => {
          onClick?.()
        }}
      >
        {inner}
      </Link>
    )
  }

  return <div className={`${className} ${variant === 'footer' ? 'mb-3' : ''}`}>{inner}</div>
}
