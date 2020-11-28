export type Data = {
  uuid: string
  note: string
  time: number
  duration: number
  noteIndex: number
  symbol: string
  chordIndex: number
}

export type Chord = {
  uuid: string
  index: number
  chord: string[]
  isError: boolean
}
