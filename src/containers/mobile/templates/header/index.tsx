import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { MainHeader } from '../../../../components/mobile/templates/header'
import { changeIsShowNav } from '../../../../store/operators'
import { utilitySelector } from '../../../../store/selector'
import { State } from '../../../../store/state/types'

export type DispatchToProps = {
  onClickNav: (isShowNav: State['isShowNav']) => void
}

export type StateToProps = {
  version: State['version']
  isDarkMode: State['isDarkMode']
  isHome: State['isHome']
  isDisabledDownLoad: State['isDisabledDownLoad']
  isDisabledShare: State['isDisabledShare']
  isShowNav: State['isShowNav']
}

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
        'version',
        'isDarkMode',
        'isHome',
        'isDisabledDownLoad',
        'isDisabledShare',
      ]),
    [state]
  )

  return <MainHeader {...stateToProps} {...dispatchToProps} />
}
