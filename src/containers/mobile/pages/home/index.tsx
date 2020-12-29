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
  const onChangeValue = React.useCallback(
    (value: State['value']['value']) => {
      changeValueOperator({ value, from: FROM.APP })
    },
    [changeValueOperator]
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
