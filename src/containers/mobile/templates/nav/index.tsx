import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Loading } from '../../../../components/common/atoms/loading'
import { Nav } from '../../../../components/mobile/templates/nav'
import { utilitySelector } from '../../../../store/selector'
import { State } from '../../../../store/state/types'
import * as utils from '../../../../utils'
import { PickState, StateToProps } from './types'

export const NavContainer = (): JSX.Element => {
  const pickValuesToState = useSelector<State, PickState>(
    (state: State) =>
      utilitySelector(state, ['locale', 'isDarkMode', 'query', 'version', 'isHome']),
    shallowEqual
  )
  const { hasInit } = React.useMemo(() => utils.checkInit(pickValuesToState), [pickValuesToState])
  const stateToProps: StateToProps = React.useMemo(() => utils.excludeAllInit(pickValuesToState), [
    pickValuesToState,
  ])

  return hasInit ? (
    <Loading isDarkMode={stateToProps.isDarkMode} isLoading={hasInit} />
  ) : (
    <Nav {...stateToProps} />
  )
}
