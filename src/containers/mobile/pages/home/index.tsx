import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { MobileHome } from '../../../../components/mobile/pages/home'
import { FROM } from '../../../../constants'
import * as operators from '../../../../store/operators'
import { utilitySelector } from '../../../../store/selector'
import { State } from '../../../../store/state/types'
import { PickValue } from '../../../../types'

export type DispatchToProps = {
  onChangeValue: (value: PickValue<State['value']>) => void
}

export type StateToProps = Pick<
  State,
  'value' | 'chordSymbol' | 'beat' | 'midiNoteNumber' | 'locale'
>

export const MobileHomeContainer = (): JSX.Element => {
  const dispatch = useDispatch()
  const stateToProps = useSelector<State, StateToProps>(
    (state: State) =>
      utilitySelector(state, ['value', 'chordSymbol', 'beat', 'midiNoteNumber', 'locale']),
    shallowEqual
  )
  const onChangeValue: DispatchToProps['onChangeValue'] = React.useCallback(
    (value) => {
      dispatch(operators.changeValue({ value: { value, from: FROM.APP } }))
    },
    [dispatch]
  )

  const dispatchToProps: DispatchToProps = React.useMemo(
    () => ({
      onChangeValue,
    }),
    [onChangeValue]
  )

  return <MobileHome {...dispatchToProps} {...stateToProps} />
}
