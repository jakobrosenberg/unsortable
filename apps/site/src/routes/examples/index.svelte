<script>
  import { flip } from 'svelte/animate'
  import { Unsortable } from 'unsortable/svelte'
  import { node, url } from '@roxi/routify'

  const unsortable = new Unsortable()
  const { addDraggable, addDroppable } = unsortable
  const children = [...$node.traverse('..').linkableChildren]
  let nodes = $state(children)

  unsortable.manager.monitor.addEventListener('dragstart', (e) => e.operation.source.element.classList.add('shadow-xl'))
  unsortable.manager.monitor.addEventListener('dragend', (e) =>
    e.operation.source.element.classList.remove('shadow-xl'),
  )
</script>

<div class="flex gap-8" use:addDroppable={{ items: { get: () => nodes, set: (r) => (nodes = r) } }}>
  {#each nodes as child (child)}
    <a
      animate:flip={{ duration: 150 }}
      class="card card-xl bg-base-100"
      href={$url(child.path)}
      use:addDraggable={{ item: { get: () => child } }}
    >
      <div class="card-body shadow hover:shadow-lg transition-all">
        {child.title}
      </div>
    </a>
  {/each}
</div>

<!-- routify:meta order=false -->
