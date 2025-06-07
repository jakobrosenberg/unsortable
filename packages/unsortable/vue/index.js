import { Unsortable } from '../lib'
import { onUnmounted } from 'vue'

/**
 * @typedef {Object} UnsortableVueOptions
 * @property {boolean} [autoAttach=true] - Whether to automatically attach the Unsortable instance to the drag manager.
 */

/**
 * @type {UnsortableVueOptions}
 */
const defaultOptions = {
  autoAttach: true,
}

class UnsortableSvelte extends Unsortable {
  /**
   * @param {UnsortableVueOptions=} options - Configuration options for Unsortable.
   */
  constructor(options) {
    super({ ...defaultOptions, ...options })
    onUnmounted(() => this.destroy())
  }
}

export { UnsortableSvelte as Unsortable }
