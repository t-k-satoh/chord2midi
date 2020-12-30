import { Dispatch } from 'react'
import { checkInit } from '../../../utils/check_init'
import { makeAllData } from '../../../utils/data'
import { makeAllDataArg } from '../../../utils/make_all_data_arg'
import { ActionTypes } from '../../actions'
import { actions } from '../../actions'
import { State } from '../../state/types'

export const changeValue = (dispatch: Dispatch<ActionTypes>) => (
  payload: Pick<State, 'chordSymbol' | 'beat' | 'midiNoteNumber' | 'value'>
): void => {
  const [chordText, baseNote, beat] = makeAllDataArg(payload)
  const { notes, bars, chords } = makeAllData(chordText, baseNote, beat)
  const isDisabledDownLoad =
    notes.some((note) => note.isError) ||
    bars.some((bar) => bar.isError) ||
    chords.some((chord) => chord.isError) ||
    payload.value.value === ''
  const isDisabledShare = checkInit(payload).hasInit || payload.value.value === ''

  dispatch(actions.value({ value: payload.value }))
  dispatch(actions.isDisabledDownLoad({ isDisabledDownLoad }))
  dispatch(actions.isDisabledShare({ isDisabledShare }))
}
