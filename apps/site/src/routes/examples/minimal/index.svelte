<script>
  import JSONViewer from '@/components/JsonViewer.svelte'
  import { Unsortable } from 'unsortable/svelte'
  
  export const data = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' },
    { name: 'Item 4' },
    { name: 'Item 5' },
  ]

  let items = $state(data)
  const { addDraggable } = new Unsortable({})
</script>

<JSONViewer json={items} />
<div class="flex gap-8 z-10">
  {#each items as item, index (item)}
    <div
      class="my-card"
      use:addDraggable={{ getItem: () => item, getItems: () => items, setItems: (_items) => (items = _items), index }}
    >
      <h2>{item.name}</h2>
    </div>
  {/each}
</div>

