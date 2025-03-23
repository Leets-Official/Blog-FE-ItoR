import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],  // '@'를 '/src' 폴더로 대체
  },
})