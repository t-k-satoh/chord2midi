import { ChordSymbol, Beat, MIDINoteNumber, Locale, From, Value, Query, Init } from '../../types'

type MergeValueAndFrom<T> = {
  value: T
  from: From
}

export type MergeInit<T> = T | Init

export type State = {
  chordSymbol: MergeValueAndFrom<ChordSymbol>
  beat: MergeValueAndFrom<Beat>
  midiNoteNumber: MergeValueAndFrom<MIDINoteNumber>
  value: MergeValueAndFrom<Value>
  locale: MergeInit<Locale>
  query: MergeInit<Partial<Query>>
  version: MergeInit<string>
  isDarkMode: MergeValueAndFrom<boolean>
  isBrowser: MergeInit<boolean>
  isHome: MergeInit<boolean>
  isDisabledDownLoad: MergeInit<boolean>
  isDisabledShare: MergeInit<boolean>
}
