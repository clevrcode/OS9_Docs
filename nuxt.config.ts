// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@pinia/nuxt'],

  experimental: {
    // Explicitly set this to false to bypass the recursive route type evaluation with Nuxt 4.6
    routeTypedFetch: false,
  },

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs',
      },
    },
  },
  $development: {
    runtimeConfig: {
      MONGODB_URI: '',
      public: {
        api_url: 'http://localhost:3000/api',
      },
    },
  },
})
