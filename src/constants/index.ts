import { Init, ChordSymbol, Beat, MIDINoteNumber, Url, App, Launch } from '../types'

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

export const FROM: {
  URL: Url
  APP: App
  LAUNCH: Launch
  INIT: Init
} = {
  URL: 'url',
  APP: 'app',
  LAUNCH: 'launch',
  INIT: 'init',
}

export const INIT_VALUE: {
  chordSymbol: ChordSymbol
  beat: Beat
  midiNoteNumber: MIDINoteNumber
  value: string
} = {
  chordSymbol: 'C',
  beat: '4/4',
  midiNoteNumber: 3,
  value: '',
}
