import { Note as tonalNote } from '@tonaljs/tonal'
import _ from 'lodash'
import { Data, Chord, Bar, Note } from '../../../../types'

export const makeViewData = (
  bars: Bar[],
  chords: Chord[],
  notes: Note[],
  data: Data[],
  baseNote: number,
  molecular: number
): {
  index: number
  isError: boolean
  targetChords: {
    index: number
    isChordError: boolean
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
  return bars.map(({ index, isError }) => {
    const targetChords = chords
      .filter((chord) => chord.barIndex === index)
      .map((targetChord) => {
        const isChordError = targetChord.isError
        const chordDuration =
          (_.uniq(
            data
              .filter(
                ({ chordIndex, barIndex }) =>
                  chordIndex === targetChord.index && barIndex === targetChord.barIndex
              )
              .map(({ duration }) => duration)
          )[0] /
            (molecular / 2)) *
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
          isChordError,
          chordDuration,
          symbol,
          targetNotes: targetNotes
            .map((targetNote) => {
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
            })
            .filter(({ targetData }) => targetData),
          isNoteError,
        }
      })

    return {
      index,
      targetChords,
      isError,
    }
  })
}
