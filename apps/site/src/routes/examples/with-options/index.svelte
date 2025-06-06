<script>
  import { flip } from 'svelte/animate'
  import { Unsortable } from 'unsortable/svelte'
  import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers'

  import JSONViewer from '@/components/JsonViewer.svelte'

  export const data = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' },
    { name: 'Item 4' },
    { name: 'Item 5' },
  ]

  let items = $state(data)
  const unsortable = new Unsortable()
  const { addDraggable, addDroppable, addHandle } = unsortable

  unsortable.manager.modifiers = [RestrictToVerticalAxis]
  unsortable.manager.monitor.addEventListener('dragstart', (e) => e.operation.source.element.classList.add('shadow-lg'))
  unsortable.manager.monitor.addEventListener('dragend', (e) =>
    e.operation.source.element.classList.remove('shadow-lg'),
  )
</script>

<p class="demo-description">
  This demo highlights three features: a custom drag handle, vertical-only movement, and a shadow effect while dragging.
</p>

<div class="flex-list flex-col" use:addDroppable={{ items: { get: () => items, set: (r) => (items = r) } }}>
  {#each items as item (item)}
    <div
      animate:flip={{ duration: 150 }}
      class="my-flat-card transition-all relative"
      use:addDraggable={{ item: { get: () => item } }}
    >
      <div use:addHandle class="absolute left-2 top-1 font-bold cursor-grab">⋮⋮</div>
      <h2>{item.name}</h2>
    </div>
  {/each}
</div>

<JSONViewer json={items} />
