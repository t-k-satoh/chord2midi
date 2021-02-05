import {
  ChordSymbol,
  Beat,
  MIDINoteNumber,
  Locale,
  Value,
  Query,
  MergeValueAndFrom,
  MergeInit,
  BPM,
} from '../../types'

export type State = {
  chordSymbol: MergeValueAndFrom<ChordSymbol>
  beat: MergeValueAndFrom<Beat>
  midiNoteNumber: MergeValueAndFrom<MIDINoteNumber>
  value: MergeValueAndFrom<Value>
  bpm: MergeValueAndFrom<BPM>
  locale: MergeInit<Locale>
  query: MergeInit<Partial<Query>>
  version: MergeInit<string>
  isDarkMode: MergeValueAndFrom<boolean>
  isBrowser: MergeInit<boolean>
  isHome: MergeInit<boolean>
  isDisabledDownLoad: MergeInit<boolean>
  isDisabledShare: MergeInit<boolean>
}
