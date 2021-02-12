import { Note as tonalNote } from '@tonaljs/tonal'
import _ from 'lodash'
import { Data, Chord, Bar, Note } from '../../../../types'

export const makeViewData = ({
  bars,
  chords,
  notes,
  data,
  baseNote,
  timeSignature,
}: {
  bars: Bar[]
  chords: Chord[]
  notes: Note[]
  data: Data[]
  baseNote: number
  timeSignature: number
}): {
  index: number
  targetChords: {
    index: number
    width: number
    notes: {
      index: number
      isError: boolean
      position: number
    }[]
  }[]
  isError: boolean
}[] => {
  return bars.map(({ index, isError }) => {
    const targetChords = chords
      .filter((chord) => chord.barIndex === index)
      .map((targetChord) => {
        const width =
          (_.uniq(
            data
              .filter(
                ({ chordIndex, barIndex }) =>
                  chordIndex === targetChord.index && barIndex === targetChord.barIndex
              )
              .map(({ duration }) => duration)
          )[0] /
            (timeSignature / 2)) *
          100
        const targetNotes = notes.filter(
          ({ chordIndex, barIndex }) => chordIndex === targetChord.index && barIndex === index
        )

        return {
          index: targetChord.index,
          width,
          notes: targetNotes.map((targetNote) => {
            const targetData = data.find(
              ({ noteIndex, chordIndex, barIndex }) =>
                noteIndex === targetNote.index &&
                chordIndex === targetChord.index &&
                barIndex === index
            )

            return {
              index: targetNote.index,
              isError: targetNote.isError,
              position: tonalNote.midi(targetData.note) - baseNote,
            }
          }),
        }
      })

    return {
      index,
      targetChords,
      isError,
    }
  })
}
