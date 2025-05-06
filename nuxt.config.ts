export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  app: {
    head: {
      // Only keep truly global settings here, if any (e.g., charset or viewport)
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/mastorscdn@1.1/mastors.css' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/surajit-singha-sisir/mastorsCDN@v1.1/mastorsIcons/mastorsIcons.css' },
      ],
      script: [
        { type: 'module', src: '/js/kehem-e-dashboard.js' },
      ],
      noscript: [
        { children: 'JavaScript is required' }
      ],
    }
  },

  plugins: [
    '~/plugins/vue-toastification.client.ts',
    '~/plugins/mastorsForm.ts',
  ],

  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  ssr: false,
  imports: {
    dirs: ['stores'],
  },
  modules: ['@nuxt/image', 'nuxt-auth-utils',
    ['@pinia/nuxt', {
      autoImports: ['defineStore', 'acceptHMRUpdate']
    }],
    'pinia-plugin-persistedstate/nuxt',],
})