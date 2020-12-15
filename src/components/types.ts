export type Data = {
  uuid: string
  barUuid: string
  chordUuid: string
  noteUuid: string
  note: string
  time: number
  duration: number
}

export type Bar = {
  uuid: string
  index: number
  chords: string[]
}

export type Chord =
  | {
      uuid: string
      barUuid: string
      index: number
      symbol: string
    }
  | {
      uuid: string
      barUuid: string
      index: number
      configurationSymbol: string
      baseSymbol: string
    }

export type Note = {
  uuid: string
  note: string
  index: number
  distance: string
  barUuid: string
  chordUuid: string
  isError: boolean
}

export type Error = {
  uuid: string
  barUuid?: string
  chordUuid?: string
  dataUuid?: string
  code: string
}
