<script>
  import { url, isActive, node } from '@roxi/routify'
  import VerticalNavItems from './VerticalNavItems.svelte'
  import HorizontalNavItems from './HorizontalNavItems.svelte'
  //   import Nav from '@/components/Nav.svelte'
</script>

<div class="navbar bg-base-100 shadow-sm fixed z-50">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <VerticalNavItems children={$node.linkableChildren} />
      </ul>
    </div>
    <a class="btn btn-ghost text-xl" href="/">Unsortable</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <HorizontalNavItems children={$node.linkableChildren} />
    </ul>
  </div>
  <div class="navbar-end flex gap-2">
    <a class="btn btn-circle"
      href="https://discord.gg/9DGDCx3z"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.59 34.173A49 49 0 0 1 14.68 38C7.3 37.79 4.5 33 4.5 33a44.8 44.8 0 0 1 4.81-19.52A16.47 16.47 0 0 1 18.69 10l1 2.31A33 33 0 0 1 24 12a33 33 0 0 1 4.33.3l1-2.31a16.47 16.47 0 0 1 9.38 3.51A44.8 44.8 0 0 1 43.5 33s-2.8 4.79-10.18 5a47 47 0 0 1-2.86-3.81m6.46-2.9c-3.84 1.945-7.555 3.89-12.92 3.89s-9.08-1.945-12.92-3.89"
          stroke-width="1"
        /><circle
          cx="17.847"
          cy="26.23"
          r="3.35"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
        /><circle
          cx="30.153"
          cy="26.23"
          r="3.35"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
        /></svg
      >
    </a>
    <a class="btn btn-circle" href="https://github.com/jakobrosenberg/unsortable"
      ><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M24 2.5a21.5 21.5 0 0 0-6.8 41.9c1.08.2 1.47-.46 1.47-1v-3.65c-6 1.3-7.24-2.88-7.24-2.88A5.7 5.7 0 0 0 9 33.68c-1.95-1.33.15-1.31.15-1.31a4.52 4.52 0 0 1 3.29 2.22c1.92 3.29 5 2.34 6.26 1.79a4.6 4.6 0 0 1 1.37-2.88c-4.78-.54-9.8-2.38-9.8-10.62a8.3 8.3 0 0 1 2.22-5.77a7.68 7.68 0 0 1 .21-5.69s1.8-.58 5.91 2.2a20.46 20.46 0 0 1 10.76 0c4.11-2.78 5.91-2.2 5.91-2.2a7.74 7.74 0 0 1 .21 5.69a8.28 8.28 0 0 1 2.21 5.77c0 8.26-5 10.07-9.81 10.61a5.12 5.12 0 0 1 1.46 4v5.9c0 .71.39 1.24 1.48 1A21.5 21.5 0 0 0 24 2.5"
          stroke-width="1"
        /></svg
      ></a
    >
  </div>
</div>
