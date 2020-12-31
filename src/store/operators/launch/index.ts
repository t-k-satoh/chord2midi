import _ from 'lodash'
import { Dispatch } from 'react'
import { BEAT, CHORD_SYMBOL, INIT_VALUE, FROM } from '../../../constants'
import { INIT } from '../../../constants'
import { ActionTypes } from '../../actions'
import { actions } from '../../actions'
import { State } from '../../state/types'

export const launch = (
  dispatch: Dispatch<ActionTypes>,
  state: Pick<State, 'beat' | 'chordSymbol' | 'midiNoteNumber' | 'value'>
) => (
  query: State['query'],
  isDarkMode: State['isDarkMode'],
  isBrowser: State['isBrowser'],
  version: State['version']
): void => {
  const allValues = [
    ...Object.values(state).map(({ value }) => value),
    query,
    isDarkMode,
    isBrowser,
    version,
  ]

  // Add Beat
  if (
    query !== INIT &&
    BEAT.includes(query.beat) &&
    query.beat !== undefined &&
    state.beat.from !== FROM.URL &&
    state.beat.from !== FROM.APP
  ) {
    dispatch(actions.beat({ beat: { value: query.beat, from: FROM.URL } }))
  } else if (state.beat.from === FROM.INIT) {
    dispatch(actions.beat({ beat: { value: INIT_VALUE.beat, from: FROM.LAUNCH } }))
  }

  // Add ChordSymbol
  if (
    query !== INIT &&
    CHORD_SYMBOL.includes(query.chordSymbol) &&
    query.chordSymbol !== undefined &&
    state.chordSymbol.from !== FROM.URL &&
    state.chordSymbol.from !== FROM.APP
  ) {
    dispatch(actions.chordSymbol({ chordSymbol: { value: query.chordSymbol, from: FROM.URL } }))
  } else if (state.chordSymbol.from === FROM.INIT) {
    dispatch(
      actions.chordSymbol({ chordSymbol: { value: INIT_VALUE.chordSymbol, from: FROM.LAUNCH } })
    )
  }

  // Add MidiNoteNumber
  if (
    query !== INIT &&
    _.isNumber(Number(query.midiNoteNumber)) &&
    query.midiNoteNumber !== undefined &&
    state.midiNoteNumber.from !== FROM.URL &&
    state.midiNoteNumber.from !== FROM.APP
  ) {
    dispatch(
      actions.midiNoteNumber({
        midiNoteNumber: { value: Number(query.midiNoteNumber), from: FROM.URL },
      })
    )
  } else if (state.midiNoteNumber.from === FROM.INIT) {
    dispatch(
      actions.midiNoteNumber({
        midiNoteNumber: { value: INIT_VALUE.midiNoteNumber, from: FROM.LAUNCH },
      })
    )
  }

  // Add Value
  if (
    query !== INIT &&
    query.value !== undefined &&
    state.value.from !== FROM.URL &&
    state.value.from !== FROM.APP
  ) {
    dispatch(actions.value({ value: { value: query.value, from: FROM.URL } }))
  } else if (state.value.from === FROM.INIT) {
    dispatch(actions.value({ value: { value: INIT_VALUE.value, from: FROM.LAUNCH } }))
  }

  if (allValues.some((value) => value === INIT)) {
    // Add Query
    dispatch(actions.query({ query }))

    // Add IsDarkMode
    dispatch(actions.isDarkMode({ isDarkMode }))

    // Add IsBrowser
    dispatch(actions.isBrowser({ isBrowser }))

    // Add Version
    dispatch(actions.version({ version }))
  }
}
