import { Note as tonalNote } from '@tonaljs/tonal'
import _ from 'lodash'
import { I18N } from '../../../../constants/i18n'
import { Data, Chord, Bar, Note, Locale, ExcludeInit } from '../../../../types'
import * as utils from '../../../../utils'

type MakeViewData = (payload: {
  bars: Bar[]
  chords: Chord[]
  notes: Note[]
  data: Data[]
  baseNote: number
  molecular: number
}) => {
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
}[]

export const makeViewData: MakeViewData = ({ bars, chords, notes, data, baseNote, molecular }) => {
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

type GenerateDialogChord = (payload: {
  bars: Bar[]
  chords: Chord[]
  notes: Note[]
  locale: ExcludeInit<Locale>
  selectedChord: {
    barIndex: number
    chordIndex: number
  }
}) => {
  title: string
  texts: string[]
  isError: boolean
}

export const generateDialogChord: GenerateDialogChord = ({
  bars,
  chords,
  notes,
  locale,
  selectedChord,
}): {
  title: string
  texts: string[]
  isError: boolean
} => {
  const currentBar = bars.find((bar) => bar.index === selectedChord.barIndex)
  const currentChord = chords.find(
    (chord) => chord.barIndex === selectedChord.barIndex && chord.index === selectedChord.chordIndex
  )
  const currentNotes = notes.filter(
    (note) =>
      note.barIndex === selectedChord.barIndex && note.chordIndex === selectedChord.chordIndex
  )

  if (
    typeof currentBar === 'undefined' ||
    typeof currentChord === 'undefined' ||
    typeof currentNotes === 'undefined'
  ) {
    const errorText = utils.switchLangText(I18N.UTILS.ERROR, locale, null)

    return {
      title: errorText,
      texts: [errorText],
      isError: true,
    }
  }

  if (currentChord.isError) {
    return {
      title: currentBar.chords[currentChord.index],
      texts: [utils.switchLangText(I18N.HOME.INVALID_CHORD, locale, null)],
      isError: true,
    }
  }

  return {
    title:
      'symbol' in currentChord
        ? currentChord.symbol
        : `${currentChord.configurationSymbol}/${currentChord.baseSymbol}`,
    texts: currentNotes.map(({ note, distance }) => `${distance}: ${note}`),
    isError: false,
  }
}
