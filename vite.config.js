import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const root = fileURLToPath(new URL('.', import.meta.url))

// Shared markup: `<!-- @nav -->` in a page is replaced with src/partials/nav.html.
const partials = () => ({
  name: 'partials',
  transformIndexHtml: {
    order: 'pre',
    handler: (html) =>
      html.replace(/<!--\s*@([\w-]+)\s*-->/g, (_, name) => readFileSync(`${root}src/partials/${name}.html`, 'utf8')),
  },
})

export default defineConfig({
  appType: 'mpa',
  publicDir: 'public',
  plugins: [partials()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        home: `${root}index.html`,
        offprint: `${root}offprint/index.html`,
        trinetra: `${root}trinetra/index.html`,
        akernl: `${root}akernl/index.html`,
        runtime: `${root}cottus-runtime/index.html`,
        argus: `${root}argus/index.html`,
        projects: `${root}projects/index.html`,
        docs: `${root}docs/index.html`,
        agentKernl: `${root}agent-kernl/index.html`,
        notFound: `${root}404.html`,
      },
    },
  },
})
