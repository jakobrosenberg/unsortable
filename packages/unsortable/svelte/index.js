import { Unsortable } from '../lib'
import { onDestroy } from 'svelte'

class UnsortableSvelte extends Unsortable {
  /** @param {ConstructorParameters<typeof Unsortable>[0]=} options */
  constructor(options) {
    super(options)
    onDestroy(() => this.destroy())
  }
}

export { UnsortableSvelte as Unsortable }
