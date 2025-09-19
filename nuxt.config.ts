// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', ],
  css: ['@/assets/css/main.css'],
  vite:{
    plugins: [tailwindcss()]
  },

  app: {
    head: {
      title: 'Informatika UUI 24 | schedule',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png', sizes: '32x32' },
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/live2d-widget@3.x/lib/L2Dwidget.min.js' }
      ]
    }
  }
})