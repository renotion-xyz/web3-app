import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import nodePolyfills from 'rollup-plugin-polyfill-node';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills({
      include: ['buffer', 'crypto', 'stream'],
    }),
    react()
  ],
  resolve: {
    preserveSymlinks: true
  },
})
