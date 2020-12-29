import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Page } from '../../../../components/mobile/templates/page'
import { changeIsShowNav } from '../../../../store/operators'
import { utilitySelector } from '../../../../store/selector'
import { State } from '../../../../store/state/types'

export type DispatchToProps = {
  onCloseNav: () => void
}

export type StateToProps = {
  isShowNav: State['isShowNav']
}

export const PageContainer: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const state = useSelector<State, State>((state: State) => state, shallowEqual)
  const changeIsShowNavOperator = React.useMemo(() => changeIsShowNav(dispatch), [dispatch])
  const onCloseNav = React.useCallback(() => {
    changeIsShowNavOperator(false)
  }, [changeIsShowNavOperator])

  const dispatchToProps = React.useMemo(
    () => ({
      onCloseNav,
    }),
    [onCloseNav]
  )

  const stateToProps = React.useMemo(
    () => utilitySelector<StateToProps>(state, ['isShowNav']),
    [state]
  )

  return (
    <Page {...stateToProps} {...dispatchToProps}>
      {children}
    </Page>
  )
}
