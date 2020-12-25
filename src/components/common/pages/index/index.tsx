import React from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import useDarkMode from 'use-dark-mode'
import { INIT } from '../../../../constants'
import { State } from '../../../../store/store'
import { Browser } from '../../../browser/pages/home'
import { MobileHome } from '../../../mobile/pages/home'

export const Index: React.FC = () => {
  const dispatch = useDispatch()
  const { value: isDarkMode } = useDarkMode(false)
  const { locale, chordSymbol, beat, midiNoteNumber, value } = useSelector<State, State>(
    (state: State) => state,
    shallowEqual
  )

  const onChangeValue = React.useCallback(
    (payload: string) => {
      dispatch({ type: 'VALUE', payload })
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
          currentValue={value === INIT ? '' : value}
          chordSymbol={chordSymbol}
          beat={beat}
          midiNoteNumber={midiNoteNumber}
          onChangeValue={onChangeValue}
        />
      )}
    </>
  )
}
