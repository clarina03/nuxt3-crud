// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: [
    '~/plugins/pinia.ts',
  ],
  compatibilityDate: '2024-11-01',  // Pastikan ini di luar array 'plugins'
  devtools: { enabled: true },
  css: ['@/assets/css/styles.css'],
})