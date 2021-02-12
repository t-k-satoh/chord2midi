import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Page } from '../../../../components/mobile/templates/page'
import * as operators from '../../../../store/operators'
import { utilitySelector } from '../../../../store/selector'
import { State } from '../../../../store/state/types'

export type DispatchToProps = {
  onCloseShowNav: () => void
}

export type StateToProps = Pick<State, 'isShowNav'>

export const PageContainer: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  const stateToProps = useSelector<State, StateToProps>(
    (state: State) => utilitySelector(state, ['isShowNav']),
    shallowEqual
  )

  const onCloseShowNav: DispatchToProps['onCloseShowNav'] = React.useCallback(() => {
    dispatch(operators.changeIsShowNav({ isShowNav: false }))
  }, [dispatch])

  const dispatchToProps: DispatchToProps = React.useMemo(
    () => ({
      onCloseShowNav,
    }),
    [onCloseShowNav]
  )

  return (
    <Page {...stateToProps} {...dispatchToProps}>
      {children}
    </Page>
  )
}
