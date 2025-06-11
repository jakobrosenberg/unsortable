<script>
  import { node } from '@roxi/routify'
  import { diffChars } from 'diff'

  const { json } = $props()
  let show = $state(true)

  let currentJson = ''
  let prevJson = ''
  let highlighedJson = $state('')

  const refresh = () => {
    highlighedJson = diffChars(prevJson, currentJson)
      .map((part) => (part.added ? `<span class="flash-on-load">${part.value}</span>` : part.removed ? '' : part.value))
      .join('')
  }

  $effect(() => {
    if (!json) return
    prevJson = currentJson || JSON.stringify(json, null, 2)
    currentJson = JSON.stringify(json, null, 2)
    refresh()
  })

  const sourceUrl = `https://github.com/jakobrosenberg/unsortable/tree/main/apps/site/${$node.file.path}`
</script>

{#if show}
  <div class="max-w-80 mr-6 right-0 top-20 bottom-20 overflow-hidden fixed flex flex-justify-center items-center">
    <pre class="whitespace-pre-wrap text-base-content/20 font-bold">JSONViewer: {@html highlighedJson}</pre>
  </div>
{/if}

<div class="fixed bottom-6 right-10 flex gap-8">
  <a href={sourceUrl} class="link" target="_blank">Source</a>
  <label class="label">
    <input type="checkbox" bind:checked={show} class="toggle" />
    Show JSON
  </label>
</div>

<style>
  :global(.flash-on-load) {
    animation: flash 0.5s;
  }

  @keyframes flash {
    0% {
      background: var(--color-success);
    }
    100% {
      background: transparent;
    }
  }
</style>
