import { INIT } from '../../constants'
import { InitialState } from './types'

export const initialState: InitialState = {
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
  locale: INIT,
}
