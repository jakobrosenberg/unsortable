<script>
  import { Unsortable } from 'unsortable/svelte'

  export const data = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' },
    { name: 'Item 4' },
    { name: 'Item 5' },
  ]

  let items = $state(data)

  const { addDraggable, addDroppable } = new Unsortable({})
</script>

<div class="wrapper">
  <p class="description">Vertical list using Svelte + Unsortable</p>
  <div class="list" use:addDroppable={{ items }}>
    {#each items as item (item)}
      <div class="card" use:addDraggable={{ item }}>
        <h2>{item.name}</h2>
      </div>
    {/each}
  </div>
</div>