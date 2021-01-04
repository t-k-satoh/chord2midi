import { Dispatch } from 'react'
import { ThunkAction } from 'redux-thunk'
import { ActionTypes } from '../actions'
import { State } from '../state/types'

export const testOperator = (): ThunkAction<Promise<void>, State, void, ActionTypes> => async (
  dispatch: Dispatch<ActionTypes>,
  getState: () => State
) => {
  console.log(dispatch, getState())
}
