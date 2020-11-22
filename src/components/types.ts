export type Data = {
  uuid: string
  note: string
  time: number
  duration: 0.5 | 1 | 2
  noteIndex: number
  symbol: string
  chordIndex: number
}

export type Chord = {
  uuid: string
  index: number
  chord: string[]
}
