import { ChordSymbol, Beat, MIDINoteNumber, Locale, From, Value } from '../../types'

type MergeValueAndFrom<T> = {
  value: T
  from: From
}

export type InitialState = {
  chordSymbol: MergeValueAndFrom<ChordSymbol>
  beat: MergeValueAndFrom<Beat>
  midiNoteNumber: MergeValueAndFrom<MIDINoteNumber>
  value: MergeValueAndFrom<Value>
  locale: Locale
}
