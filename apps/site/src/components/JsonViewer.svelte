<script>
  import { node } from '@roxi/routify'
  const { json } = $props()
  let show = $state(true)

  const sourceUrl = `https://github.com/jakobrosenberg/unsortable/tree/main/${$node.file.path}`
</script>

{#if show}
  <div class="max-w-80 mr-6 right-0 top-20 bottom-20 overflow-hidden fixed flex flex-justify-center items-center">
    <pre class="whitespace-pre-wrap text-base-content/30">JSONViewer: {JSON.stringify(json, null, 2)}</pre>
  </div>
{/if}


<a href="{sourceUrl}">Sourc</a>
<div class="fixed bottom-6 right-10">
  <label class="label">
    <input type="checkbox" bind:checked={show} class="toggle" />
    Show JSON
  </label>
</div>
