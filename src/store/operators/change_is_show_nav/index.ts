import { Dispatch } from 'react'
import { ActionTypes } from '../../actions'
import { actions } from '../../actions'
import { State } from '../../state/types'

export const changeIsShowNav = (dispatch: Dispatch<ActionTypes>) => (
  payload: State['isShowNav']
): void => {
  dispatch(actions.isShowNav({ isShowNav: payload }))
}
