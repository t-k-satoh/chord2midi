import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Loading } from '../../../../components/common/atoms/loading'
import { MobileHome } from '../../../../components/mobile/pages/home'
import { FROM } from '../../../../constants'
import * as operators from '../../../../store/operators'
import { utilitySelector } from '../../../../store/selector'
import { State } from '../../../../store/state/types'
import * as utils from '../../../../utils'
import { PickState, StateToProps, DispatchToProps } from './types'

export const MobileHomeContainer = (): JSX.Element => {
  const dispatch = useDispatch()
  const pickValuesToState = useSelector<State, PickState>(
    (state: State) =>
      utilitySelector(state, [
        'value',
        'chordSymbol',
        'beat',
        'midiNoteNumber',
        'locale',
        'bpm',
        'isDarkMode',
      ]),
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

  const { hasInit } = React.useMemo(() => utils.checkInit(pickValuesToState), [pickValuesToState])
  const stateToProps: StateToProps = React.useMemo(() => utils.excludeAllInit(pickValuesToState), [
    pickValuesToState,
  ])

  return hasInit ? (
    <Loading isDarkMode={stateToProps.isDarkMode} isLoading={hasInit} />
  ) : (
    <MobileHome {...dispatchToProps} {...stateToProps} />
  )
}
