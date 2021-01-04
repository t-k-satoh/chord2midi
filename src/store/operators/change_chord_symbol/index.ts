import { Dispatch } from 'react'
import { ActionTypes } from '../../actions'
import { actions } from '../../actions'
import { State } from '../../state/types'

export const changeChordSymbol = (dispatch: Dispatch<ActionTypes>) => (
  payload: Pick<State, 'chordSymbol'>
): void => {
  dispatch(actions.chordSymbol(payload))
}
