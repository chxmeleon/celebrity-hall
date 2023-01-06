import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import Unocss from '@unocss/vite'
import presetIcons from '@unocss/preset-icons'
import VitePluginHtmlEnv from 'vite-plugin-html-env'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    react(),
    Unocss({
      presets: [presetIcons({})]
    }),
    VitePluginHtmlEnv()
  ]
})
