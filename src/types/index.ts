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
