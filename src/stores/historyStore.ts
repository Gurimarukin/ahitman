import { Location, To, createBrowserHistory } from 'history'
import { readable } from 'svelte/store'

type HistoryStore = {
  location: Location<State>
  navigate: (to: To, options?: { replace?: boolean; state?: State }) => void
  go: (delta: number) => void
}

type State = object | null

const historyStoreEmpty: HistoryStore = {
  location: { state: null, key: '', pathname: '', search: '', hash: '' },
  navigate: _ => {},
  go: _ => {}
}

export const historyStore = readable<HistoryStore>(historyStoreEmpty, set => {
  const { location, go, ...history } = createBrowserHistory()

  const navigate: HistoryStore['navigate'] = (to, options) =>
    options?.replace === true
      ? history.replace(to, options.state)
      : history.push(to, options?.state)

  set({ location, navigate, go })
  return history.listen(({ location }) => set({ location, navigate, go }))
})
