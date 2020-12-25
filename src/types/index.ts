import { CHORD_SYMBOL, BEAT } from '../constants'

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

export type ChordSymbol = typeof CHORD_SYMBOL[number] | Init

export type Beat = typeof BEAT[number] | Init

export type MIDINoteNumber = number | Init

export type Locale = 'en' | 'ja' | Init

export type From = 'url' | 'app' | Init

export type Value = string | Init
