import * as utils from '../'
import { State } from '../../store/state/types'

export const generateDisabledState = (
  payload: Pick<State, 'chordSymbol' | 'beat' | 'midiNoteNumber' | 'value'>
): {
  isDisabledDownLoad: boolean
  isDisabledShare: boolean
} => {
  const [chordText, baseNote, beat] = utils.makeAllDataArg(payload)
  const { notes, bars, chords } = utils.makeAllData(chordText, baseNote, beat)

  return {
    isDisabledDownLoad:
      notes.some((note) => note.isError) ||
      bars.some((bar) => bar.isError) ||
      chords.some((chord) => chord.isError) ||
      payload.value.value === '',
    isDisabledShare: utils.checkInit(payload).hasInit || payload.value.value === '',
  }
}
