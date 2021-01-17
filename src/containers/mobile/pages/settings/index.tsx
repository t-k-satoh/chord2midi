import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { MobileSetting } from '../../../../components/mobile/pages/settings'
import { FROM } from '../../../../constants'
import {
  changeBeat,
  changeChordSymbol,
  changeMidiNoteNumber,
  changeIsDarkMode,
} from '../../../../store/operators'
import { utilitySelector } from '../../../../store/selector'
import { State } from '../../../../store/state/types'

export type DispatchToProps = {
  onChangeBaseNoteSymbol: (baseNoteSymbol: State['chordSymbol']['value']) => void
  onChangeBaseNoteNumber: (baseNoteNumber: State['midiNoteNumber']['value']) => void
  onChangeBeat: (beat: State['beat']['value']) => void
  onChangeIsDarkMode: (isDarkMode: State['isDarkMode']['value']) => void
}

export type StateToProps = Pick<
  State,
  'locale' | 'chordSymbol' | 'beat' | 'midiNoteNumber' | 'isDarkMode'
>

export const MobileSettingsContainer = (): JSX.Element => {
  const dispatch = useDispatch()
  const state = useSelector<State, State>((state: State) => state, shallowEqual)

  const operators = React.useMemo(
    () => ({
      changeBeat: changeBeat(dispatch),
      changeChordSymbol: changeChordSymbol(dispatch),
      changeMidiNoteNumber: changeMidiNoteNumber(dispatch),
      changeIsDarkMode: changeIsDarkMode(dispatch),
    }),
    [dispatch]
  )

  const onChangeBaseNoteSymbol: DispatchToProps['onChangeBaseNoteSymbol'] = React.useCallback(
    (value) => {
      operators.changeChordSymbol({ chordSymbol: { value, from: FROM.APP } })
    },
    [operators]
  )

  const onChangeBaseNoteNumber: DispatchToProps['onChangeBaseNoteNumber'] = React.useCallback(
    (value) => {
      operators.changeMidiNoteNumber({ midiNoteNumber: { value, from: FROM.APP } })
    },
    [operators]
  )

  const onChangeBeat: DispatchToProps['onChangeBeat'] = React.useCallback(
    (value) => {
      operators.changeBeat({ beat: { value, from: FROM.APP } })
    },
    [operators]
  )

  const onChangeIsDarkMode: DispatchToProps['onChangeIsDarkMode'] = React.useCallback(
    (value) => {
      operators.changeIsDarkMode({ value, from: FROM.APP })
    },
    [operators]
  )

  const dispatchToProps: DispatchToProps = React.useMemo(
    () => ({
      onChangeBaseNoteSymbol,
      onChangeBaseNoteNumber,
      onChangeBeat,
      onChangeIsDarkMode,
    }),
    [onChangeBaseNoteSymbol, onChangeBaseNoteNumber, onChangeBeat, onChangeIsDarkMode]
  )

  const stateToProps: StateToProps = React.useMemo(
    () => utilitySelector(state, ['locale', 'chordSymbol', 'beat', 'midiNoteNumber', 'isDarkMode']),
    [state]
  )

  return <MobileSetting {...dispatchToProps} {...stateToProps} />
}
