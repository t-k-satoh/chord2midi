import { Chord as tonalChord, Note } from '@tonaljs/tonal'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Beats } from '../../constants'
import { Data, Chord } from '../../types'
import { chordValidate, makeDuration, makeTime } from './utils'

export const useChordParser = (
  chordText: string,
  baseNoteNumber: number,
  beat: typeof Beats[number]
): [data: Data[], errorDetails: string, allChords: Chord[]] => {
  const [errorDetails, setErrorDetails] = React.useState<string>('')
  const [data, setData] = React.useState<Data[]>([])
  const [allChords, setAllChords] = React.useState<Chord[]>([])

  const notes = React.useMemo(
    () =>
      chordText
        .replace(/\r?\n/g, '|')
        .split('|')
        .map((note) => note.trim())
        .filter((note) => note !== '' && note !== ' '),
    [chordText]
  )

  const newBaseNoteNumber = React.useMemo(() => baseNoteNumber + 1, [baseNoteNumber])

  const newBest: {
    denominator: number
    numerator: number
  } = React.useMemo(() => {
    const split = beat.split('/')

    return {
      denominator: Number(split[1]),
      numerator: Number(split[0]),
    }
  }, [beat])

  React.useEffect(() => {
    const tempData: Data[] = []
    const tempAllChords: Omit<Chord, 'isError'>[] = []

    if (notes.length === 0) {
      setErrorDetails('')
      setData([])
      setAllChords([])
      return
    }

    notes.forEach((note, noteIndex) => {
      const splitSpace = note.split(' ')
      const uuid = uuidv4()

      tempAllChords.push({ chord: splitSpace, index: noteIndex, uuid })

      if (splitSpace.length > newBest.numerator) {
        // コード表記が不正
        setErrorDetails(`The code notation is incorrect`)
        return
      }

      splitSpace.forEach((chords, chordIndex) => {
        const hasOnChord = chords.indexOf('/') !== -1
        const duration = makeDuration(splitSpace, chordIndex)
        const time = makeTime(splitSpace, chordIndex, noteIndex)

        if (hasOnChord) {
          const splitSlash = chords.split('/')
          const isInvalidOnChord = splitSlash.some((chord) => chord === '')

          if (isInvalidOnChord && splitSlash[1] !== '') {
            // 不正なオンコードがある
            setErrorDetails(`There is an incorrect on-code`)
            return
          }

          const configurationChord = tonalChord.get(splitSlash[0])
          const baseChord = tonalChord.get(splitSlash[1])

          if (!chordValidate(configurationChord)) {
            // オンコードの構成音が不正
            setErrorDetails(`The configuration note on the chord is incorrect`)
            return
          }

          if (!chordValidate(baseChord) && splitSlash[1] !== '') {
            // オンコードのベース音が不正
            setErrorDetails(`The bass note on the chord is incorrect`)
            return
          }

          // Base 音
          tempData.push({
            note: `${baseChord.tonic}${newBaseNoteNumber}`,
            time,
            duration,
            noteIndex,
            symbol: `${configurationChord.symbol}/${baseChord.symbol}`,
            uuid,
            chordIndex,
          })

          // 構成音
          const removeBaseNotes = configurationChord.notes.filter(
            (_note) => _note !== configurationChord.tonic
          )

          for (const [newNoteIndex] of removeBaseNotes.entries()) {
            tempData.push({
              note: Note.transpose(
                `${configurationChord.tonic}${newBaseNoteNumber}`,
                configurationChord.intervals[newNoteIndex + 1]
              ),
              time,
              duration,
              noteIndex,
              symbol: `${configurationChord.symbol}/${baseChord.symbol}`,
              uuid,
              chordIndex,
            })
          }

          setErrorDetails('')
        } else {
          const newChord = tonalChord.get(chords)
          const root = `${newChord.tonic}${newBaseNoteNumber}`

          if (!chordValidate(newChord)) {
            // コード表記が不正
            setErrorDetails(`The code notation is incorrect`)
            return
          }

          for (const [newNoteIndex] of newChord.notes.entries()) {
            const isRoot = newNoteIndex === 0

            tempData.push({
              note: `${isRoot ? root : Note.transpose(root, newChord.intervals[newNoteIndex])}`,
              time,
              duration,
              noteIndex,
              symbol: newChord.symbol,
              uuid,
              chordIndex,
            })
          }
        }
      })
    })

    setData(tempData)
    setAllChords(
      tempAllChords.map((tempAllChord) => {
        const isError =
          tempAllChord.chord.length > newBest.numerator ||
          tempAllChord.chord.every((_chord) => {
            const hasOnChord = _chord.indexOf('/') !== -1

            if (hasOnChord) {
              const splitSlash = _chord.split('/')
              const configurationChord = tonalChord.get(splitSlash[0])
              const baseChord = tonalChord.get(splitSlash[1])

              return !chordValidate(configurationChord) && !chordValidate(baseChord)
            }

            return !chordValidate(tonalChord.get(_chord))
          })

        return {
          ...tempAllChord,
          isError,
        }
      })
    )
  }, [notes, newBaseNoteNumber, newBest])

  return [data, errorDetails, allChords]
}
