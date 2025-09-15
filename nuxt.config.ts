// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  routeRules: {
    '/': { redirect: '/mainBox/home' }
  },
  css: ['~/assets/css/global.css'] // 这里的路径是相对于项目根目录的
})
