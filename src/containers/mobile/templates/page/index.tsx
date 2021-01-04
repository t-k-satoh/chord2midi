import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Page } from '../../../../components/mobile/templates/page'
import { utilitySelector } from '../../../../store/selector'
import { State } from '../../../../store/state/types'

export type DispatchToProps = void

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
>

export const PageContainer: React.FC = ({ children }) => {
  const state = useSelector<State, State>((state: State) => state, shallowEqual)

  const stateToProps = React.useMemo(
    () =>
      utilitySelector(state, [
        'value',
        'chordSymbol',
        'beat',
        'midiNoteNumber',
        'version',
        'isDarkMode',
        'isHome',
        'isDisabledDownLoad',
        'isDisabledShare',
      ]),
    [state]
  )

  return <Page {...stateToProps}>{children}</Page>
}
