<script lang="ts">
  import type { Comic } from './images'
  import { images } from './images'
  import { routes } from './routes'
  import { historyStore } from './stores/historyStore'

  import Player from './Player.svelte'

  $: comic = ((): Comic | null => {
    const { hash } = $historyStore.location

    if (hash === routes.ohGenesis) return images.ohGenesis

    return null
  })()
</script>

{#if comic !== null}
  <Player {comic} />
{/if}
