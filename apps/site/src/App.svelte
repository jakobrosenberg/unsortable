<script context="module">
  import { Router, createRouter } from '@roxi/routify'
  import routes from '../.routify/routes.default.js'

  const router = createRouter({
    routes,
    urlRewrite: {
      toExternal: (url) => '/unsortable' + url,
      toInternal: (url) => url.replace('/unsortable', ''),
    },
  })
</script>
<Router {router} />
