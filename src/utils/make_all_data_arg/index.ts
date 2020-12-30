import { INIT } from '../../constants'
import { State } from '../../store/state/types'
import { makeAllData } from '../data'

export const makeAllDataArg = (
  state: Pick<State, 'chordSymbol' | 'beat' | 'value' | 'midiNoteNumber'>
): Parameters<typeof makeAllData> | [] =>
  Object.values(state).some(({ value, from }) => value === INIT && from === INIT)
    ? []
    : [
        state.value.value,
        { symbol: state.chordSymbol.value, number: state.midiNoteNumber.value },
        state.beat.value,
      ]
