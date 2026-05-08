import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  /** Vite already applies SPA HTML fallback in dev when appType is `spa`. */
  appType: 'spa',
  base: '/',
  publicDir: 'assets',
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
