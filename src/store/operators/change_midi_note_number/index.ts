import { Dispatch } from 'react'
import { ActionTypes } from '../../actions'
import { actions } from '../../actions'
import { State } from '../../state/types'

export const changeMidiNoteNumber = (dispatch: Dispatch<ActionTypes>) => (
  payload: Pick<State, 'midiNoteNumber'>
): void => {
  dispatch(actions.midiNoteNumber(payload))
}
