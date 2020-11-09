<script lang="ts">
  import { routes } from './routes'

  import Router from './Router.svelte'
  import Link from './ui/Link.svelte'
</script>

<style>
  main {
    font-size: 1.2em;
  }

  h1 {
    margin-bottom: 0;
  }

  p.subtitle {
    margin-top: 0.33em;
    font-style: italic;
  }

  blockquote {
    margin-left: 10px;
    padding-left: 30px;
    border-left: 4px solid lightgrey;
    font-style: italic;
    font-size: 0.9em;
  }

  li {
    font-size: 1.17em;
    font-weight: bold;
  }
</style>

<main>
  <header>
    <h1>Odolf Hitman</h1>
    <p class="subtitle">Assassin humaniste.</p>
  </header>

  <hr />

  <blockquote>LA SERI EVENMENT</blockquote>

  <blockquote>"Le héros de l'année" - jeu video point com</blockquote>

  <blockquote>Grand gagnant du prix Eric Zeymour tout ca tout ca</blockquote>

  <hr />

  <ul>
    <li>
      <Link to={routes.ohGenesis}>Odolf Hitman: Genesis</Link>
    </li>
  </ul>

  <Router />
</main>
