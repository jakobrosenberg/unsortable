<script>
  import { node } from '@roxi/routify'
  import JsonViewerContent from './JsonViewerContent.svelte'

  const { json } = $props()
  let show = $state(true)
  const sourceUrl = `https://github.com/jakobrosenberg/unsortable/tree/main/apps/site/${$node.file.path}`
</script>

{#if show}
  <JsonViewerContent {json} />
{/if}

<div class="fixed bottom-6 right-10 flex gap-8">
  <a href={sourceUrl} class="link" target="_blank">Source</a>
  <label class="label">
    <input type="checkbox" bind:checked={show} class="toggle" />
    Show JSON
  </label>
</div>
