import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { MobileHowToUse } from '../../../../components/mobile/pages/how_to_use'
import { utilitySelector } from '../../../../store/selector'
import { State } from '../../../../store/state/types'

export type StateToProps = Pick<State, 'locale'>

export const MobileHowToUseContainer = (): JSX.Element => {
  const state = useSelector<State, State>((state: State) => state, shallowEqual)

  const stateToProps: StateToProps = React.useMemo(() => utilitySelector(state, ['locale']), [
    state,
  ])

  return <MobileHowToUse {...stateToProps} />
}
