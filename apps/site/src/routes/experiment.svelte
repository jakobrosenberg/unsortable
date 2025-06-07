<!-- routify:meta order=false -->

<script>
  import { flip } from 'svelte/animate'
  import { Unsortable } from 'unsortable/svelte'

  let heros = $state([
    {
      title: 'Unsortable',
      subtitle: 'Headless drag-and-drop sorting with full state control. No DOM mutations. Powered by dnd-kit.',
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

<section class="min-h-200 bg-base-200 flex items-center justify-center">
  <div class="text-center max-w-xl px-4">
    <h1 class="text-5xl font-bold">Unsortable</h1>
    <p class="py-6 text-lg">
      Headless drag-and-drop sorting with full state control. No DOM mutations. Powered by <code>dnd-kit</code>.
    </p>
    <a href="/examples" class="btn btn-primary">See the demos</a>
  </div>
</section>

<!-- Features / Columns -->
<div
  class="bg-base-100 py-16 px-4"
  use:addDroppable={{ items: { get: () => features, set: (r) => (features = r) }, accept: ['section'] }}
>
  {#each features as feature (feature)}
    <section animate:flip={{ duration: 200 }} class="relative cursor-move">
      <div
        class="py-10 hover:outline-2 outline-red-200 rounded-xl"
        use:addDraggable={{ item: () => feature, type: 'section', accept: ['section'] }}
      >
        <h1 class="text-center text-3xl pb-10">{feature.title}</h1>
        <div
          class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4"
          use:addDroppable={{
            items: { get: () => feature.points, set: (r) => (feature.points = r) },
            accept: ['point'],
          }}
        >
          {#each feature.points as point (point)}
            <div
              animate:flip={{ duration: 200 }}
              class="transition-all card shadow-md bg-base-200 p-6 mb-4 hover:shadow-lg"
              use:addDraggable={{ item: () => point, type: 'point', accept: ['point'] }}
            >
              <h2 class="card-title">{point.title}</h2>
              <p>{point.description}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>
  {:else}
    <div class="flex items-center justify-center h-40 text-xl font-semibold opacity-40 border rounded-2xl">
      Drag a section here here
    </div>
  {/each}
</div>

<div class="py-16 bg-base-200">
  <div
    class="min-h-100 flex items-center justify-center gap-8"
    use:addDroppable={{ items: { get: () => benefits, set: (r) => (benefits = r) }, accept: ['section'] }}
  >
    {#each benefits as benefit (benefit)}
      <section
        class="py-10 hover:outline-2 outline-red-200 rounded-xl cursor-move"
        animate:flip={{ duration: 200 }}
        use:addDraggable={{ item: () => benefit, type: 'section', accept: ['section'] }}
      >
        <div class="max-w-3xl mx-auto px-4">
          <h2 class="text-3xl font-bold mb-6">{benefit.title}</h2>
          <div
            class="list-disc list-inside space-y-2 text-lg"
            use:addDroppable={{
              items: { get: () => benefit.points, set: (r) => (benefit.points = r) },
              accept: ['point'],
            }}
          >
            {#each benefit.points as point (point)}
              <div
                animate:flip={{ duration: 200 }}
                class="text-base-content/70 hover:text-base-content/100"
                use:addDraggable={{ item: () => point, type: 'point', accept: ['point'] }}
              >
                <strong>{point.title}:</strong>
                {point.description}
              </div>
            {/each}
          </div>
        </div>
      </section>
    {:else}
      <div class="flex w-full items-center justify-center h-40 text-xl font-semibold opacity-40 border rounded-2xl">
        Drag a section here here
      </div>
    {/each}
  </div>
</div>

<!-- <section
  class="min-h-100 w-full bg-base-200"
  use:addDroppable={{ items: { get: () => heros, set: (r) => (heros = r) } }}
>
  {#each heros as item (item)}
    <div use:addDraggable={{ item:() => item  }}>
      <h1 class="text-5xl">{item.name}</h1>
      <p>{item.description}</p>
    </div>
  {/each}
</section> -->

<!-- <div
  class="min-h-100 w-full flex flex-col items-center gap-8"
  use:addDroppable={{ items: { get: () => features, set: (r) => (features = r) } }}
>
  {#each features as item (item)}
    <div class="card bg-base-100 w-100" use:addDraggable={{ item:() => item  }}>
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
    <div class="card bg-base-100 w-100" use:addDraggable={{ item:() => item  }}>
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
