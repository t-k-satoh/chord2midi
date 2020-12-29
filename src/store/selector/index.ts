import { createSelector } from 'reselect'
import { State } from '../state/types'

export const selector = {
  chordSymbol: createSelector<State, State['chordSymbol'], State['chordSymbol']>(
    (state: State) => state.chordSymbol,
    (chordSymbol) => chordSymbol
  ),
  beat: createSelector<State, State['beat'], State['beat']>(
    (state: State) => state.beat,
    (beat) => beat
  ),
  locale: createSelector<State, State['locale'], State['locale']>(
    (state: State) => state.locale,
    (locale) => locale
  ),
  midiNoteNumber: createSelector<State, State['midiNoteNumber'], State['midiNoteNumber']>(
    (state: State) => state.midiNoteNumber,
    (midiNoteNumber) => midiNoteNumber
  ),
  value: createSelector<State, State['value'], State['value']>(
    (state: State) => state.value,
    (value) => value
  ),
  isDarkMode: createSelector<State, State['isDarkMode'], State['isDarkMode']>(
    (state: State) => state.isDarkMode,
    (isDarkMode) => isDarkMode
  ),
  isBrowser: createSelector<State, State['isBrowser'], State['isBrowser']>(
    (state: State) => state.isBrowser,
    (isBrowser) => isBrowser
  ),
  query: createSelector<State, State['query'], State['query']>(
    (state: State) => state.query,
    (query) => query
  ),
}

export const utilitySelector = <T extends Partial<State>>(
  state: State,
  keys: Array<keyof State>
): T => {
  const tempState = {}

  keys.forEach((key) => {
    const selector = createSelector<State, State[typeof key], State[typeof key]>(
      () => state[key],
      (value) => value
    )

    tempState[key] = selector(state)
  })

  return tempState as T
}
