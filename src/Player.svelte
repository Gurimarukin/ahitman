<script lang="ts">
  import type { Comic } from './images'

  export let comic: Comic

  let image = 0
  $: src = comic[image]

  $: canGoNext = image < comic.length - 1
  $: canGoPrevious = 0 < image

  const goNext = () => (canGoNext ? (image += 1) : undefined)
  const goPrevious = () => (canGoPrevious ? (image -= 1) : undefined)
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
    visibility: hidden;
  }

  button.visible {
    visibility: visible;
  }
</style>

<div class="container">
  <img alt={src} {src} />
  <nav>
    <button on:click={goPrevious} class:visible={canGoPrevious}>&lt;</button>
    <button on:click={goNext} class:visible={canGoNext}>&gt;</button>
  </nav>
</div>
