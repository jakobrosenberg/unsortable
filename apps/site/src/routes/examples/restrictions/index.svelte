<script>
  import { flip } from 'svelte/animate'
  import { Unsortable } from 'unsortable/svelte'

  import JSONViewer from '@/components/JsonViewer.svelte'

  const data1 = [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }]
  const data2 = [{ name: 'Item 4' }, { name: 'Item 5' }, { name: 'Item 6' }]
  const data3 = [{ name: 'Item 7' }, { name: 'Item 8' }, { name: 'Item 9' }]

  let rooster = $state(data1)
  let team1 = $state(data2)
  let team3 = $state(data3)
  const { addDraggable, addDroppable } = new Unsortable()
</script>

<h1 class="text-xl font-semibold opacity-60">Only items in the rooster can be dragged to a team</h1>
<div class="grid grid-cols-2 gap-16 w-128">
  <div class="h-full">
    <h3 class="font-bold opacity-60 mb-4">Team 1</h3>
    <div
      class="flex-list flex-col h-full"
      use:addDroppable={{ items: { get: () => team1, set: (r) => (team1 = r) }, accept: ['rooster', 'team1'] }}
    >
      {#each team1 as item (item)}
        <div
          animate:flip={{ duration: 150 }}
          class="my-card"
          use:addDraggable={{ item: { get: () => item }, type: 'team1', accept: ['rooster', 'team1'] }}
        >
          <h2>{item.name}</h2>
        </div>
      {/each}
    </div>
  </div>

  <div class="">
    <h3 class="font-bold opacity-60 mb-4">Team 2</h3>
    <div class="h-full">
      <div
        class="flex-list flex-col h-full"
        use:addDroppable={{ items: { get: () => team3, set: (r) => (team3 = r) }, accept: ['rooster', 'team2'] }}
      >
        {#each team3 as item (item)}
          <div
            animate:flip={{ duration: 150 }}
            class="my-card"
            use:addDraggable={{ item: { get: () => item }, type: 'team2', accept: ['rooster', 'team2'] }}
          >
            <h2>{item.name}</h2>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="col-span-2">
    <h3 class="font-bold opacity-60 mb-4">Rooster</h3>
    <div class="inset-shadow-sm bg-base-300 rounded-xl p-8">
      <div
        class="flex-list flex-row flex-wrap"
        use:addDroppable={{ items: { get: () => rooster, set: (r) => (rooster = r) } }}
      >
        {#each rooster as item (item)}
          <div
            animate:flip={{ duration: 150 }}
            class="my-card"
            use:addDraggable={{ item: { get: () => item }, type: 'rooster' }}
          >
            <h2>{item.name}</h2>
            <small>In rooster</small>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
<JSONViewer json={{ rooster, team1, team3 }} />
