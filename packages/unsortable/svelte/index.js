import { Unsortable } from '../lib'
import { onDestroy } from 'svelte'

/**
 * @typedef {Object} UnsortableSvelteOptions
 * @property {boolean} [autoAttach=true] - Whether to automatically attach the Unsortable instance to the drag manager.
 */

/**
 * @type {UnsortableSvelteOptions}
 */
const defaultOptions = {
  autoAttach: true,
}

class UnsortableSvelte extends Unsortable {
  /**
   * @param {UnsortableSvelteOptions=} options - Configuration options for Unsortable.
   */
  constructor(options) {
    super({ ...defaultOptions, ...options })
    onDestroy(() => this.destroy())
  }
}

export { UnsortableSvelte as Unsortable }
