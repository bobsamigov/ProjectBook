import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
        //change here
        '/api': {
            target: 'https://nest-book-api.herokuapp.com/',
            changeOrigin: true,
            rewrite: (path) => { console.log(path); return path.replace('/^\/api/', '') }
        }
    }
}
})
