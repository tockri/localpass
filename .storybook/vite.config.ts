import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineConfig({
  resolve: {
    alias: {
      '@renderer': resolve('src/renderer/src'),
      '@common': resolve('src/common')
    }
  },
  plugins: [vue({ template: { transformAssetUrls } }), vuetify({ autoImport: true })]
})
