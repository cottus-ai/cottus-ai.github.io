import { Github, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import RepoCatalogGrid from '@/components/projects/RepoCatalogGrid'
import { getPublicRepoCount, repoCatalog } from '@/data/repoCatalog'
import { paths } from '@/sitePaths'

export default function ProjectsPage() {
  const publicN = getPublicRepoCount()

  return (
    <div className="pt-[3.5rem] pb-24">
      <section className="border-b border-lime-950/12">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16 md:py-20">
          <div>
            <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.14em] mb-3">Projects</p>
            <h1 className="font-display text-3xl sm:text-4xl font-medium text-neutral-950 tracking-tight mb-5 text-balance">
              Repository catalog
            </h1>
            <p className="text-base text-neutral-600 max-w-2xl leading-relaxed mb-8">
              {repoCatalog.length} repositories tracked for the{' '}
              <a
                href="https://github.com/cottus-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 underline decoration-lime-950/25 underline-offset-2 hover:decoration-neutral-950"
              >
                cottus-ai
              </a>{' '}
              org ({publicN} public, {repoCatalog.length - publicN} private). Public repos open on GitHub; private work is
              marked as coming soon.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/cottus-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-lime-400 text-neutral-950 text-sm font-semibold tracking-tight hover:bg-lime-300 transition-colors border border-neutral-950/15"
              >
                <Github className="w-4 h-4" />
                GitHub org
              </a>
              <Link
                to={paths.home}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-lime-950/20 text-sm text-neutral-800 font-medium hover:border-neutral-900 transition-colors"
              >
                Home
                <ArrowRight className="w-4 h-4 opacity-80" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16 md:py-20">
        <RepoCatalogGrid repos={repoCatalog} />
      </section>
    </div>
  )
}
