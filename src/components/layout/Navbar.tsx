import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Github } from 'lucide-react'
import ContactModal from '../ui/ContactModal'
import BrandMark from './BrandMark'
import { paths } from '@/sitePaths'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const linkClass =
    'text-[11px] font-mono text-neutral-500 hover:text-neutral-950 transition-colors tracking-[0.12em] uppercase'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-lime-50/95 backdrop-blur-sm ${
          scrolled ? 'border-b border-lime-950/12 shadow-[0_1px_0_rgba(120,171,51,0.25)]' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between min-h-[3.5rem] py-2">
            <BrandMark variant="nav" onClick={closeMenu} />

            <div className="hidden md:flex items-center gap-8">
              <Link to={paths.projects} className={linkClass}>
                Projects
              </Link>
              <a
                href="https://github.com/cottus-ai"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} flex items-center gap-1.5`}
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
              <Link to={paths.docs} className={linkClass}>
                Docs
              </Link>
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className={`${linkClass} text-neutral-950`}
              >
                Contact
              </button>
            </div>

            <button
              aria-label="Toggle menu"
              className="md:hidden text-neutral-500 hover:text-neutral-950 transition-colors p-1"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-lime-950/12 bg-lime-50">
            <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col gap-3">
              <Link to={paths.projects} className={`${linkClass} py-1`} onClick={closeMenu}>
                Projects
              </Link>
              <a
                href="https://github.com/cottus-ai"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} py-1 flex items-center gap-2`}
                onClick={closeMenu}
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
              <Link to={paths.docs} className={`${linkClass} py-1`} onClick={closeMenu}>
                Docs
              </Link>
              <button
                type="button"
                onClick={() => {
                  setContactOpen(true)
                  closeMenu()
                }}
                className={`${linkClass} py-1 text-left`}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
