export default {
  mode: 'spa',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Discord Joiner',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '../crypto_logo.svg' }
    ]
  },
  loading:{
    color: 'red'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
      'assets/style/elements/fonts.css',
      'assets/style/elements/checkbox.css',
      'assets/style/elements/input.css',
      'assets/style/elements/scrolls.css',
      'assets/style/elements/icons.css',
      'assets/style/elements/button.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios'

  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  bootstrapVue: {
    icons: true
  }


}
