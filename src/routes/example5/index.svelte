<script>
  import { flip } from 'svelte/animate'
  import { data } from './data.js'

  import { DragDropManager, Draggable, Droppable } from '@dnd-kit/dom'

  let items = $state(data)
  const manager = new DragDropManager()

  manager.monitor.addEventListener('dragover', (event) => {
    event.operation.source.element.style.display = 'block'
    handleSort(
      event.operation.source.data.getItem(),
      event.operation.source.data.getItems(),
      event.operation.source.data.setItems,
      event.operation.target.data.getItem(),
      event.operation.target.data.getItems(),
      event.operation.target.data.setItems,
      event.operation.source,
    )
  })

  manager.monitor.addEventListener('dragstart', (event) => {
    // console.log('dragstart', event)
  })

  const move = (arr, from, to) => {
    arr.splice(to, 0, arr.splice(from, 1)[0])
  }

  function hasValue(obj, target) {
    if (obj === target) return true
    if (Array.isArray(obj)) return obj.some((v) => hasValue(v, target))
    if (obj && typeof obj === 'object') return Object.values(obj).some((v) => hasValue(v, target))
    return false
  }

  const handleSort = (oldItem, oldItems, setOldItems, newItem, newItems, setNewItems, source) => {
    // console.log('source', source.element.innerHTML)
    console.log('handleSort', { oldItem, newItem, oldItems, newItems })
    if (oldItem === newItem) return
    const isSameList = oldItems === newItems

    const oldIndex = oldItems.indexOf(oldItem)
    const newIndex = newItems.indexOf(newItem)

    if (isSameList) {
      // If the items are in the same list, we can just move the item

      move(oldItems, oldIndex, newIndex)
      setOldItems([...oldItems])
      return
    }

    // If the items are in different lists, we need to remove the item from the old list and add it to the new list
    if (newIndex !== -1 && !hasValue(oldItem, newItems)) {
      console.log('Moving item from oldItems to newItems', newIndex)
      setOldItems(oldItems.filter((item) => item !== oldItem))
      const _newItems = [...newItems]
      _newItems.splice(newIndex, 0, oldItem)
      setNewItems(_newItems)
    }
  }

  const trackItem = (element, options) => {
    new Draggable(
      {
        id: options.getItem(),
        element,
        data: options,
        type: 'item', // Only droppables accepting 'item' type will be valid targets
      },
      manager,
    )

    new Droppable(
      {
        id: options.getItem(), // Optional - the group this item belongs to
        element,
        data: options,
        accept: ['item'],
        type: 'item', // Only items with the same type will be valid targets
      },
      manager,
    )
  }

  // const trackContainer = (element, options) => {
  //   // weakMap.set(element, options)
  //   new Droppable(
  //     {
  //       id: options.getItem().id,
  //       element,
  //       data: options,
  //       type: 'item', // Only droppables accepting 'item' type will be valid targets
  //     },
  //     manager,
  //   )
  // }
</script>

<div class="container">
  {#each items as item, index (item)}
    <div
      animate:flip={{ duration: 100 }}
      class="item {item.name}"
      use:trackItem={{ getItem: () => item, getItems: () => items, setItems: (_items) => (items = _items), index }}
    >
      <h2>{item.name}</h2>
      <div class="children container">
        {#each item.children as child, index (child.id)}
          <div
            class="child-item {child.name}"
            use:trackItem={{
              getItem: () => child,
              getItems: () => item.children,
              setItems: (items) => (item.children = items),
            }}
          >
            <h3>{child.name}</h3>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

{JSON.stringify(items, null, 2)}

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .item {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 20px;
    width: 150px;
    text-align: center;
    cursor: grab;
    /* text should not be selectable */
    user-select: none;
  }

  .children {
    background: white;
    display: flex;
    flex-direction: column;
    /* gap: 10px; */
    /* margin-top: 10px; */
    padding: 4px;
    min-height: 112px;
  }
  .child-item {
    background-color: #e0e0e0;
    border: 1px solid #bbb;
    padding: 10px;
    width: 100px;
    text-align: center;
    cursor: grab;
    user-select: none;
  }

  .item:active {
    cursor: grabbing;
  }
</style>
