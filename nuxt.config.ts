// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  app: {
    baseURL: '/',   // 开发、生产统一用 /blog/
  },
  nitro: {
    // preset: 'github-pages'
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  routeRules: {
    '/': { redirect: '/mainBox/home' }//开ssr可能要加上blog
  },
  css: ['~/assets/css/global.css'], // 这里的路径是相对于项目根目录的
  // 核心新增：Vite原生配置节点，直接传递给底层Vite内核
  vite: {
    server: {
      allowedHosts: true, // 彻底允许所有主机名，解除Vite内核的拦截
      // 若需精准限制，可改为数组：allowedHosts: ['blog.ybcfish.cloud']
    }
  }
})
