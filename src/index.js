// @flow
import type { State } from '../types'
import { _public, _private } from './core/api'
import ScrollView from './ScrollView'
let $scrollview

function plugin (Vue: Function, options: Object = {}) {
  const throttle = options.throttle || 50
  const callbacks = options.callbacks || []

  const initialState: State = {
    callbacks,
    throttle,
    scrollviews: {},
    locations: [],
    tracking: {},
    bottom: 0
  }

  $scrollview = {
    state: initialState,
    ..._private(initialState),
    ..._public(initialState)
  }

  Vue.component('ScrollView', ScrollView)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
  window.Vue.$scrollview = $scrollview
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  ScrollView,
  $scrollview,
  version
}
