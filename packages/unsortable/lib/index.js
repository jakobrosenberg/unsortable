import { DragDropManager, Draggable, Droppable } from '@dnd-kit/dom'
import { getNearestParentElementFromMap, hasValue, move, toArrayAccessors, toItemAccessor } from './utils'
import { pointerIntersection } from '@dnd-kit/collision'
import { Collections } from './plugins/collections'

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

const containerMap = new WeakMap()
const itemMap = new WeakMap()

export class Unsortable {
  /**
   * @param {UnsortableOptions=} options - Configuration options for Unsortable.
   */
  constructor(options) {
    this.options = { ...defaultOptions, ...options }
    this.manager = options?.manager || new DragDropManager(options?.managerOptions)
    this.manager.registry.register(Collections)
    this.addDraggable = this.addDraggable.bind(this)
    this.addDroppable = this.addDroppable.bind(this)
    this.addHandle = this.addHandle.bind(this)
    this._onDragOver = this._onDragOver.bind(this)
    this._applyRegisterWarning(this.manager.registry.register)
    if (this.options.autoAttach) this.attach()
  }

  attach() {
    console.debug('Unsortable: attaching to drag manager')
    this.manager.monitor.addEventListener('dragover', this._onDragOver)
  }

  destroy() {
    console.debug('Unsortable: destroying')
    this.manager.destroy()
  }

  _applyRegisterWarning(_register) {    
    this.manager.registry.register = (ent) => {
      const existing = ent.constructor.name === 'Droppable2' && this.manager.registry.droppables.get(ent.id)
      const isMix = existing && ent.data?._unsortable?.isContainer !== existing?.data?._unsortable?.isContainer
      if (isMix)
        console.warn('Unsortable: A container and item with the same ID have been registered.', [ent, existing])
      return _register.bind(this.manager.registry)(ent)
    }
  }

  _onDragOver(event) {
    if (!event.operation.target) return
    console.debug('Unsortable: drag over event', event)
    event.operation.source.element.removeAttribute('popover')

    if (event.operation.target.data._unsortable.isContainer) return this.handleMove(event)
    else return this.handleSort(event)
  }

  handleMove(event) {
    console.debug('Unsortable: handling move', event, this.manager)
    const source = getNearestParentElementFromMap(event.operation.source.element, containerMap)

    const sourceItem = event.operation.source.data._unsortable.item()
    const sourceItems = source.items.get()
    const setSourceItems = source.items.set

    const targetItems = event.operation.target.data._unsortable.items.get()
    const setTargetItems = event.operation.target.data._unsortable.items.set

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

    const sourceItem = event.operation.source.data._unsortable.item()
    const sourceItems = source.items.get()
    const targetItem = event.operation.target.data._unsortable.item()
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
   * @param {any=} options.id - The unique identifier for the draggable element.
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
        id: options.id ?? options.item(),
        accept: options.accept ?? options.type,
        collisionDetector: pointerIntersection,
        ...options?.droppableOptions,
        element,
        data: { ...options?.droppableOptions?.data, _unsortable: { ...options, isContainer: false } },
      },
      this.manager,
    )

    const draggable = new Draggable(
      {
        type: options.type,
        id: options.id ?? options.item(),
        element,
        ...options?.draggableOptions,
        data: {
          ...options,
          ...options?.draggableOptions?.data,
          _unsortable: { droppable, ...options, isContainer: false },
        },
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
   * @param {any=} options.id - The unique identifier for the droppable element.
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
        ...options.droppableOptions,
        id: options.id ?? Math.random().toString(36).substring(2, 15),
        element,
        accept: options.accept,
        data: { ...options?.droppableOptions?.data, _unsortable: { ...options, isContainer: true } },
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
