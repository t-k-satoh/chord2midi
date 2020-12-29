import { Dispatch } from 'react'
import { ActionTypes } from '../../actions'
import { actions } from '../../actions'
import { State } from '../../state/types'

export const changeQuery = (dispatch: Dispatch<ActionTypes>) => (payload: State['query']): void => {
  dispatch(actions.query({ query: payload }))
}
