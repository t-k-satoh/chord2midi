import { Chord as tonalChord } from '@tonaljs/tonal'

export const chordValidate = (chord: ReturnType<typeof tonalChord.get>): boolean =>
  !chord.empty && chord.name !== '' && chord.notes.length !== 0

export const makeDuration = (splitSpace: string[], chordIndex: number): 0.5 | 1 | 2 => {
  if (splitSpace.length === 3 && chordIndex !== 2) {
    return 0.5
  } else if (splitSpace.length === 3 && chordIndex === 2) {
    return 1
  }

  return (2 / splitSpace.length) as 0.5 | 1 | 2
}

export const makeTime = (splitSpace: string[], chordIndex: number, noteIndex: number): number =>
  splitSpace.length === 3 && chordIndex === 2
    ? noteIndex * 2 + makeDuration(splitSpace, chordIndex) * 1
    : noteIndex * 2 + makeDuration(splitSpace, chordIndex) * chordIndex
