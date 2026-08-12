import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '../..')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'edit-kit': path.resolve(repoRoot, 'packages/edit-kit/src'),
    },
  },
  server: {
    fs: {
      allow: [repoRoot],
    },
  },
})
