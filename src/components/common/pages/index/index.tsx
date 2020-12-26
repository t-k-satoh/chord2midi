import React from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import useDarkMode from 'use-dark-mode'
import { INIT } from '../../../../constants'
import { actions } from '../../../../store/actions'
import { selector } from '../../../../store/selector'
import { InitialState } from '../../../../store/state/types'
import { Browser } from '../../../browser/pages/home'
import { MobileHome } from '../../../mobile/pages/home'

export const Index: React.FC = () => {
  const dispatch = useDispatch()
  const { value: isDarkMode } = useDarkMode(false)
  const state = useSelector<InitialState, InitialState>(
    (state: InitialState) => state,
    shallowEqual
  )
  const chordSymbol = React.useMemo(() => selector.chordSymbol(state), [state])
  const beat = React.useMemo(() => selector.beat(state), [state])
  const locale = React.useMemo(() => selector.locale(state), [state])
  const value = React.useMemo(() => selector.value(state), [state])
  const midiNoteNumber = React.useMemo(() => selector.midiNoteNumber(state), [state])

  const onChangeValue = React.useCallback(
    (value: string) => {
      dispatch(actions.value({ value: { value, from: 'app' } }))
    },
    [dispatch]
  )

  return (
    <>
      {isBrowser ? (
        <Browser />
      ) : (
        <MobileHome
          isDarkMode={isDarkMode}
          locale={locale}
          currentValue={value.value === INIT ? '' : value.value}
          chordSymbol={chordSymbol.value}
          beat={beat.value}
          midiNoteNumber={midiNoteNumber.value}
          onChangeValue={onChangeValue}
        />
      )}
    </>
  )
}
