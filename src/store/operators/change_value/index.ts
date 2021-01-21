import { Dispatch } from 'react'
import { ThunkAction } from 'redux-thunk'
import * as utils from '../../../utils'
import { ActionTypes } from '../../actions'
import { actions } from '../../actions'
import { State } from '../../state/types'

export const changeValue = (
  payload: Pick<State, 'value'>
): ThunkAction<Promise<void>, State, void, ActionTypes> => async (
  dispatch: Dispatch<ActionTypes>,
  getState: () => State
) => {
  const { chordSymbol, beat, midiNoteNumber } = getState()

  const { isDisabledDownLoad, isDisabledShare } = utils.generateDisabledState({
    chordSymbol,
    beat,
    midiNoteNumber,
    value: payload.value,
  })

  dispatch(actions.value({ value: payload.value }))
  dispatch(actions.isDisabledDownLoad({ isDisabledDownLoad }))
  dispatch(actions.isDisabledShare({ isDisabledShare }))
}
