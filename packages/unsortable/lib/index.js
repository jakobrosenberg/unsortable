import { DragDropManager, Draggable, Droppable } from '@dnd-kit/dom'
import { getNearestParentElementFromMap, hasValue, move, toArrayAccessors, toItemAccessor } from './utils'
// import { closestCenter, pointerIntersection, directionBiased } from '@dnd-kit/collision'

/**
 * @typedef {Object} UnsortableOptions
 * @property {boolean} [autoAttach=true] - Whether to automatically attach the Unsortable instance to the drag manager.
 * @property {import('@dnd-kit/dom').DragDropManagerInput} [managerOptions={}] - Options for the DragDropManager instance.
 * @property {import('@dnd-kit/dom').DragDropManager} [manager=undefined] - An instance of DragDropManager to use. If not provided, a new instance will be created.
 */

/**
 * @type {UnsortableOptions}
 */
const defaultOptions = {
  autoAttach: true,
}

let lastDroppable = null
let lastDroppableOriginalState = null

const containerMap = new WeakMap()
const itemMap = new WeakMap()

export class Unsortable {
  /**
   * @param {UnsortableOptions=} options - Configuration options for Unsortable.
   */
  constructor(options) {
    this.options = { ...defaultOptions, ...options }
    this.manager = options?.manager || new DragDropManager(options?.managerOptions)
    this.addDraggable = this.addDraggable.bind(this)
    this.addDroppable = this.addDroppable.bind(this)
    this.addHandle = this.addHandle.bind(this)
    this._onDragOver = this._onDragOver.bind(this)
    this._disableOwnDroppable = this._disableOwnDroppable.bind(this)
    this._restoreLastDroppable = this._restoreLastDroppable.bind(this)

    if (this.options.autoAttach) this.attach()
  }

  attach() {
    console.debug('Unsortable: attaching to drag manager')
    this.manager.monitor.addEventListener('dragover', this._onDragOver)
    this.manager.monitor.addEventListener('dragover', this._disableOwnDroppable)
    this.manager.monitor.addEventListener('beforedragstart', this._disableOwnDroppable)
    this.manager.monitor.addEventListener('dragend', this._restoreLastDroppable)
  }

  _disableOwnDroppable(e) {
    const droppable = e.operation.source.data.droppable
    console.debug('Unsortable: disabling own droppable', droppable, lastDroppable)
    if (lastDroppable && droppable !== lastDroppable) this._restoreLastDroppable()
    lastDroppableOriginalState = droppable.disabled
    droppable.disabled = true
    lastDroppable = droppable
  }

  _restoreLastDroppable() {
    console.debug('Unsortable: restoring last droppable', lastDroppable, lastDroppableOriginalState)
    lastDroppable.disabled = lastDroppableOriginalState
    lastDroppable = null
    lastDroppableOriginalState = null
  }

  destroy() {
    console.debug('Unsortable: destroying')
    this.manager.destroy()
  }

  _onDragOver(event) {
    if (!event.operation.target) return
    console.debug('Unsortable: drag over event', event)
    event.operation.source.element['style'].display = 'block'

    if (event.operation.target.data.isContainer) return this.handleMove(event)
    else return this.handleSort(event)
  }

  handleMove(event) {
    console.debug('Unsortable: handling move', event, this.manager)
    const source = getNearestParentElementFromMap(event.operation.source.element, containerMap)

    const sourceItem = event.operation.source.data.item()
    const sourceItems = source.items.get()
    const setSourceItems = source.items.set

    const targetItems = event.operation.target.data.items.get()
    const setTargetItems = event.operation.target.data.items.set

    const isAlreadyInTargetItems = targetItems.includes(sourceItem)
    if (isAlreadyInTargetItems) return

    // update the source items
    setSourceItems(sourceItems.filter((item) => item !== sourceItem))
    setTargetItems([...targetItems, sourceItem])
  }

