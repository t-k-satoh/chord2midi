import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Loading } from '../../../../components/common/atoms/loading'
import { MainHeader } from '../../../../components/mobile/templates/header'
import * as operators from '../../../../store/operators'
import { utilitySelector } from '../../../../store/selector'
import { State } from '../../../../store/state/types'
import * as utils from '../../../../utils'
import { PickState, StateToProps, DispatchToProps } from './types'

export const HeaderContainer = (): JSX.Element => {
  const dispatch = useDispatch()
  const pickValuesToState = useSelector<State, PickState>(
    (state: State) =>
      utilitySelector(state, [
        'value',
        'chordSymbol',
        'beat',
        'midiNoteNumber',
        'bpm',
        'version',
        'isDarkMode',
        'isHome',
        'isDisabledDownLoad',
        'isDisabledShare',
        'isShowNav',
      ]),
    shallowEqual
  )

  const onChangeIsShowNav: DispatchToProps['onChangeIsShowNav'] = React.useCallback(
    (value) => {
      dispatch(operators.changeIsShowNav({ isShowNav: value }))
    },
    [dispatch]
  )

  const dispatchToProps: DispatchToProps = React.useMemo(
    () => ({
      onChangeIsShowNav,
    }),
    [onChangeIsShowNav]
  )
  const { hasInit } = React.useMemo(() => utils.checkInit(pickValuesToState), [pickValuesToState])
  const stateToProps: StateToProps = React.useMemo(() => utils.excludeAllInit(pickValuesToState), [
    pickValuesToState,
  ])

  return hasInit ? (
    <Loading isDarkMode={stateToProps.isDarkMode} isLoading={hasInit} />
  ) : (
    <MainHeader {...stateToProps} {...dispatchToProps} />
  )
}
