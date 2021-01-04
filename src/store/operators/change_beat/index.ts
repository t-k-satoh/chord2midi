import { Dispatch } from 'react'
import { ActionTypes } from '../../actions'
import { actions } from '../../actions'
import { State } from '../../state/types'

export const changeBeat = (dispatch: Dispatch<ActionTypes>) => (
  payload: Pick<State, 'beat'>
): void => {
  dispatch(actions.beat(payload))
}
