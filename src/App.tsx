import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import DocsHubPage from './pages/DocsHubPage'
import AkernlPage from './pages/akernl/AkernlPage'
import RepoDocLandingPage from './pages/RepoDocLandingPage'
import { repoCatalog } from '@/data/repoCatalog'
import { paths } from './sitePaths'

/** Shell stays mounted; pages swap under `<Routes>` so `/projects` and `/docs` always render real components (no layout `<Outlet />` pitfalls). */
export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-lime-50">
      <Navbar />
      <main className="flex-1 min-h-0">
        <Routes>
          <Route path={paths.home} element={<Home />} />
          {/* Avoid separate `/projects/` routes: RR ranks them first; `<Navigate to="/projects" />` then renders nothing. */}
          <Route path={paths.projects} element={<ProjectsPage />} />
          <Route path={paths.docs} element={<DocsHubPage />} />
          <Route path={paths.agentKernl} element={<AkernlPage />} />
          <Route path="/agent-kernl" element={<Navigate to={paths.agentKernl} replace />} />
          {repoCatalog
            .filter((r) => r.siteSlug != null && r.name !== 'agent-kernl')
            .map((r) => (
              <Route
                key={r.siteSlug}
                path={`/${r.siteSlug!}`}
                element={<RepoDocLandingPage repoSlug={r.siteSlug!} />}
              />
            ))}
          <Route path="*" element={<Navigate to={paths.home} replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
