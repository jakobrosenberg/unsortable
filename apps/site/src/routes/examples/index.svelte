<script>
  import { flip } from 'svelte/animate'
  import { Unsortable } from 'unsortable/svelte'
  import { node, url } from '@roxi/routify'

  const unsortable = new Unsortable()
  const { addDraggable, addDroppable, manager } = unsortable
  const children = [...$node.traverse('..').linkableChildren]
  let nodes = $state(children)
  let titles = $state([{ title: 'Drag' }, { title: 'or' }, { title: 'click' }, { title: 'us' }])

  manager.monitor.addEventListener('dragstart', (e) => e.operation.source.element.classList.add('shadow-xl'))
  manager.monitor.addEventListener('dragend', (e) => e.operation.source.element.classList.remove('shadow-xl'))
</script>

<h3 class="text-2xl opacity-80">
  <div class="flex gap-1" use:addDroppable={{ items: () => titles, setItems: (r) => (titles = r) }}>
    {#each titles as child (child)}
      <div animate:flip={{ duration: 150 }} use:addDraggable={{ item: () => child }}>
        {#if child.path}
          <a class:link={child.path} href={child.path ? $url(child.path) : '#'}> {child.title} </a>
        {:else}
          <span>
            {child.title}
          </span>
        {/if}
      </div>
    {:else}
      <div class="flex items-center justify-center p-10 text-xl font-semibold opacity-40 border rounded-2xl">
        Drag a card here
      </div>
    {/each}
  </div>
</h3>
<div class="flex gap-8" use:addDroppable={{ items: () => nodes, setItems: (r) => (nodes = r) }}>
  {#each nodes as child (child)}
    <a
      animate:flip={{ duration: 150 }}
      class="card card-xl bg-base-100 shadow"
      class:shadow-inner={!child.path}
      class:card-outline={true}
      href={child.path ? $url(child.path) : '#'}
      use:addDraggable={{ item: () => child }}
    >
      <div class="card-body {child.path ? 'hover:shadow-lg' : 'text-base-content/50'} transition-all ">
        {child?.title}
      </div>
    </a>
  {:else}
    <div class="flex items-center justify-center p-10 text-xl font-semibold opacity-40 border rounded-2xl">
      Drag a text here
    </div>
  {/each}
</div>

<pre class="opacity-50">
{JSON.stringify(titles.map((n) => n.title))}
{JSON.stringify(nodes.map((n) => n.title))}
</pre>

<!-- routify:meta order=false -->
