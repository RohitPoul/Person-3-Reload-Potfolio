import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rolldownOptions: {
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] ?? assetInfo.name ?? ''
          if (name.endsWith('.css')) return 'assets/css/[name]-[hash][extname]'
          if (/\.(mp4|webm)$/i.test(name)) return 'assets/videos/[name]-[hash][extname]'
          if (/\.(mp3|wav|ogg)$/i.test(name)) return 'assets/audio/[name]-[hash][extname]'
          if (/\.(woff2?)$/i.test(name)) return 'assets/fonts/[name]-[hash][extname]'
          if (/\.(avif|webp|png|jpe?g|svg|gif|ico)$/i.test(name)) return 'assets/images/[name]-[hash][extname]'
          return 'assets/other/[name]-[hash][extname]'
        },
      },
    },
  },
})
