import { Dispatch } from 'react'
import { ActionTypes } from '../../actions'
import { actions } from '../../actions'
import { State } from '../../state/types'

export const changeIsDarkMode = (dispatch: Dispatch<ActionTypes>) => (
  payload: State['isDarkMode']
): void => {
  dispatch(actions.isDarkMode({ isDarkMode: payload }))
}
