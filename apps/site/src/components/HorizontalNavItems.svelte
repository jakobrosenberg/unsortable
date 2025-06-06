<script>
  import { isActive, url } from '@roxi/routify'
  const { children, depth = 2 } = $props()
</script>

{#each children as child}
  <li>
    {#if child.linkableChildren && child.linkableChildren.length > 0 && depth > 1}
      <details>
        <summary>{child.title}</summary>
        <ul class="p-2">
            <li><a class="font-bold" href={$url(child.path)}>{child.title}</a></li>
          <svelte:self children={child.linkableChildren} depth={depth - 1} />
        </ul>
      </details>
    {:else}
      <a href={$url(child.path)}>{child.title}</a>
    {/if}
  </li>
{/each}
