<script lang="ts">
  import { routes } from './routes'

  import Router from './Router.svelte'
  import Link from './ui/Link.svelte'
</script>

<main>
  <h1>Odolf Hitman</h1>
  <p>Assassin humaniste.</p>

  <hr />

  <h3>Odolf Hitman: Genesis</h3>
  <Link to={routes.ohGenesis}>lire...</Link>

  <Router />
</main>
