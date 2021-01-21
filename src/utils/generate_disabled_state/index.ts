import * as utils from '../'
import { State } from '../../store/state/types'
import { ExcludeInitObject } from '../../types'

export const generateDisabledState = (
  payload: Pick<State, 'chordSymbol' | 'beat' | 'midiNoteNumber' | 'value'>
): {
  isDisabledDownLoad: boolean
  isDisabledShare: boolean
} => {
  const data = utils.pickValues(payload)

  if (utils.checkInit(data).hasInit) {
    return {
      isDisabledDownLoad: true,
      isDisabledShare: true,
    }
  }

  const { notes, bars, chords } = utils.makeAllData(data as ExcludeInitObject<typeof data>)

  return {
    isDisabledDownLoad:
      notes.some((note) => note.isError) ||
      bars.some((bar) => bar.isError) ||
      chords.some((chord) => chord.isError) ||
      payload.value.value === '',
    isDisabledShare: utils.checkInit(payload).hasInit || payload.value.value === '',
  }
}
