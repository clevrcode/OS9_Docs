// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@pinia/nuxt'],

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
      public: {
        MONGODB_URI:
          'mongodb+srv://vaillancourtc_db_user:Ge0xHFmySJePv7N3@os9docs.tbrudqj.mongodb.net/',
        api_url: 'http://localhost:3000/api',
      },
    },
  },
})
