import { Note as tonalNote } from '@tonaljs/tonal'
import _ from 'lodash'
import { Data, Chord, Bar, Note } from '../../../../types'

export const makeViewData = (
  bars: Bar[],
  chords: Chord[],
  notes: Note[],
  data: Data[],
  baseNote: number
): {
  index: number
  isError: boolean
  targetChords: {
    index: number
    isBarError: boolean
    chordDuration: number
    symbol: string
    targetNotes: {
      index: number
      targetData: Data
      interval: number
    }[]
    isNoteError: boolean
  }[]
}[] => {
  return bars.map(({ index }) => {
    const targetChords = chords
      .filter((chord) => chord.barIndex === index)
      .map((targetChord) => {
        const isBarError = targetChord.isError
        const chordDuration =
          (_.uniq(
            data
              .filter(({ chordIndex }) => chordIndex === targetChord.index)
              .map(({ duration }) => duration)
          )[0] /
            2) *
          100
        const symbol =
          'symbol' in targetChord
            ? targetChord.symbol
            : `${targetChord.configurationSymbol}/${targetChord.baseSymbol}`
        const targetNotes = notes.filter(
          ({ chordIndex, barIndex }) => chordIndex === targetChord.index && barIndex === index
        )
        const isNoteError = targetNotes.some((note) => note.isError)

        return {
          index: targetChord.index,
          isBarError,
          chordDuration,
          symbol,
          targetNotes: targetNotes.map((targetNote) => {
            const targetData = data.find(
              ({ noteIndex, chordIndex, barIndex }) =>
                noteIndex === targetNote.index &&
                chordIndex === targetChord.index &&
                barIndex === index
            )
            const interval = tonalNote.midi(targetData.note) - baseNote

            return {
              index: targetNote.index,
              targetData,
              interval,
            }
          }),
          isNoteError,
        }
      })
    const isError = targetChords.some((chord) => chord.isBarError)

    return {
      index,
      targetChords,
      isError,
    }
  })
}
