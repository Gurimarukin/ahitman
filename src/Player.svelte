<script lang="ts">
  import type { Comic } from './images'
  import { routes } from './routes'
  import { historyStore } from './stores/historyStore'

  export let comic: Comic

  let image = 0
  $: src = comic[image]

  $: canGoNext = image < comic.length - 1
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
  .container {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
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

  button.close {
    position: absolute;
    top: 8px;
    right: 8px;
  }
</style>

<svelte:window on:keydown={handleKeydown} />

<div on:click={goNext} on:contextmenu={withPreventDefault(goPrevious)} class="container">
  <img alt={src} {src} />
  <nav>
    <button on:click={withStopPropagation(goPrevious)} class:hidden={!canGoPrevious}>&lt;</button>
    <button on:click={withStopPropagation(goNext)} class:hidden={!canGoNext}>&gt;</button>
  </nav>
  <button on:click={closePlayer} class="close">X</button>
</div>