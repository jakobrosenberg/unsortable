<script>
  import { Draggable } from '@shopify/draggable'
  import { flip } from "svelte/animate";

  // import { draggable, droppable } from '../../sortier.js'
  import { data } from './data'
  //   import { draggable } from '@neodrag/svelte'

  let items = $state(data)

  setTimeout(() => {
    // items = items.reverse()
  }, 1000)

  // setTimeout(() => {
  //   const backup = items
  //   items = items.slice(0, 1)
  //   setTimeout(() => {
  //     items = backup
  //   }, 1000)
  // }, 1000)

</script>

<div class="container">
  {#each items as item (item)}
    <div class="item {item.name}" animate:flip>
      <h2>{item.name}</h2>
      <div class="children container">
        {#each item.children as child (child.id)}
          <div class="child-item {child.name}">
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
