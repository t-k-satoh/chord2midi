import { CHORD_SYMBOL, BEAT, PATHS } from '../constants'

export type Data = {
  index: number
  barIndex: number
  chordIndex: number
  noteIndex: number
  note: string
  time: number
  duration: number
}

export type Bar = {
  index: number
  chords: string[]
  isError: boolean
}

export type Chord =
  | {
      barIndex: number
      index: number
      symbol: string
      isError: boolean
    }
  | {
      barIndex: number
      index: number
      configurationSymbol: string
      baseSymbol: string
      isError: boolean
    }

export type Note = {
  note: string
  index: number
  distance: string
  barIndex: number
  chordIndex: number
  isError: boolean
}

export type Error = {
  index: string
  barIndex?: number
  chordIndex?: number
  dataIndex?: number
  code: string
}

export type Init = 'init'

export type Url = 'url'

export type App = 'app'

export type Launch = 'launch'

export type ChordSymbol = typeof CHORD_SYMBOL[number] | Init

export type Beat = typeof BEAT[number] | Init

export type MIDINoteNumber = number | Init

export type Locale = 'en' | 'ja' | Init

export type From = Url | App | Launch | Init

export type Value = string | Init

export type BPM = number | Init

export type Query = {
  value: string
  chordSymbol: typeof CHORD_SYMBOL[number]
  beat: typeof BEAT[number]
  midiNoteNumber: string
  bpm: string
}

export type MergeInit<T> = T | Init

export type MergeValueAndFrom<T> = {
  value: T
  from: From
}

export type PickValue<T extends MergeValueAndFrom<unknown>> = T['value']

export type LanguageObject = {
  ja: string
  en: string
}

export type ShouldReplaceText = {
  replaceKeys: ReadonlyArray<string>
}

export type ExcludeInit<T extends MergeInit<unknown>> = Exclude<T, Init>

export type ExcludeInitObject<
  T extends Record<string, MergeInit<unknown>>,
  U = { [K in keyof T]: ExcludeInit<T[K]> }
> = U

export type PathKeys = keyof typeof PATHS

export type ExcludeAllInit<
  T extends Record<string, MergeValueAndFrom<unknown> | MergeInit<unknown>>,
  U = {
    [K in keyof T]: T[K] extends MergeValueAndFrom<unknown>
      ? ExcludeInit<T[K]['value']>
      : ExcludeInit<T[K]>
  }
> = U
