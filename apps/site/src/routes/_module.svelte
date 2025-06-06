<script>
  import { url, isActive, node } from '@roxi/routify'
  import Nav from '@/components/Nav.svelte'

  console.log('node', $node.linkableChildren)
</script>

<Nav></Nav>
<div class="min-h-screen bg-base-300 flex flex-col">
  <slot />
</div>
