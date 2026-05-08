import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

/** Vite `base`: `/` (omit basename) or `/subdir/` for GitHub project pages. */
function routerBasename(): string | undefined {
  const raw = import.meta.env.BASE_URL ?? '/'
  const trimmed = raw.endsWith('/') ? raw.slice(0, -1) : raw
  if (trimmed === '' || trimmed === '/') return undefined
  return trimmed
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={routerBasename()}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
