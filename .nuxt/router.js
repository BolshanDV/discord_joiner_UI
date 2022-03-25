import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6478f4f6 = () => interopDefault(import('../pages/captcha-settings.vue' /* webpackChunkName: "pages/captcha-settings" */))
const _9dcf0a10 = () => interopDefault(import('../pages/discord-joiner.vue' /* webpackChunkName: "pages/discord-joiner" */))
const _43d82c49 = () => interopDefault(import('../pages/message-bumper.vue' /* webpackChunkName: "pages/message-bumper" */))
const _768eefbc = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/captcha-settings",
    component: _6478f4f6,
    name: "captcha-settings"
  }, {
    path: "/discord-joiner",
    component: _9dcf0a10,
    name: "discord-joiner"
  }, {
    path: "/message-bumper",
    component: _43d82c49,
    name: "message-bumper"
  }, {
    path: "/",
    component: _768eefbc,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
