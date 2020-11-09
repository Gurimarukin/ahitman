<script lang="ts">
  import type { Comic } from './images'
  import { routes } from './routes'
  import { historyStore } from './stores/historyStore'
  import Link from './ui/Link.svelte'

  export let comic: Comic

  $: [title, images] = comic

  let image = 0
  $: src = images[image]

  $: canGoNext = image < images.length - 1
  $: canGoPrevious = 0 < image

  const goNext = () => {
    if (canGoNext) image += 1
  }
  const goPrevious = () => {
    if (canGoPrevious) image -= 1
  }

  const closePlayer = () => $historyStore.navigate(routes.home)

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closePlayer()
    else if (event.key === 'ArrowLeft') goPrevious()
    else if (event.key === 'ArrowRight') goNext()
  }

  const withStopPropagation = <E extends Event>(f: (e: E) => void) => (event: E) => {
    event.stopPropagation()
    f(event)
  }

  const withPreventDefault = <E extends Event>(f: (e: E) => void) => (event: E) => {
    event.preventDefault()
    f(event)
  }
</script>

<style>
  div.container {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    padding: 8px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  h1 {
    margin-bottom: 0;
  }

  p.subtitle {
    margin-top: 0.33em;
  }

  hr {
    width: 100%;
  }

  div.content {
    flex-grow: 1;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  nav {
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    padding: 8px;
  }

  button {
    margin: 0;
    font-size: 14px;
    cursor: pointer;
  }

  button.hidden {
    visibility: hidden;
  }
</style>

<svelte:window on:keydown={handleKeydown} />

<div class="container">
  <header>
    <h1>{title}</h1>
    <p class="subtitle">
      <Link to={routes.home}>retour</Link>
    </p>
  </header>

  <hr />

  <div class="content">
    <img alt={src} {src} on:click={goNext} on:contextmenu={withPreventDefault(goPrevious)} />
    <nav>
      <button on:click={withStopPropagation(goPrevious)} class:hidden={!canGoPrevious}>&lt;</button>
      <button on:click={withStopPropagation(goNext)} class:hidden={!canGoNext}>&gt;</button>
    </nav>
  </div>
</div>
