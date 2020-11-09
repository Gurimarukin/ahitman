<script lang="ts">
  import { images } from './images'
  import { routes } from './routes'
  import { historyStore } from './stores/historyStore'

  import Player from './Player.svelte'

  $: comic = $historyStore.location.hash === routes.ohGenesis ? images.ohGenesis : null
</script>

{#if comic !== null}
  <Player {comic} />
{/if}
