/**
 * Canonical in-app paths (no trailing slash). BrowserRouter: `/docs`, `/projects`, etc.
 */
export const paths = {
  home: '/',
  projects: '/projects',
  docs: '/docs',
  /** Full agent-kernl guide on-site (`cottus-ai.github.io/akernl`). */
  agentKernl: '/akernl',
} as const

/** Deep link into the agent-kernl page (same-origin fragment scroll). */
export function agentKernl(section: 'docs' | 'architecture'): string {
  return `${paths.agentKernl}#${section}`
}
