<script lang="ts">
  import type { To } from 'history'
  import { createPath, parsePath } from 'history'

  import { historyStore } from '../stores/historyStore'
  import { isString } from '../utils/isString'

  export let to: To

  $: href = isString(to)
    ? to
    : createPath({
        pathname: to.pathname ?? $historyStore.location.pathname,
        search: to.search ?? $historyStore.location.search,
        hash: to.hash ?? $historyStore.location.hash
      })
  $: onClick = () =>
    $historyStore.navigate(
      isString(to)
        ? (() => {
            const { pathname, search, hash } = parsePath(to)
            return {
              pathname: pathname ?? '',
              search: search ?? '',
              hash: hash ?? ''
            }
          })()
        : to
    )
</script>

<a {href} on:click|preventDefault={onClick}><slot /></a>
