<script>
  import { url, isActive, node } from '@roxi/routify'
  import Nav from '@/components/Nav.svelte'

</script>

<Nav></Nav>
<div class="min-h-[100dvh] bg-base-200 flex flex-col pt-16">
  <slot />
</div>
