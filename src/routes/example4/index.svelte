<script>
  import { flip } from 'svelte/animate'
  import { draggable, droppable } from '../../sortier.js'
  import { data } from './data'

  import { DragDropManager } from '@dnd-kit/dom'
  import { Sortable } from '@dnd-kit/dom/sortable'

  let items = $state(data)
  const weakMap = new WeakMap()
  const track = (element, options) => {
    weakMap.set(element, options)
    if (options.item)
      new Sortable(
        {
          id: options.item.id,
          group: options.group, // Optional - the group this item belongs to
          index: options.index, // Required - the position in the list
          element,
        },
        manager,
      )
  }
  const manager = new DragDropManager()
</script>

<div class="container" use:track={{ items }}>
  {#each items as item, index (item)}
    <div class="item {item.name}" use:track={{ item, index }}>
      <h2>{item.name}</h2>
      <div class="children container" use:track={{ items: item.children }}>
        {#each item.children as child, index (child.id)}
          <div class="child-item {child.name}" use:track={{ item: child, index, group: item.id }}>
            <h3>{child.name}</h3>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

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
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
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
