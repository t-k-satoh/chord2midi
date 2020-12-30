import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { MainHeader } from '../../../../components/mobile/templates/header'
import { changeIsShowNav } from '../../../../store/operators'
import { utilitySelector } from '../../../../store/selector'
import { State } from '../../../../store/state/types'

export type DispatchToProps = {
  onClickNav: (isShowNav: State['isShowNav']) => void
}

export type StateToProps = Pick<
  State,
  | 'value'
  | 'chordSymbol'
  | 'beat'
  | 'midiNoteNumber'
  | 'version'
  | 'isDarkMode'
  | 'isHome'
  | 'isDisabledDownLoad'
  | 'isDisabledShare'
  | 'isShowNav'
>

export const HeaderContainer = (): JSX.Element => {
  const dispatch = useDispatch()
  const state = useSelector<State, State>((state: State) => state, shallowEqual)
  const changeIsShowNavOperator = React.useMemo(() => changeIsShowNav(dispatch), [dispatch])

  const onClickNav = React.useCallback(
    (isShowNav: State['isShowNav']) => {
      changeIsShowNavOperator(isShowNav)
    },
    [changeIsShowNavOperator]
  )

  const dispatchToProps = React.useMemo(
    () => ({
      onClickNav,
    }),
    [onClickNav]
  )

  const stateToProps = React.useMemo(
    () =>
      utilitySelector<StateToProps>(state, [
        'value',
        'chordSymbol',
        'beat',
        'midiNoteNumber',
        'version',
        'isDarkMode',
        'isHome',
        'isDisabledDownLoad',
        'isDisabledShare',
        'isShowNav',
      ]),
    [state]
  )

  return <MainHeader {...stateToProps} {...dispatchToProps} />
}
