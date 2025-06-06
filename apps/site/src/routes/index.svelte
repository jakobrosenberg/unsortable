<!-- routify:meta order=false -->

<script>
  import { flip } from 'svelte/animate'
  import { Unsortable } from 'unsortable/svelte'

  let heros = $state([
    {
      title: 'Unsortable',
      subtitle: 'Headless drag-and-drop sorting with full state control. No DOM mutations.',
      button: 'Get Started',
    },
  ])
  let features = $state([
    {
      title: 'Features',
      points: [
        {
          title: 'State-first',
          description: 'Only state changes — you control rendering completely.',
        },
        {
          title: 'Nested Sorting',
          description: 'Supports complex tree structures with minimal setup.',
        },
        {
          title: 'Dnd-kit Inside',
          description: 'Built on dnd-kit, so you inherit full power and flexibility.',
        },
      ],
    },
  ])

  let benefits = $state([
    {
      title: 'Why choose Unsortable?',
      points: [
        {
          title: 'Headless Core',
          description: 'Minimal, headless core — no DOM assumptions',
        },
        {
          title: 'Framework Agnostic',
          description: 'Supports any frontend framework',
        },
        {
          title: 'dnd-kit Compatible',
          description: 'Clean API with full dnd-kit compatibility',
        },
        {
          title: 'Nested Support',
          description: 'Designed for deeply nested structures',
        },
      ],
    },
  ])

  //   ]

  const { addDraggable, addDroppable } = new Unsortable()
</script>

<section class="min-h-screen bg-base-200 flex items-center justify-center">
  <div class="text-center max-w-xl px-4">
    <h1 class="text-5xl font-bold">Unsortable</h1>
    <p class="py-6 text-lg">Headless drag-and-drop sorting with full state control. No DOM mutations.</p>
    <button class="btn btn-primary">Get Started</button>
  </div>
</section>

<!-- Features / Columns -->
<section
  class="py-16 bg-base-100"
  use:addDroppable={{ items: { get: () => features, set: (r) => (features = r) }, accepts: ['section'] }}
>
  {#each features as feature (feature)}
    <div use:addDraggable={{ item: { get: () => feature } }} class="py-1 bg-red-100">
      <div
        class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4"
        use:addDroppable={{
          items: { get: () => feature.points, set: (r) => (feature.points = r), accepts: ['point'] },
        }}
      >
        {#each feature.points as point (point)}
          <div
            class="card shadow-md bg-base-200 p-6 mb-4"
            use:addDraggable={{ item: { get: () => point }, type: 'foo' }}
          >
            <h2 class="card-title">{point.title}</h2>
            <p>{point.description}</p>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</section>

<!-- Bullet Points
<section class="py-16 bg-base-200">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-bold mb-6">Why choose Unsortable?</h2>
    <ul class="list-disc list-inside space-y-2 text-lg">
      <li>Minimal, headless core — no DOM assumptions</li>
      <li>Supports any frontend framework</li>
      <li>Clean API with full dnd-kit compatibility</li>
      <li>Designed for deeply nested structures</li>
    </ul>
  </div>
</section>

<div class="min-h-100 w-full bg-base-200" use:addDroppable={{ items: { get: () => heros, set: (r) => (heros = r) } }}>
  {#each heros as item (item)}
    <div use:addDraggable={{ item: { get: () => item } }}>
      <h1 class="text-5xl">{item.name}</h1>
      <p>{item.description}</p>
    </div>
  {/each}
</div> -->

<!-- <div
  class="min-h-100 w-full flex flex-col items-center gap-8"
  use:addDroppable={{ items: { get: () => features, set: (r) => (features = r) } }}
>
  {#each features as item (item)}
    <div class="card bg-base-100 w-100" use:addDraggable={{ item: { get: () => item } }}>
      <div class="card-body">
        <h1 class="card-title">{item.name}</h1>
        <p>{item.description}</p>
        {#if item.points}
          <ul class="list-disc pl-4">
            {#each item.points as point (point)}
              <li>{point}</li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  {/each}
</div> -->

<!-- <div
  class="min-h-100 w-full flex flex-col items-center gap-8"
  use:addDroppable={{ items: { get: () => benefits, set: (r) => (benefits = r) } }}
>
  {#each benefits as item (item)}
    <div class="card bg-base-100 w-100" use:addDraggable={{ item: { get: () => item } }}>
      <div class="card-body">
        <h1 class="card-title">{item.name}</h1>
        <p>{item.description}</p>
        {#if item.points}
          <ul class="list-disc pl-4">
            {#each item.points as point (point)}
              <li>{point}</li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  {/each}
</div> -->
