<script>
  import { flip } from 'svelte/animate'
  import { data } from './data.js'
  import { Unsortable } from 'unsortable/svelte'
  import JSONViewer from '@/components/JsonViewer.svelte'

  let items = $state(data)

  const { addDraggable, addDroppable } = new Unsortable()
</script>

<div
  class="flex-list flex-wrap mx-20"
  use:addDroppable={{
    accept: ['top'],
    items: { get: () => items, set: (r) => (items = r) },
  }}
>
  {#each items as item, index (item)}
    <div
      animate:flip={{ duration: 300 }}
      class="card bg-base-100 shadow-xl p-4"
      use:addDraggable={{
        item: { get: () => item },
        index,
        accept: ['top'],
        type: 'top',
      }}
    >
      <h2>{item.name}</h2>
      <div
        class="shadow-inner bg-base-200 p-8 mt-4 flex flex-col gap-4"
        use:addDroppable={{
          accept: ['bottom'],
          items: { get: () => item.children, set: (r) => (item.children = r) },
        }}
      >
        <p class="text-sm">Drag items here</p>
        <div class="flex flex-wrap gap-4">
          {#each item.children as child, index (child.id)}
            <div
              animate:flip={{ duration: 300 }}
              class="my-card"
              use:addDraggable={{ item: { get: () => child }, accept: ['bottom'], type: 'bottom' }}
            >
              <h3>{child.name}</h3>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/each}
</div>

<JSONViewer json={items} />
