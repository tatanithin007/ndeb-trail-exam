import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ndeb-trail-exam/',
  plugins: [react()],
  server: {
    host: true,
  },
})
