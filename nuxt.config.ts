export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  app: {
    head: {
      // Meta tags
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'description', content: 'Dashboard - KEHEM Ecommerce' },
        { name: 'keywords', content: 'KEHEM' },
        { name: 'author', content: 'Surajit Singha Sisir, Anirban Singha, KEHEM IT' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#ffffff' },

        // Open Graph Meta Tags
        { property: 'og:title', content: 'Visual Weaver Web Text Editor' },
        { property: 'og:description', content: 'Dashboard - KEHEM Ecommerce' },
        { property: 'og:image', content: 'https://visualweaver.vercel.app/path-to-image.jpg' },
        { property: 'og:url', content: 'https://visualweaver.vercel.app' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },

        // Twitter Meta Tags
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@your_twitter_handle' },
        { name: 'twitter:title', content: 'Visual Weaver Web Text Editor' },
        { name: 'twitter:description', content: 'Dashboard - KEHEM Ecommerce' },
        { name: 'twitter:image', content: 'https://visualweaver.vercel.app/path-to-image.jpg' },

        // Developer and Team Info
        { name: 'developer', content: 'Surajit Singha Sisir, Anirban Singha' }, // Developer names
        { name: 'developer-team', content: 'Kehem IT' }, // Developer team
        { name: 'dev-platform', content: 'React, Vue, Django, CDN' }, // Technologies used
        { name: 'developer-website', content: 'https://kehem.com' }, // Developer website link
      ],

      // Title of the page
      title: 'Visual Weaver Web Text Editor',

      // External CSS
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/surajit-singha-sisir/mastorsCDN@v1.1.01/mastors.css' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/surajit-singha-sisir/mastorsCDN@v1.1/mastorsIcons/mastorsIcons.css' },
      ],

      // External JS (with `type="module"` as specified)
      script: [
        { type: 'module', src: 'https://cdn.jsdelivr.net/gh/surajit-singha-sisir/mastorsCDN@v1.1.01/mastors.js' }
      ],
    }
  },
  // extensions: ['ResizeableImage'],
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  // modules: ['@nuxtjs/vuetify'],
})
