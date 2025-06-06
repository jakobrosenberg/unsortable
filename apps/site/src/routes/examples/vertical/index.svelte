<script>
  import { flip } from 'svelte/animate'
  import { Unsortable } from 'unsortable/svelte'

  import JSONViewer from '@/components/JsonViewer.svelte'

  export const data = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' },
    { name: 'Item 4' },
    { name: 'Item 5' },
  ]

  let items = $state(data)
  const { addDraggable, addDroppable } = new Unsortable()
</script>

<div
  class="flex flex-col gap-8 z-10"
  use:addDroppable={{ getItems: () => items, setItems: (_items) => (items = _items) }}
>
  {#each items as item (item)}
    <div animate:flip={{ duration: 150 }} class="my-card" use:addDraggable={{ getItem: () => item }}>
      <h2>{item.name}</h2>
    </div>
  {/each}
</div>

<JSONViewer json={items} />
