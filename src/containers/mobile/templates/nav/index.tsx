import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Nav } from '../../../../components/mobile/templates/nav'
import { utilitySelector } from '../../../../store/selector'
import { State } from '../../../../store/state/types'

export type DispatchToProps = null

export type StateToProps = Pick<State, 'locale' | 'isDarkMode' | 'query' | 'version' | 'isHome'>

export const NavContainer = (): JSX.Element => {
  const stateToProps = useSelector<State, StateToProps>(
    (state: State) =>
      utilitySelector(state, ['locale', 'isDarkMode', 'query', 'isHome', 'version']),
    shallowEqual
  )

  return <Nav {...stateToProps} />
}