  handleSort(event) {
    console.debug('Unsortable: handling sort', event)
    const source = getNearestParentElementFromMap(event.operation.source.element, containerMap)
    const target = getNearestParentElementFromMap(event.operation.target.element, containerMap)

    const sourceItem = event.operation.source.data.item()
    const sourceItems = source.items.get()
    const targetItem = event.operation.target.data.item()
    const targetItems = target.items.get()

    if (sourceItem === targetItem) {
      console.debug('Unsortable: source item is the same as target item, no action taken')
      return
    }
    const isSameList = sourceItems === targetItems

    const oldIndex = sourceItems.indexOf(sourceItem)
    const newIndex = targetItems.indexOf(targetItem)

    console.debug('Unsortable: oldIndex', oldIndex, 'newIndex', newIndex)

    if (isSameList) {
      source.items.set([...move([...sourceItems], oldIndex, newIndex)])
      return
    }

    // If the items are in different lists, we need to remove the item from the old list and add it to the new list
    // check we're not moving the item into its own child
    if (newIndex !== -1 && !hasValue(sourceItem, targetItems)) {
      source.items.set(sourceItems.filter((item) => item !== sourceItem))
      const _targetItems = [...targetItems]
      _targetItems.splice(newIndex, 0, sourceItem)
      target.items.set(_targetItems)
    }
  }

  /**
   * Adds a draggable element to the Unsortable instance.
   * @template T
   * @param {HTMLElement} element
   * @param {Object} options
   * @param {import('@dnd-kit/dom').DraggableInput['type']=} [options.type] - The type of the draggable element.
   * @param {import('@dnd-kit/dom').DroppableInput['accept']=} [options.accept] - The accepted types for the droppable element.
   * @param {import('@dnd-kit/dom').DraggableInput=} options.draggableOptions - Options for the Draggable instance.
   * @param {import('@dnd-kit/dom').DroppableInput=} options.droppableOptions - Options for the Droppable instance.
   * @param {T | (()=>T) } options.item - An accessor for the item associated with the draggable.
   */
  addDraggable(element, options) {
    options.item = toItemAccessor(options.item)

    console.debug('unsortable: draggable options', options)

    const droppable = new Droppable(
      {
        accept: options.accept || options.type,
        ...options?.droppableOptions,
        id: options.item(),
        element,
        data: { ...options, ...options?.droppableOptions?.data, isContainer: false },
      },
      this.manager,
    )

    const draggable = new Draggable(
      {
        type: options.type,
        id: options.item(),
        element,
        ...options?.draggableOptions,
        data: { ...options, ...options?.draggableOptions?.data, droppable, isContainer: false },
      },
      this.manager,
    )

    itemMap.set(element, { ...options, draggable, droppable })

    return {
      draggable,
      droppable,
      options,
      destroy() {
        draggable.destroy()
        droppable.destroy()
      },
    }
  }

  /**
   * Adds a draggable element to the Unsortable instance.
   * @template {any[]} T
   * @param {HTMLElement} element
   * @param {Object} options
   * @param {import('@dnd-kit/dom').DroppableInput['accept']=} [options.accept] - The accepted types for the droppable element.
   * @param {import('@dnd-kit/dom').DroppableInput=} options.droppableOptions - Options for the Droppable instance.
   * @param {T | (() => T) | { set: ((T) => void), get: (() => T)}  } options.items - An accessor for the items associated with the droppable.
   * @param {(T) => void=} [options.setItems] - A function to set the items in the droppable.
   */
  addDroppable(element, options) {
    options.items = toArrayAccessors(options.items)
    options.items.set = options.setItems || options.items.set

    const droppable = new Droppable(
      {
        ...options?.droppableOptions,
        id: options.items.get(),
        element,
        accept: options.accept,
        data: { ...options, ...options?.droppableOptions?.data, isContainer: true },
      },
      this.manager,
    )

    containerMap.set(element, options)

    return {
      droppable,
      options,
      destroy() {
        droppable.destroy()
      },
    }
  }

  addHandle(element) {
    requestAnimationFrame(() => {
      const nearest = getNearestParentElementFromMap(element, itemMap)
      nearest.draggable.handle = element
    })
  }
}
