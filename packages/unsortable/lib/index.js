import { DragDropManager, Draggable, Droppable } from '@dnd-kit/dom'
import { hasValue, move } from './utils'


export class Unsortable {
  constructor() {
    this.manager = new DragDropManager()
    this.manager.monitor.addEventListener('dragover', (event) => this.handleSort(event))
    this.addDraggable = this.addDraggable.bind(this)
  }

  handleSort(event) {
    if(!event.operation.target) return
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
