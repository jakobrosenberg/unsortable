import { Droppable, Plugin } from '@dnd-kit/abstract'



export class Collections extends Plugin {
  disabledDroppables = {
    /** @type {Droppable?} */
    item: null,
    /** @type {Droppable?} */
    collection: null,
  }

  constructor(manager) {
    super(manager)
    this.registerEffect(() => {
      this.manager.monitor.addEventListener('beforedragstart', (e) => this.disableDroppables(e))
      this.manager.monitor.addEventListener('dragover', (e) => this.disableDroppables(e))
    })
  }

  /** @param {{operation: import('@dnd-kit/abstract').DragOperation}} e */
  disableDroppables(e) {
    const { target, source } = e.operation
    if (source?.data._unsortable?.droppable === target) this.disableDroppable('item', source.data._unsortable.droppable)
    else if (target?.data._unsortable.items?.get().includes(source?.data._unsortable.item()))
      this.disableDroppable('collection', target)
  }

  /**
   *
   * @param {keyof Collections['disabledDroppables']} field
   * @param {Droppable=} droppable
   */
  disableDroppable(field, droppable) {
    if (droppable?.disabled || droppable === this.disabledDroppables[field]) {
      console.log('droppable already disabled or unregistered', field, droppable)
      return
    }
    if (this.disabledDroppables[field]) {
      console.log('restoring previous droppable', this.disabledDroppables[field])
      this.disabledDroppables[field].disabled = false
      this.disabledDroppables[field] = null
    }
    if (droppable) {
      console.log('disabling droppable', field, droppable)
      droppable.disabled = true
      this.disabledDroppables[field] = droppable
    }
  }
}
