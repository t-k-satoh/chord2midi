import { Init, ChordSymbol, Beat, MIDINoteNumber } from '../types'

export const HeaderHight = 60

export const CHORD_SYMBOL = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
] as const

export const BEAT = ['4/4', '3/4'] as const

export const INIT: Init = 'init'

export const LOCALES = ['en', 'ja'] as const

export const initValue: {
  chordSymbol: ChordSymbol
  beat: Beat
  midiNoteNumber: MIDINoteNumber
} = {
  chordSymbol: 'C',
  beat: '4/4',
  midiNoteNumber: 3,
}
