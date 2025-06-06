import { DragDropManager, Draggable, Droppable } from '@dnd-kit/dom'
import { hasValue, move } from './utils'

/**
 * @typedef {Object} UnsortableOptions
 * @property {boolean} [autoAttach=true] - Whether to automatically attach the Unsortable instance to the drag manager.
 */

/**
 * @type {UnsortableOptions}
 */
const defaultOptions = {
  autoAttach: true,
}

export class Unsortable {
  /**
   * @param {UnsortableOptions} options - Configuration options for Unsortable.
   */
  constructor(options) {
    this.options = { ...defaultOptions, ...options }
    this.manager = new DragDropManager()
    this.addDraggable = this.addDraggable.bind(this)
    this._onDragOver = this._onDragOver.bind(this)

    if (this.options.autoAttach) this.attach()
  }

  attach() {
    console.debug('Unsortable: attaching to drag manager')
    this.manager.monitor.addEventListener('dragover', this._onDragOver)
  }

  destroy() {
    console.debug('Unsortable: destroying')
    this.manager.monitor.removeEventListener('dragover', this._onDragOver)
  }

  _onDragOver(event) {
    return this.handleSort(event)
  }

  handleSort(event) {
    if (!event.operation.target) return
    const sourceItem = event.operation.source.data.getItem()
    const sourceItems = event.operation.source.data.getItems()
    const setSourceItems = event.operation.source.data.setItems
    const targetItem = event.operation.target.data.getItem()
    const targetItems = event.operation.target.data.getItems()
    const settargetItems = event.operation.target.data.setItems

    event.operation.source.element['style'].display = 'block'

    if (sourceItem === targetItem) return
    const isSameList = sourceItems === targetItems

    const oldIndex = sourceItems.indexOf(sourceItem)
    const newIndex = targetItems.indexOf(targetItem)

    if (isSameList) {
      setSourceItems([...move([...sourceItems], oldIndex, newIndex)])
      return
    }

    // If the items are in different lists, we need to remove the item from the old list and add it to the new list
    // check we're not moving the item into its own child
    if (newIndex !== -1 && !hasValue(sourceItem, targetItems)) {
      setSourceItems(sourceItems.filter((item) => item !== sourceItem))
      const _targetItems = [...targetItems]
      _targetItems.splice(newIndex, 0, sourceItem)
      settargetItems(_targetItems)
    }
  }

  addDraggable(element, options) {
    const draggable = new Draggable(
      {
        id: options.getItem(),
        element,
        data: options,
        type: 'item', // Only droppables accepting 'item' type will be valid targets
      },
      this.manager,
    )

    const droppable = new Droppable(
      {
        id: options.getItem(), // Optional - the group this item belongs to
        element,
        data: options,
        accept: ['item'],
        type: 'item', // Only items with the same type will be valid targets
      },
      this.manager,
    )
    return {
      draggable,
      droppable,
      destroy() {
        draggable.destroy()
        droppable.destroy()
      },
    }
  }
}
