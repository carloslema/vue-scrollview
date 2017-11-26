// @flow
import type { State } from '../../types'

/**
 * Creates the scroll listener function.
 *
 * @param {Object} state - ScrollView tracking state.
 * @param {Array} fns - Functions to call on scroll.
 * @returns null
 */
export const createScrollListener = (state: State, fns: Array<?Function>) => {
  return () => {
    window.requestAnimationFrame(() => {
      fns.forEach(fn => fn && fn(state))
    })
  }
}

/**
 * Checks if a component is visible in the viewport.
 *
 * @param {Object} state - ScrollView tracking state.
 * @returns null
 */
export const checkInViewport = (state: State) => {
  state.locations.forEach(({ position, scrollview, component }) => {
    const { offset } = state.scrollviews[scrollview]
    const withinTopBounds = (position.bottom - offset) - window.pageYOffset > 0
    const withinBottomBounds = (position.top + offset) - window.pageYOffset <= window.innerHeight
    state.tracking[scrollview][component] = (withinTopBounds && withinBottomBounds)
  })
}

/**
 * Emits events on ScrollView $vms to update tracking for children.
 *
 * @param {Object} state - ScrollView tracking state.
 * @returns null
 */
export const broadcastScrollviews = ({ scrollviews, tracking }: State) => {
  Object.keys(scrollviews)
    .forEach(scrollview => scrollviews[scrollview].$emit('tracking:update', tracking[scrollview]))
}

/**
 * Resets all components being tracked
 *
 * @param {Object} state - ScrollView tracking state.
 * @returns null
 */
export const resetScrollviews = (state: State) => {
  const { scrollviews } = state

  state.scrollviews = {}
  state.tracking = {}
  state.locations = []

  Object.keys(scrollviews)
    .forEach((key) => scrollviews[key].$emit('tracking:reset'))

  if (state.scrollListener) state.scrollListener()
}
