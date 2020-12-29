import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Nav } from '../../../../components/mobile/templates/nav'
import { utilitySelector } from '../../../../store/selector'
import { State } from '../../../../store/state/types'

export type DispatchToProps = null

export type StateToProps = {
  locale: State['locale']
  isDarkMode: State['isDarkMode']
  query: State['query']
  isHome: State['isHome']
  version: State['version']
}

export const NavContainer = (): JSX.Element => {
  const state = useSelector<State, State>((state: State) => state, shallowEqual)

  const stateToProps = React.useMemo(
    () =>
      utilitySelector<StateToProps>(state, ['locale', 'isDarkMode', 'query', 'isHome', 'version']),
    [state]
  )

  return <Nav {...stateToProps} />
}
