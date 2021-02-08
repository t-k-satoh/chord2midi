import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { MobileSetting } from '../../../../components/mobile/pages/settings'
import { FROM } from '../../../../constants'
import * as operators from '../../../../store/operators'
import { utilitySelector } from '../../../../store/selector'
import { State } from '../../../../store/state/types'
import { PickValue } from '../../../../types'

export type DispatchToProps = {
  onChangeBaseNoteSymbol: (baseNoteSymbol: PickValue<State['chordSymbol']>) => void
  onChangeBaseNoteNumber: (baseNoteNumber: PickValue<State['midiNoteNumber']>) => void
  onChangeBeat: (beat: PickValue<State['beat']>) => void
  onChangeBPM: (bpm: PickValue<State['bpm']>) => void
  onChangeIsDarkMode: (isDarkMode: PickValue<State['isDarkMode']>) => void
}

export type StateToProps = Pick<
  State,
  'locale' | 'chordSymbol' | 'beat' | 'midiNoteNumber' | 'isDarkMode' | 'bpm'
>

export const MobileSettingsContainer = (): JSX.Element => {
  const dispatch = useDispatch()
  const state = useSelector<State, State>((state: State) => state, shallowEqual)

  const onChangeBaseNoteSymbol: DispatchToProps['onChangeBaseNoteSymbol'] = React.useCallback(
    (value) => {
      dispatch(operators.changeChordSymbol({ chordSymbol: { value, from: FROM.APP } }))
    },
    [dispatch]
  )

  const onChangeBaseNoteNumber: DispatchToProps['onChangeBaseNoteNumber'] = React.useCallback(
    (value) => {
      dispatch(operators.changeMidiNoteNumber({ midiNoteNumber: { value, from: FROM.APP } }))
    },
    [dispatch]
  )

  const onChangeBeat: DispatchToProps['onChangeBeat'] = React.useCallback(
    (value) => {
      dispatch(operators.changeBeat({ beat: { value, from: FROM.APP } }))
    },
    [dispatch]
  )

  const onChangeIsDarkMode: DispatchToProps['onChangeIsDarkMode'] = React.useCallback(
    (value) => {
      dispatch(operators.changeIsDarkMode({ isDarkMode: { value, from: FROM.APP } }))
    },
    [dispatch]
  )

  const onChangeBPM: DispatchToProps['onChangeBPM'] = React.useCallback(
    (value) => {
      dispatch(operators.changeBPM({ bpm: { value, from: FROM.APP } }))
    },
    [dispatch]
  )

  const dispatchToProps: DispatchToProps = React.useMemo(
    () => ({
      onChangeBaseNoteSymbol,
      onChangeBaseNoteNumber,
      onChangeBeat,
      onChangeIsDarkMode,
      onChangeBPM,
    }),
    [onChangeBaseNoteSymbol, onChangeBaseNoteNumber, onChangeBeat, onChangeIsDarkMode, onChangeBPM]
  )

  const stateToProps: StateToProps = React.useMemo(
    () =>
      utilitySelector(state, [
        'locale',
        'chordSymbol',
        'beat',
        'midiNoteNumber',
        'isDarkMode',
        'bpm',
      ]),
    [state]
  )

  return <MobileSetting {...dispatchToProps} {...stateToProps} />
}
