<script>
  import JSONViewer from '@/components/JsonViewer.svelte'
  import { Unsortable } from 'unsortable/svelte'
  import Section from './__Group.svelte'
  import { client, useQuery, query } from './triplit.js'

  const response = useQuery(
    client,
    query('groups')
      .Order('order', 'ASC')
      .Include('todos', (ref) => ref('todos').Order('order', 'ASC')),
  )

  const { addDraggable, addDroppable } = new Unsortable({})

  const setItems = (newItems) =>
    newItems.forEach((item, index) =>
      client.update('groups', item.id, (prev) => {
        prev.order = index
      }),
    )
</script>

<p class="demo-description">
  This demo writes state directly to Triplit's offline DB. The UI is fully derived from live queries.
</p>

<div class="flex-list" use:addDroppable={{ accept: 'group', items: () => response.results, setItems }}>
  {#each response.results as group (group.id)}
    <di class="my-card" use:addDraggable={{ item: () => group, id: group.id, type: 'group' }}>
      <h2 class="card-title">{group.name}</h2>
      <div class="shadow-inner bg-base-300 p-4 mt-4">
        <Section {group} {addDraggable} {addDroppable}></Section>
      </div>
    </di>
  {/each}
</div>

{#if response.results?.length}
  <JSONViewer json={response.results} />
{/if}
