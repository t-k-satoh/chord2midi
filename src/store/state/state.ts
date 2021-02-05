import { INIT } from '../../constants'
import { State } from './types'

export const initialState: State = {
  chordSymbol: {
    value: INIT,
    from: INIT,
  },
  beat: {
    value: INIT,
    from: INIT,
  },
  midiNoteNumber: {
    value: INIT,
    from: INIT,
  },
  value: {
    value: INIT,
    from: INIT,
  },
  bpm: {
    value: INIT,
    from: INIT,
  },
  locale: INIT,
  query: INIT,
  version: INIT,
  isDarkMode: {
    value: false,
    from: INIT,
  },
  isBrowser: INIT,
  isHome: INIT,
  isDisabledDownLoad: INIT,
  isDisabledShare: INIT,
}
