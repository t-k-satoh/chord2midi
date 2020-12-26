import { createSelector } from 'reselect'
import { InitialState } from '../state/types'

export const selector = {
  chordSymbol: createSelector<
    InitialState,
    InitialState['chordSymbol'],
    InitialState['chordSymbol']
  >(
    (state: InitialState) => state.chordSymbol,
    (chordSymbol) => chordSymbol
  ),
  beat: createSelector<InitialState, InitialState['beat'], InitialState['beat']>(
    (state: InitialState) => state.beat,
    (beat) => beat
  ),
  locale: createSelector<InitialState, InitialState['locale'], InitialState['locale']>(
    (state: InitialState) => state.locale,
    (locale) => locale
  ),
  midiNoteNumber: createSelector<
    InitialState,
    InitialState['midiNoteNumber'],
    InitialState['midiNoteNumber']
  >(
    (state: InitialState) => state.midiNoteNumber,
    (midiNoteNumber) => midiNoteNumber
  ),
  value: createSelector<InitialState, InitialState['value'], InitialState['value']>(
    (state: InitialState) => state.value,
    (value) => value
  ),
}
