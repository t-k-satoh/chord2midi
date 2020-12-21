import { CHORD_SYMBOL, BEAT } from './constants'

export type ChordSymbol = typeof CHORD_SYMBOL[number]

export type Beat = typeof BEAT[number]

export type MIDINoteNumber = number

export type State = {
  chordSymbol: ChordSymbol
  beat: Beat
  midiNoteNumber: MIDINoteNumber
}
