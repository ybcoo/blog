// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  ssr:false,//服务不够暂时关闭
  app: {
    baseURL: '/blog/',   // 开发、生产统一用 /blog/
  },
  nitro: {
    preset: 'github-pages'
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  routeRules: {
    '/': { redirect: '/blog/mainBox/home' }
  },
  css: ['~/assets/css/global.css'] // 这里的路径是相对于项目根目录的
})
