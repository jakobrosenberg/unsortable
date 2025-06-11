<script>
  import { flip } from 'svelte/animate'
  import { client } from './triplit.js'

  let { group, addDraggable, addDroppable } = $props()
</script>

<div
  class="flex flex-col gap-4 min-h-20"
  use:addDroppable={{
    accept: ['todo'],
    items: { get: () => group.todos, set: (r) => (group.todos = r) },
    setItems: (items, target) => {
      items.forEach((item, index) => {
        client.update('todos', item.id, (prev) => {
          prev.order = index
          prev.id_group = group.id
        })
      })
    },
    id: group.id + '-container',
  }}
>
  {#each group.todos as todo (todo.title)}
    <div
      class="my-card"
      use:addDraggable={{ item: () => todo, type: 'todo', id: todo.id }}
      animate:flip={{ duration: 300 }}
    >
      <h2>{todo.title}</h2>
    </div>
  {/each}
</div>
