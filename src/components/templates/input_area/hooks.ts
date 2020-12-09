import React from 'react'
import { Beats } from '../../constants'
import { Bar, Chord, Note, Data } from '../../types'
import { makeBars, makeChords, makeNotes, makeData } from './utils'

export const useChordParser = (
  chordText: string,
  baseNoteNumber: number,
  beat: typeof Beats[number]
): [bars: Bar[], chords: Chord[], notes: Note[], data: Data[]] => {
  const bars = React.useMemo(() => makeBars(chordText), [chordText])
  const chords = React.useMemo(() => makeChords(bars), [bars])
  const notes = React.useMemo(() => makeNotes(chords), [chords])
  const data = React.useMemo(() => makeData(bars, chords, notes, baseNoteNumber, beat), [
    bars,
    chords,
    notes,
    baseNoteNumber,
    beat,
  ])

  return [bars, chords, notes, data]
}
