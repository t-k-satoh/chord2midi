import { Bar, Chord, Note, Data } from '../../../../types'
import { makeBars, makeChords, makeNotes, makeData } from '.'

const allTestData = 'C | C/G | A B | F E D'

test(makeBars.name, () => {
  const testData = allTestData
  const results: Bar[] = [
    { chords: ['C'], index: 0, isError: false },
    { chords: ['C/G'], index: 1, isError: false },
    { chords: ['A', 'B'], index: 2, isError: false },
    { chords: ['F', 'E', 'D'], index: 3, isError: false },
  ]

  expect(makeBars(testData, '4/4')).toEqual(results)
})

test(makeChords.name, () => {
  const testData: Bar[] = [
    { chords: ['C'], index: 0, isError: false },
    { chords: ['C/G'], index: 1, isError: false },
    { chords: ['A', 'B'], index: 2, isError: false },
    { chords: ['F', 'E', 'D'], index: 3, isError: false },
  ]

  const results: Chord[] = [
    { barIndex: 0, index: 0, symbol: 'C', isError: false },
    {
      barIndex: 1,
      index: 0,
      configurationSymbol: 'C',
      baseSymbol: 'G',
      isError: false,
    },
    { barIndex: 2, index: 0, symbol: 'A', isError: false },
    { barIndex: 2, index: 1, symbol: 'B', isError: false },
    { barIndex: 3, index: 0, symbol: 'F', isError: false },
    { barIndex: 3, index: 1, symbol: 'E', isError: false },
    { barIndex: 3, index: 2, symbol: 'D', isError: false },
  ]

  expect(makeChords(testData)).toEqual(results)
})

test(makeNotes.name, () => {
  const testData: Chord[] = [
    { barIndex: 0, index: 0, symbol: 'C', isError: false },
    {
      barIndex: 1,
      index: 0,
      configurationSymbol: 'C',
      baseSymbol: 'G',
      isError: false,
    },
    { barIndex: 2, index: 0, symbol: 'A', isError: false },
    { barIndex: 2, index: 1, symbol: 'B', isError: false },
    { barIndex: 3, index: 0, symbol: 'F', isError: false },
    { barIndex: 3, index: 1, symbol: 'E', isError: false },
    { barIndex: 3, index: 2, symbol: 'D', isError: false },
  ]
  const result: Note[] = [
    {
      note: 'C',
      index: 0,
      barIndex: 0,
      chordIndex: 0,
      distance: '1P',
      isError: false,
    },
    {
      note: 'E',
      index: 1,
      barIndex: 0,
      chordIndex: 0,
      distance: '3M',
      isError: false,
    },
    {
      note: 'G',
      index: 2,
      barIndex: 0,
      chordIndex: 0,
      distance: '5P',
      isError: false,
    },
    {
      note: 'G',
      index: 0,
      barIndex: 1,
      chordIndex: 0,
      distance: '1P',
      isError: false,
    },
    {
      note: 'E',
      index: 1,
      barIndex: 1,
      chordIndex: 0,
      distance: '3M',
      isError: false,
    },
    {
      note: 'G',
      index: 2,
      barIndex: 1,
      chordIndex: 0,
      distance: '5P',
      isError: false,
    },
    {
      note: 'A',
      index: 0,
      barIndex: 2,
      chordIndex: 0,
      distance: '1P',
      isError: false,
    },
    {
      note: 'C#',
      index: 1,
      barIndex: 2,
      chordIndex: 0,
      distance: '3M',
      isError: false,
    },
    {
      note: 'E',
      index: 2,
      barIndex: 2,
      chordIndex: 0,
      distance: '5P',
      isError: false,
    },
    {
      note: 'B',
      index: 0,
      barIndex: 2,
      chordIndex: 1,
      distance: '1P',
      isError: false,
    },
    {
      note: 'D#',
      index: 1,
      barIndex: 2,
      chordIndex: 1,
      distance: '3M',
      isError: false,
    },
    {
      note: 'F#',
      index: 2,
      barIndex: 2,
      chordIndex: 1,
      distance: '5P',
      isError: false,
    },
    {
      note: 'F',
      index: 0,
      barIndex: 3,
      chordIndex: 0,
      distance: '1P',
      isError: false,
    },
    {
      note: 'A',
      index: 1,
      barIndex: 3,
      chordIndex: 0,
      distance: '3M',
      isError: false,
    },
    {
      note: 'C',
      index: 2,
      barIndex: 3,
      chordIndex: 0,
      distance: '5P',
      isError: false,
    },
    {
      note: 'E',
      index: 0,
      barIndex: 3,
      chordIndex: 1,
      distance: '1P',
      isError: false,
    },
    {
      note: 'G#',
      index: 1,
      barIndex: 3,
      chordIndex: 1,
      distance: '3M',
      isError: false,
    },
    {
      note: 'B',
      index: 2,
      barIndex: 3,
      chordIndex: 1,
      distance: '5P',
      isError: false,
    },
    {
      note: 'D',
      index: 0,
      barIndex: 3,
      chordIndex: 2,
      distance: '1P',
      isError: false,
    },
    {
      note: 'F#',
      index: 1,
      barIndex: 3,
      chordIndex: 2,
      distance: '3M',
      isError: false,
    },
    {
      note: 'A',
      index: 2,
      barIndex: 3,
      chordIndex: 2,
      distance: '5P',
      isError: false,
    },
  ]

  expect(makeNotes(testData)).toEqual(result)
})

test(makeData.name, () => {
  const testBars: Bar[] = [{ chords: ['C'], index: 0, isError: false }]
  const testChords: Chord[] = [{ barIndex: 0, index: 0, symbol: 'C', isError: false }]
  const testNotes: Note[] = [
    {
      note: 'C',
      index: 0,
      barIndex: 0,
      chordIndex: 0,
      distance: '1P',
      isError: false,
    },
    {
      note: 'E',
      index: 1,
      barIndex: 0,
      chordIndex: 0,
      distance: '3M',
      isError: false,
    },
    {
      note: 'G',
      index: 2,
      barIndex: 0,
      chordIndex: 0,
      distance: '5P',
      isError: false,
    },
  ]

  const result: Data[] = [
    {
      index: 0,
      barIndex: 0,
      chordIndex: 0,
      noteIndex: 0,
      note: 'C3',
      time: 0,
      duration: 2,
    },
    {
      index: 1,
      barIndex: 0,
      chordIndex: 0,
      noteIndex: 1,
      note: 'E3',
      time: 0,
      duration: 2,
    },
    {
      index: 2,
      barIndex: 0,
      chordIndex: 0,
      noteIndex: 2,
      note: 'G3',
      time: 0,
      duration: 2,
    },
  ]

  expect(makeData(testBars, testChords, testNotes, { symbol: 'C', number: 3 }, '4/4')).toEqual(
    result
  )
})
