import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: true,
    hmr: {
      timeout: 120000,
      clientPort: 443
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "src/styles/_variables" as *;
          @use "src/styles/_mixins" as *;
        `
      }
    }
  },
  define: {
    'process.env': {}
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          redux: ['@reduxjs/toolkit', 'react-redux', 'redux-saga']
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mui/material',
      '@mui/icons-material',
      '@reduxjs/toolkit',
      'react-redux',
      'redux-saga',
      'formik',
      'yup',
      'lucide-react'
    ],
    force: true
  }
})