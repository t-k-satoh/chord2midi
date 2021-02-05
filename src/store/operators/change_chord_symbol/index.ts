import { Dispatch } from 'react'
import { ThunkAction } from 'redux-thunk'
import { ActionTypes } from '../../actions'
import { actions } from '../../actions'
import { State } from '../../state/types'

export const changeChordSymbol = (
  payload: Pick<State, 'chordSymbol'>
): ThunkAction<Promise<void>, State, void, ActionTypes> => async (
  dispatch: Dispatch<ActionTypes>
) => {
  dispatch(actions.chordSymbol(payload))
}
