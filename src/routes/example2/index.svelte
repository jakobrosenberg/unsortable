<script>
  import { Draggable } from '@shopify/draggable'

  // import { draggable, droppable } from '../../sortier.js'
  import { data } from './data'
  //   import { draggable } from '@neodrag/svelte'

  let items = $state(data)

  const weakMap = new WeakMap()
  const track = (el, options) => {
    weakMap.set(el, options)
  }

  setTimeout(() => {
    const draggable = new Draggable(document.querySelectorAll('.container'), {
      draggable: '.item, .child-item',
    })

    draggable.on('drag:start', (event) => {
      // console.log('Drag started:', event)
    })
    draggable.on('drag:over:container', (event) => {
      console.log('Drag over container:', event)
    })
    draggable.on('drag:over', (event) => {
      // console.log('Drag over:', event.data.over)
      console.log('do', weakMap.get(event.data.over))
    })
  }, 100)
</script>

<div class="container" use:track={{ items }}>
  {#each items as item (item)}
    <div class="item {item.name}" use:track={{ item }}>
      <h2>{item.name}</h2>
      <div class="children container" use:track={{ items: item.children }}>
        {#each item.children as child (child.id)}
          <div class="child-item {child.name}" use:track={{ item: child }}>
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
