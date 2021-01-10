import { Dispatch } from 'react'
import * as utils from '../../../utils'
import { ActionTypes } from '../../actions'
import { actions } from '../../actions'
import { State } from '../../state/types'

export const changeValue = (dispatch: Dispatch<ActionTypes>) => (
  payload: Pick<State, 'chordSymbol' | 'beat' | 'midiNoteNumber' | 'value'>
): void => {
  const { isDisabledDownLoad, isDisabledShare } = utils.generateDisabledState(payload)

  dispatch(actions.value({ value: payload.value }))
  dispatch(actions.isDisabledDownLoad({ isDisabledDownLoad }))
  dispatch(actions.isDisabledShare({ isDisabledShare }))
}
