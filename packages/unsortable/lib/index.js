import { DragDropManager, Draggable, Droppable } from '@dnd-kit/dom'
import { getNearestParentElementFromMap, hasValue, move } from './utils'

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

const elemMap = new WeakMap()

export class Unsortable {
  /**
   * @param {UnsortableOptions=} options - Configuration options for Unsortable.
   */
  constructor(options) {
    this.options = { ...defaultOptions, ...options }
    this.manager = new DragDropManager()
    this.addDraggable = this.addDraggable.bind(this)
    this.addDroppable = this.addDroppable.bind(this)
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
    if (!event.operation.target) return
    event.operation.source.element['style'].display = 'block'
    if (event.operation.target.data.isContainer) return this.handleMove(event)
    else return this.handleSort(event)
  }

  handleMove(event) {
    const source = getNearestParentElementFromMap(event.operation.source.element, elemMap)

    const sourceItem = event.operation.source.data.getItem()
    // const sourceItems = event.operation.source.data.getItems()
    // const setSourceItems = event.operation.source.data.setItems
    const sourceItems = source.getItems()
    const setSourceItems = source.setItems

    const targetItems = event.operation.target.data.getItems()
    const setTargetItems = event.operation.target.data.setItems

    const isAlreadyInTargetItems = targetItems.includes(sourceItem)
    if (isAlreadyInTargetItems) return

    // update the source items
    setSourceItems(sourceItems.filter((item) => item !== sourceItem))
    setTargetItems([...targetItems, sourceItem])
  }

  handleSort(event) {
    const source = getNearestParentElementFromMap(event.operation.source.element, elemMap)
    const target = getNearestParentElementFromMap(event.operation.target.element, elemMap)

    const sourceItem = event.operation.source.data.getItem()
    const sourceItems = source.getItems()
    const targetItem = event.operation.target.data.getItem()
    const targetItems = target.getItems()

    if (sourceItem === targetItem) return
    const isSameList = sourceItems === targetItems

    const oldIndex = sourceItems.indexOf(sourceItem)
    const newIndex = targetItems.indexOf(targetItem)

    if (isSameList) {
      source.setItems([...move([...sourceItems], oldIndex, newIndex)])
      return
    }

    // If the items are in different lists, we need to remove the item from the old list and add it to the new list
    // check we're not moving the item into its own child
    if (newIndex !== -1 && !hasValue(sourceItem, targetItems)) {
      source.setItems(sourceItems.filter((item) => item !== sourceItem))
      const _targetItems = [...targetItems]
      _targetItems.splice(newIndex, 0, sourceItem)
      target.setItems(_targetItems)
    }
  }

  addDraggable(element, options) {
    const draggable = new Draggable(
      {
        ...options,
        ...options?.draggable,
        id: options.getItem(),
        element,
        data: options,
      },
      this.manager,
    )

    const droppable = new Droppable(
      {
        ...options,
        ...options?.droppable,
        id: options.getItem(),
        element,
        data: { ...options, isContainer: false },
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

  addDroppable(element, options) {
    elemMap.set(element, options)
    const droppable = new Droppable(
      {
        ...options,
        ...options?.droppable,
        id: options.getItems(),
        element,
        data: { ...options, isContainer: true },
      },
      this.manager,
    )
    return {
      droppable,
      destroy() {
        droppable.destroy()
      },
    }
  }
}
