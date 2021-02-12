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
  | 'isShowNav'
  | 'bpm'
>

export const PageContainer: React.FC = ({ children }) => {
  const stateToProps = useSelector<State, StateToProps>(
    (state: State) =>
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
        'bpm',
        'isShowNav',
      ]),
    shallowEqual
  )

  return (
    <Page {...stateToProps} onCloseShowNav={() => ({})}>
      {children}
    </Page>
  )
}
