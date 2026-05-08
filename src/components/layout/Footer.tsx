import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Github } from 'lucide-react'
import ContactModal from '../ui/ContactModal'
import BrandMark from './BrandMark'
import { paths } from '@/sitePaths'

export default function Footer() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      <footer className="border-t border-lime-950/12 bg-lime-50 mt-auto">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <BrandMark variant="footer" asLink={false} />
              <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">
                Open infrastructure for agent execution and model inference: isolated bundles, CUDA runtimes, and Python tooling.
              </p>
            </div>

            <div>
              <p className="text-2xs font-mono text-neutral-400 uppercase tracking-[0.14em] mb-3">
                Projects
              </p>
              <ul className="space-y-2">
                <li>
                  <Link to={paths.projects} className="text-xs text-neutral-600 hover:text-neutral-950 transition-colors font-mono">
                    All projects
                  </Link>
                </li>
                <li>
                  <Link
                    to={paths.agentKernl}
                    className="text-xs text-neutral-600 hover:text-neutral-950 transition-colors font-mono"
                  >
                    agent-kernl (akernl)
                  </Link>
                </li>
                <li>
                  <Link to="/cottus-runtime" className="text-xs text-neutral-600 hover:text-neutral-950 transition-colors font-mono">
                    cottus-runtime
                  </Link>
                </li>
                <li>
                  <Link to="/argus" className="text-xs text-neutral-600 hover:text-neutral-950 transition-colors font-mono">
                    argus
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-2xs font-mono text-neutral-400 uppercase tracking-[0.14em] mb-3">
                Links
              </p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/cottus-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-neutral-600 hover:text-neutral-950 transition-colors font-mono flex items-center gap-1.5"
                  >
                    <Github className="w-3 h-3" />
                    GitHub
                  </a>
                </li>
                <li>
                  <Link to={paths.docs} className="text-xs text-neutral-600 hover:text-neutral-950 transition-colors font-mono">
                    Docs
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-xs text-neutral-600 hover:text-neutral-950 transition-colors font-mono">
                    License
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-2xs font-mono text-neutral-400 uppercase tracking-[0.14em] mb-3">
                Contact
              </p>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => setContactOpen(true)}
                    className="text-xs text-neutral-600 hover:text-neutral-950 transition-colors font-mono text-left"
                  >
                    Get in touch →
                  </button>
                </li>
                <li>
                  <a
                    href="https://x.com/CottusAI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-neutral-600 hover:text-neutral-950 transition-colors font-mono"
                  >
                    @CottusAI
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-lime-950/12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-2xs font-mono text-neutral-400">
              © {new Date().getFullYear()} Cottus. MIT License.
            </p>
            <p className="text-2xs font-mono text-neutral-400">Open source · Self hostable</p>
          </div>
        </div>
      </footer>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
