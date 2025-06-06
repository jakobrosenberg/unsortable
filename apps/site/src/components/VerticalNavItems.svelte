<script>
  import { isActive, url } from '@roxi/routify'
  const { children, depth=2 } = $props()
</script>

{#if depth}
  {#each children as child}
    <li>
      <a class="link {$isActive(child.path) ? 'link-active' : ''}" href={$url(child.path)}>
        {child.name}
      </a>
      {#if child.linkableChildren && child.linkableChildren.length > 0}
        <ul class="p-2">
          <svelte:self children={child.linkableChildren} depth={depth-1} />
        </ul>
      {/if}
    </li>
  {/each}
{/if}
