import { Dispatch } from 'react'
import { ActionTypes } from '../../actions'
import { actions } from '../../actions'
import { State } from '../../state/types'

export const changeValue = (dispatch: Dispatch<ActionTypes>) => (payload: State['value']): void => {
  dispatch(actions.value({ value: payload }))
}
