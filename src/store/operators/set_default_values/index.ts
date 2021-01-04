import { Dispatch } from 'react'
import { INIT_VALUE, FROM } from '../../../constants'
import { ActionTypes } from '../../actions'
import { actions } from '../../actions'

export const setDefaultValues = (dispatch: Dispatch<ActionTypes>, hasInit: boolean) => (): void => {
  if (hasInit) {
    dispatch(actions.beat({ beat: { value: INIT_VALUE.beat, from: FROM.LAUNCH } }))
    dispatch(
      actions.chordSymbol({ chordSymbol: { value: INIT_VALUE.chordSymbol, from: FROM.LAUNCH } })
    )
    dispatch(
      actions.midiNoteNumber({
        midiNoteNumber: { value: INIT_VALUE.midiNoteNumber, from: FROM.LAUNCH },
      })
    )
    dispatch(
      actions.value({
        value: { value: INIT_VALUE.value, from: FROM.LAUNCH },
      })
    )
  }
}
