import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { MobileSetting } from '../../../../components/mobile/pages/settings'
import { FROM } from '../../../../constants'
import { changeBeat, changeChordSymbol, changeMidiNoteNumber } from '../../../../store/operators'
import { utilitySelector } from '../../../../store/selector'
import { State } from '../../../../store/state/types'

export type DispatchToProps = {
  onChangeBaseNoteSymbol: (baseNoteSymbol: State['chordSymbol']['value']) => void
  onChangeBaseNoteNumber: (baseNoteNumber: State['midiNoteNumber']['value']) => void
  onChangeBeat: (beat: State['beat']['value']) => void
}

export type StateToProps = Pick<State, 'locale' | 'chordSymbol' | 'beat' | 'midiNoteNumber'>

export const MobileSettingsContainer = (): JSX.Element => {
  const dispatch = useDispatch()
  const state = useSelector<State, State>((state: State) => state, shallowEqual)

  const operators = React.useMemo(
    () => ({
      changeBeat: changeBeat(dispatch),
      changeChordSymbol: changeChordSymbol(dispatch),
      changeMidiNoteNumber: changeMidiNoteNumber(dispatch),
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

  const dispatchToProps: DispatchToProps = React.useMemo(
    () => ({
      onChangeBaseNoteSymbol,
      onChangeBaseNoteNumber,
      onChangeBeat,
    }),
    [onChangeBaseNoteSymbol, onChangeBaseNoteNumber, onChangeBeat]
  )

  const stateToProps: StateToProps = React.useMemo(
    () => utilitySelector(state, ['locale', 'chordSymbol', 'beat', 'midiNoteNumber']),
    [state]
  )

  return <MobileSetting {...dispatchToProps} {...stateToProps} />
}
