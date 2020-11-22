import { Chord as tonalChord, Note } from '@tonaljs/tonal'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Data, Chord } from '../types'

const chordValidate = (chord: ReturnType<typeof tonalChord.get>): boolean =>
  !chord.empty && chord.name !== '' && chord.notes.length !== 0

const makeDuration = (splitSpace: string[], chordIndex: number): 0.5 | 1 | 2 => {
  if (splitSpace.length === 3 && chordIndex !== 2) {
    return 0.5
  } else if (splitSpace.length === 3 && chordIndex === 2) {
    return 1
  }

  return (2 / splitSpace.length) as 0.5 | 1 | 2
}

const makeTime = (splitSpace: string[], chordIndex: number, noteIndex: number): number =>
  splitSpace.length === 3 && chordIndex === 2
    ? noteIndex * 2 + makeDuration(splitSpace, chordIndex) * 1
    : noteIndex * 2 + makeDuration(splitSpace, chordIndex) * chordIndex

export const useChordParser = (
  chordText: string
): [data: Data[], isError: boolean, errorDetails: string, allChords: Chord[]] => {
  const [isError, setIsError] = React.useState<boolean>(false)
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

  React.useEffect(() => {
    const tempData: Data[] = []
    const tempAllChords: Chord[] = []

    if (notes.length === 0) {
      setIsError(false)
      setErrorDetails('')
      setData([])
      return
    }

    notes.forEach((note, noteIndex) => {
      const splitSpace = note.split(' ')
      const uuid = uuidv4()

      if (splitSpace.some((chord) => chord === '')) {
        // コード表記が不正
        console.log('コード表記が不正')
        setErrorDetails(`コード表記が不正です (${JSON.stringify(splitSpace)})`)
        setIsError(true)
        return
      }

      tempAllChords.push({ chord: splitSpace, index: noteIndex, uuid })

      splitSpace.forEach((chords, chordIndex) => {
        const hasOnChord = chords.indexOf('/') !== -1
        const duration = makeDuration(splitSpace, chordIndex)
        const time = makeTime(splitSpace, chordIndex, noteIndex)

        if (hasOnChord) {
          const splitSlash = chords.split('/')
          const isInvalidOnChord = splitSlash.some((chord) => chord === '')

          if (isInvalidOnChord) {
            // 不正なオンコードがある
            console.log('不正なオンコードがある')
            setIsError(true)
            setErrorDetails(`不正なオンコードがあります (${JSON.stringify(splitSlash)})`)
            return
          }

          const configurationChord = tonalChord.get(splitSlash[0])
          const baseChord = tonalChord.get(splitSlash[1])

          if (!chordValidate(configurationChord)) {
            // オンコードの構成音が不正
            console.log('オンコードの構成音が不正')
            setIsError(true)
            setErrorDetails(`オンコードの構成音が不正です (${JSON.stringify(chords)})`)
            return
          }

          if (!chordValidate(baseChord)) {
            // オンコードのベース音が不正
            console.log('オンコードのベース音が不正')
            setErrorDetails(`オンコードのベース音が不正です (${JSON.stringify(chords)})`)
            setIsError(true)
            return
          }

          // Base 音
          tempData.push({
            note: `${baseChord.tonic}3`,
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
                `${configurationChord.tonic}3`,
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

          setIsError(false)
          setErrorDetails('')
        } else {
          const newChord = tonalChord.get(chords)
          const root = `${newChord.tonic}3`

          if (!chordValidate(newChord)) {
            // コード表記が不正
            console.log('コード表記が不正')
            setErrorDetails(`コード表記が不正です (${JSON.stringify(chords)})`)
            setIsError(true)
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

          setIsError(false)
          setErrorDetails('')
        }
      })
    })

    setData(tempData)
    setAllChords(
      tempAllChords.filter(({ chord }) =>
        chord.every((_chord) => {
          const hasOnChord = _chord.indexOf('/') !== -1

          if (hasOnChord) {
            const splitSlash = _chord.split('/')
            const configurationChord = tonalChord.get(splitSlash[0])
            const baseChord = tonalChord.get(splitSlash[1])

            return chordValidate(configurationChord) && chordValidate(baseChord)
          }

          return chordValidate(tonalChord.get(_chord))
        })
      )
    )
  }, [notes])

  return [data, isError, errorDetails, allChords]
}
