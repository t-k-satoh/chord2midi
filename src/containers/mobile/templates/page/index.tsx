import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Loading } from '../../../../components/common/atoms/loading'
import { Page } from '../../../../components/mobile/templates/page'
import * as operators from '../../../../store/operators'
import { utilitySelector } from '../../../../store/selector'
import { State } from '../../../../store/state/types'
import * as utils from '../../../../utils'
import { PickState, StateToProps, DispatchToProps } from './types'

export const PageContainer: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  const pickValuesToState = useSelector<State, PickState>(
    (state: State) => utilitySelector(state, ['isShowNav', 'isDarkMode']),
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
  const { hasInit } = React.useMemo(() => utils.checkInit(pickValuesToState), [pickValuesToState])
  const stateToProps: StateToProps = React.useMemo(() => utils.excludeAllInit(pickValuesToState), [
    pickValuesToState,
  ])

  return hasInit ? (
    <Loading isDarkMode={stateToProps.isDarkMode} isLoading={hasInit} />
  ) : (
    <Page {...stateToProps} {...dispatchToProps}>
      {children}
    </Page>
  )
}
