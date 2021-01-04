import { Dispatch } from 'react'
import { ThunkAction } from 'redux-thunk'
import { ActionTypes, actions } from '../../actions'
import { State } from '../../state/types'

export const changeIsHome = (
  payload: State['isHome']
): ThunkAction<Promise<void>, State, void, ActionTypes> => async (
  dispatch: Dispatch<ActionTypes>
) => {
  dispatch(actions.isHome({ isHome: payload }))
}
