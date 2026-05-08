import { useEffect, useRef } from 'react'
import { X, Mail, Twitter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ContactModalProps {
  open: boolean
  onClose: () => void
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const rowClass =
    'flex items-center gap-4 p-4 border border-lime-950/12 bg-white hover:border-lime-500/55 hover:bg-lime-100/50 transition-all group'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => {
            if (e.target === overlayRef.current) onClose()
          }}
        >
          <div className="absolute inset-0 bg-neutral-900/20 backdrop-blur-[2px]" />

          <motion.div
            className="relative z-10 w-full max-w-sm bg-white border border-lime-950/12 shadow-[0_24px_80px_-20px_rgba(77,124,15,0.12)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-lime-950/12">
              <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-[0.14em]">
                Contact
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="text-neutral-400 hover:text-neutral-950 transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <a href="https://x.com/CottusAI" target="_blank" rel="noopener noreferrer" className={rowClass}>
                <div className="flex items-center justify-center w-9 h-9 border border-lime-950/12 bg-lime-100/50 group-hover:border-lime-950/20 flex-shrink-0">
                  <Twitter className="w-4 h-4 text-neutral-500 group-hover:text-neutral-950 transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-mono text-neutral-950">@CottusAI</p>
                  <p className="text-xs font-mono text-neutral-500 truncate">x.com/CottusAI</p>
                </div>
                <span className="ml-auto text-neutral-400 group-hover:text-neutral-950 text-xs font-mono transition-colors">
                  →
                </span>
              </a>

              <a href="mailto:ishaan.sinha10@gmail.com" className={rowClass}>
                <div className="flex items-center justify-center w-9 h-9 border border-lime-950/12 bg-lime-100/50 group-hover:border-lime-950/20 flex-shrink-0">
                  <Mail className="w-4 h-4 text-neutral-500 group-hover:text-neutral-950 transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-mono text-neutral-950">Email</p>
                  <p className="text-xs font-mono text-neutral-500 truncate">ishaan.sinha10@gmail.com</p>
                </div>
                <span className="ml-auto text-neutral-400 group-hover:text-neutral-950 text-xs font-mono transition-colors">
                  →
                </span>
              </a>
            </div>

            <div className="px-5 pb-4">
              <p className="text-2xs font-mono text-neutral-400 text-center">Press Esc to dismiss</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
