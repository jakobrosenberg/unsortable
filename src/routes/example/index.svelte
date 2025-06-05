<script>
    import { flip } from 'svelte/animate'
  import { draggable, droppable } from '../../sortier.js'
  import { data } from './data'
  
  //   import { draggable } from '@neodrag/svelte'

  let items = $state(data)

  // setTimeout(() => {
  //   items = items.reverse()
  // }, 1000)

  // setTimeout(() => {
  //   const backup = items
  //   items = items.slice(0, 1)
  //   setTimeout(() => {
  //     items = backup
  //   }, 1000)
  // }, 1000)
  
</script>

<div class="container" use:droppable={{ getItems: () => items }} >
  {#each items as item (item.id)}
    <div
    animate={flip}
      class="item {item.name}"
      use:draggable={{
        getId: () => item.id,
        getItem: ()=> item,
        getItems: () => items,
        setItems: (_items) => (items = _items),
      }}
    >
      <h2>{item.name}</h2>
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

  .item:active {
    cursor: grabbing;
  }
</style>
