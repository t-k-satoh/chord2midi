import { Init, ChordSymbol, Beat, MIDINoteNumber, Url, App, Launch, LanguageObject } from '../types'

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

export const EN = 'en' as const

export const JA = 'ja' as const

export const BEAT = ['4/4', '3/4'] as const

export const INIT: Init = 'init' as const

export const LOCALES = [EN, JA] as const

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
} as const

export const INIT_VALUE: {
  chordSymbol: ChordSymbol
  beat: Beat
  midiNoteNumber: MIDINoteNumber
  value: string
  bpm: number
} = {
  chordSymbol: 'C',
  beat: '4/4',
  midiNoteNumber: 3,
  value: '',
  bpm: 120,
} as const

export const PAGE_TITLES: Record<string, LanguageObject> = {
  settings: {
    ja: '設定',
    en: 'Settings',
  },
  howToUse: {
    ja: '使い方',
    en: 'How to use',
  },
} as const

export const PATHS = {
  HOME: '/',
  SETTINGS: '/settings',
  HOW_TO_USE: '/how_to_use',
  CONTACT: '/contact',
  SPECIFICATIONS: '/specifications',
} as const
