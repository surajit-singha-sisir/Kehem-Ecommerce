import { resolve } from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  app: {
    // pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      // META
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'description', content: 'Dashboard - KEHEM Ecommerce' },
        { name: 'keywords', content: 'KEHEM' },
        { name: 'author', content: 'Surajit Singha Sisir, Anirban Singha, KEHEM IT' },
        { name: 'theme-color', content: '#ffffff' },

        // Open Graph Meta Tags
        { property: 'og:title', content: 'Dashboard - KEHEM Ecommerce' },
        { property: 'og:description', content: 'Dashboard - KEHEM Ecommerce' },
        { property: 'og:image', content: 'https://kehem-ecommerce.vercel.app/favicon.jpg' },
        { property: 'og:url', content: 'https://kehem-ecommerce.vercel.app' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },

        // Twitter Meta Tags
        { name: 'twitter:card', content: 'kehem-ecommerce' },
        { name: 'twitter:site', content: '@kehem-ecommerce' },
        { name: 'twitter:title', content: 'Dashboard - KEHEM Ecommerce' },
        { name: 'twitter:description', content: 'Dashboard - KEHEM Ecommerce' },
        { name: 'twitter:image', content: 'https://kehem-ecommerce.vercel.app/favicon.jpg' },

        // Developer and Team Info
        { name: 'developer', content: 'Surajit Singha Sisir, Anirban Singha' }, // Developer names
        { name: 'developer-team', content: 'Kehem IT' }, // Developer team
        { name: 'dev-platform', content: 'Vue, Django, CDN' }, // Technologies used
        { name: 'developer-website', content: 'https://kehem.com' }, // Developer website link
      ],

      title: 'Dashboard - KEHEM Ecommerce',
      link: [
        { rel: 'stylesheet', href: 'https://surajit-singha-sisir.github.io/mastorsCDN/mastors.css' },
        { rel: 'stylesheet', href: 'https://surajit-singha-sisir.github.io/mastorsCDN/mastorsIcons/mastorsIcons.css' },
        { rel: 'stylesheet', href: '/css/kehem-e-dashboard.css' },
      ],

      script: [
        // { type: 'module', src: 'https://surajit-singha-sisir.github.io/mastorsCDN/mastors.js', defer: true },
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
    '~/plugins/vuedraggable.client.ts',
  ],

  devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  modules: ['@nuxt/image', 'nuxt-auth-utils', '@pinia/nuxt'],

})