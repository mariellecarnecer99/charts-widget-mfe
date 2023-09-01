// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import federation from '@originjs/vite-plugin-federation'

const APPLICATION_PORT = 3001;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: APPLICATION_PORT,
  },
  preview: {
    port: APPLICATION_PORT,
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      external: [
        "chart.js",
        "vuetify/lib/components/VIcon/index.mjs",
        "vuetify/lib/components/VBtn/index.mjs",
        "vuetify/lib/components/VCard/index.mjs",
        "vuetify/lib/components/VCheckbox/index.mjs",
        "vuetify/lib/components/VColorPicker/index.mjs",
        "vuetify/lib/components/VDialog/index.mjs",
        "vuetify/lib/components/VDivider/index.mjs"
      ],
    },
  },
  plugins: [
    vue({ 
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    federation({
      name: "pluggable-widget",
      filename: "pluggableWidget.js",
      exposes: {
        "./App": "./src/App.vue",
      },
      shared: ["vue"],
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  }
})
