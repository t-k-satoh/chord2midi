import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { MobileHowToUse } from '../../../../components/mobile/pages/how_to_use'
import { utilitySelector } from '../../../../store/selector'
import { State } from '../../../../store/state/types'

export type StateToProps = Pick<State, 'locale'>

export const MobileHowToUseContainer = (): JSX.Element => {
  const stateToProps = useSelector<State, StateToProps>(
    (state: State) => utilitySelector(state, ['locale']),
    shallowEqual
  )

  return <MobileHowToUse {...stateToProps} />
}
