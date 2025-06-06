<script>
  import { flip } from 'svelte/animate'
  import { data } from './data.js'
  import { Unsortable } from 'unsortable/svelte'
  import JSONViewer from '@/components/JsonViewer.svelte'

  let items = $state(data)

  const { addDraggable, addDroppable } = new Unsortable()
</script>

<div
  class="flex flex-wrap gap-8 z-10 mx-20"
  use:addDroppable={{
    accept: ['top'],
    getItems: () => items,
    setItems: (i) => (items = i),
  }}
>
  {#each items as item, index (item)}
    <div
      animate:flip={{ duration: 100 }}
      class="card bg-base-100 shadow-xl p-4"
      use:addDraggable={{
        getItem: () => item,
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
          getItems: () => item.children,
          setItems: (children) => (item.children = children),
        }}
      >
        <p class="text-sm">Drag items here</p>
        <div class="flex flex-wrap gap-4">
          {#each item.children as child, index (child.id)}
            <div class="my-card" use:addDraggable={{ getItem: () => child, accept: ['bottom'], type: 'bottom' }}>
              <h3>{child.name}</h3>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/each}
</div>

<JSONViewer json={items} />
