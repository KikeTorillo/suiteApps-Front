import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
/*build: {
    minify: false,
  },
  esbuild: {
    minify: false,
    minifySyntax: false,
    minifyIdentifiers: false,
    minifyWhitespace: false,
  },*/
  plugins: [react()],
})
