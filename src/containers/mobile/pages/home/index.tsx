import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { MobileHome } from '../../../../components/mobile/pages/home'
import { FROM } from '../../../../constants'
import { changeValue } from '../../../../store/operators'
import { utilitySelector } from '../../../../store/selector'
import { State } from '../../../../store/state/types'

export type DispatchToProps = {
  onChangeValue: (value: State['value']['value']) => void
}

export type StateToProps = Pick<State, 'value' | 'chordSymbol' | 'beat' | 'midiNoteNumber'>

export const MobileHomeContainer = (): JSX.Element => {
  const dispatch = useDispatch()
  const state = useSelector<State, State>((state: State) => state, shallowEqual)

  const changeValueOperator = React.useMemo(() => changeValue(dispatch), [dispatch])
  const currentState = utilitySelector<Pick<State, 'chordSymbol' | 'beat' | 'midiNoteNumber'>>(
    state,
    ['chordSymbol', 'beat', 'midiNoteNumber']
  )

  const onChangeValue = React.useCallback(
    (value: State['value']['value']) => {
      const newValue = { value, from: FROM.APP }

      changeValueOperator({ ...currentState, value: newValue })
    },
    [changeValueOperator, currentState]
  )

  const dispatchToProps: DispatchToProps = React.useMemo(
    () => ({
      onChangeValue,
    }),
    [onChangeValue]
  )

  const stateToProps: StateToProps = React.useMemo(
    () => utilitySelector(state, ['value', 'chordSymbol', 'beat', 'midiNoteNumber']),
    [state]
  )

  return <MobileHome {...dispatchToProps} {...stateToProps} />
}
