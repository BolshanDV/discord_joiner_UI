import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const VUEX_PROPERTIES = ['state', 'getters', 'actions', 'mutations']

let store = {};

(function updateModules () {
  // If store is an exported method = classic mode (deprecated)

  if (typeof store === 'function') {
    return console.warn('Classic mode for store/ is deprecated and will be removed in Nuxt 3.')
  }

  // Enforce store modules
  store.modules = store.modules || {}

  resolveStoreModules(require('../store/logger.js'), 'logger.js')
  resolveStoreModules(require('../store/authStore/authorization.js'), 'authStore/authorization.js')
  resolveStoreModules(require('../store/captchaSettingsStore/captchaService.js'), 'captchaSettingsStore/captchaService.js')
  resolveStoreModules(require('../store/captchaSettingsStore/settings.js'), 'captchaSettingsStore/settings.js')
  resolveStoreModules(require('../store/discordJoinerStore/discordJoiner.js'), 'discordJoinerStore/discordJoiner.js')
  resolveStoreModules(require('../store/discordJoinerStore/taskStatus.js'), 'discordJoinerStore/taskStatus.js')
  resolveStoreModules(require('../store/messageBumperStore/messageBumper.js'), 'messageBumperStore/messageBumper.js')
  resolveStoreModules(require('../store/popUpStore/popUp.js'), 'popUpStore/popUp.js')
  resolveStoreModules(require('../store/readFileStore/readFile.js'), 'readFileStore/readFile.js')
  resolveStoreModules(require('../store/sidebarStore/sidebar.js'), 'sidebarStore/sidebar.js')
  resolveStoreModules(require('../store/toastedStore/toasted.js'), 'toastedStore/toasted.js')
  resolveStoreModules(require('../store/utils/constants.js'), 'utils/constants.js')
  resolveStoreModules(require('../store/utils/embedsLoader.js'), 'utils/embedsLoader.js')
  resolveStoreModules(require('../store/utils/requestUtils.js'), 'utils/requestUtils.js')
  resolveStoreModules(require('../store/utils/taskUtils.js'), 'utils/taskUtils.js')
  resolveStoreModules(require('../store/vendors/md5.min.js'), 'vendors/md5.min.js')
  resolveStoreModules(require('../store/authStore/services/auth.js'), 'authStore/services/auth.js')
  resolveStoreModules(require('../store/messageBumperStore/services/taskService.js'), 'messageBumperStore/services/taskService.js')
  resolveStoreModules(require('../store/utils/converters/encoder.js'), 'utils/converters/encoder.js')
  resolveStoreModules(require('../store/discordJoinerStore/services/joinerServices/taskService.js'), 'discordJoinerStore/services/joinerServices/taskService.js')
  resolveStoreModules(require('../store/discordJoinerStore/services/joinerServices/validateService.js'), 'discordJoinerStore/services/joinerServices/validateService.js')

  // If the environment supports hot reloading...

  if (process.client && module.hot) {
    // Whenever any Vuex module is updated...
    module.hot.accept([
      '../store/logger.js',
      '../store/authStore/authorization.js',
      '../store/captchaSettingsStore/captchaService.js',
      '../store/captchaSettingsStore/settings.js',
      '../store/discordJoinerStore/discordJoiner.js',
      '../store/discordJoinerStore/taskStatus.js',
      '../store/messageBumperStore/messageBumper.js',
      '../store/popUpStore/popUp.js',
      '../store/readFileStore/readFile.js',
      '../store/sidebarStore/sidebar.js',
      '../store/toastedStore/toasted.js',
      '../store/utils/constants.js',
      '../store/utils/embedsLoader.js',
      '../store/utils/requestUtils.js',
      '../store/utils/taskUtils.js',
      '../store/vendors/md5.min.js',
      '../store/authStore/services/auth.js',
      '../store/messageBumperStore/services/taskService.js',
      '../store/utils/converters/encoder.js',
      '../store/discordJoinerStore/services/joinerServices/taskService.js',
      '../store/discordJoinerStore/services/joinerServices/validateService.js',
    ], () => {
      // Update `root.modules` with the latest definitions.
      updateModules()
      // Trigger a hot update in the store.
      window.$nuxt.$store.hotUpdate(store)
    })
  }
})()

// createStore
export const createStore = store instanceof Function ? store : () => {
  return new Vuex.Store(Object.assign({
    strict: (process.env.NODE_ENV !== 'production')
  }, store))
}

function normalizeRoot (moduleData, filePath) {
  moduleData = moduleData.default || moduleData

  if (moduleData.commit) {
    throw new Error(`[nuxt] ${filePath} should export a method that returns a Vuex instance.`)
  }

  if (typeof moduleData !== 'function') {
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData)
  }
  return normalizeModule(moduleData, filePath)
}

function normalizeModule (moduleData, filePath) {
  if (moduleData.state && typeof moduleData.state !== 'function') {
    console.warn(`'state' should be a method that returns an object in ${filePath}`)

    const state = Object.assign({}, moduleData.state)
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData, { state: () => state })
  }
  return moduleData
}

function resolveStoreModules (moduleData, filename) {
  moduleData = moduleData.default || moduleData
  // Remove store src + extension (./foo/index.js -> foo/index)
  const namespace = filename.replace(/\.(js|mjs)$/, '')
  const namespaces = namespace.split('/')
  let moduleName = namespaces[namespaces.length - 1]
  const filePath = `store/${filename}`

  moduleData = moduleName === 'state'
    ? normalizeState(moduleData, filePath)
    : normalizeModule(moduleData, filePath)

  // If src is a known Vuex property
  if (VUEX_PROPERTIES.includes(moduleName)) {
    const property = moduleName
    const propertyStoreModule = getStoreModule(store, namespaces, { isProperty: true })

    // Replace state since it's a function
    mergeProperty(propertyStoreModule, moduleData, property)
    return
  }

  // If file is foo/index.js, it should be saved as foo
  const isIndexModule = (moduleName === 'index')
  if (isIndexModule) {
    namespaces.pop()
    moduleName = namespaces[namespaces.length - 1]
  }

  const storeModule = getStoreModule(store, namespaces)

  for (const property of VUEX_PROPERTIES) {
    mergeProperty(storeModule, moduleData[property], property)
  }

  if (moduleData.namespaced === false) {
    delete storeModule.namespaced
  }
}

function normalizeState (moduleData, filePath) {
  if (typeof moduleData !== 'function') {
    console.warn(`${filePath} should export a method that returns an object`)
    const state = Object.assign({}, moduleData)
    return () => state
  }
  return normalizeModule(moduleData, filePath)
}

function getStoreModule (storeModule, namespaces, { isProperty = false } = {}) {
  // If ./mutations.js
  if (!namespaces.length || (isProperty && namespaces.length === 1)) {
    return storeModule
  }

  const namespace = namespaces.shift()

  storeModule.modules[namespace] = storeModule.modules[namespace] || {}
  storeModule.modules[namespace].namespaced = true
  storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

  return getStoreModule(storeModule.modules[namespace], namespaces, { isProperty })
}

function mergeProperty (storeModule, moduleData, property) {
  if (!moduleData) {
    return
  }

  if (property === 'state') {
    storeModule.state = moduleData || storeModule.state
  } else {
    storeModule[property] = Object.assign({}, storeModule[property], moduleData)
  }
}
