import { Dispatch } from 'react'
import { ThunkAction } from 'redux-thunk'
import { ActionTypes } from '../../actions'
import { actions } from '../../actions'
import { State } from '../../state/types'

export const changeBeat = (
  payload: Pick<State, 'beat'>
): ThunkAction<Promise<void>, State, void, ActionTypes> => async (
  dispatch: Dispatch<ActionTypes>
) => {
  dispatch(actions.beat(payload))
}
