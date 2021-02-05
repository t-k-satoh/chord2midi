import { Dispatch } from 'react'
import { ThunkAction } from 'redux-thunk'
import { ActionTypes } from '../../actions'
import { actions } from '../../actions'
import { State } from '../../state/types'

export const changeBPM = (
  payload: Pick<State, 'bpm'>
): ThunkAction<Promise<void>, State, void, ActionTypes> => async (
  dispatch: Dispatch<ActionTypes>
) => {
  dispatch(actions.bpm({ bpm: payload.bpm }))
}
