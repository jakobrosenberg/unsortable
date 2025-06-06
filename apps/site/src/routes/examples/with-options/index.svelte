<script>
  import { flip } from 'svelte/animate'
  import { Unsortable } from 'unsortable/svelte'
  import {RestrictToVerticalAxis} from '@dnd-kit/abstract/modifiers';

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
  const { addDraggable, addDroppable } = unsortable
  
  
  unsortable.manager.modifiers = [RestrictToVerticalAxis]
  unsortable.manager.monitor.addEventListener('dragstart', (e) => e.operation.source.element.classList.add('shadow-lg'))
  unsortable.manager.monitor.addEventListener('dragend', (e) =>
    e.operation.source.element.classList.remove('shadow-lg'),
  )
</script>

<div class="flex-list flex-col" use:addDroppable={{ items: { get: () => items, set: (r) => (items = r) } }}>
  {#each items as item (item)}
    <div
      animate:flip={{ duration: 150 }}
      class="my-flat-card transition-all"
      use:addDraggable={{ item: { get: () => item } }}
    >
      <h2>{item.name}</h2>
    </div>
  {/each}
</div>

<JSONViewer json={items} />
