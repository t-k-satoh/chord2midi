import { Chord as tonalChord, Note as tonalNote } from '@tonaljs/tonal'
import { v4 as uuidv4 } from 'uuid'
import { Beats } from '../../constants'
import { Bar, Chord, Note, Data } from '../../types'

export const makeBars = (chordText: string): Bar[] =>
  chordText
    .replace(/\r?\n/g, '|')
    .split('|')
    .map((note) => note.trim())
    .filter((note) => note !== '' && note !== ' ')
    .map((note, index) => ({
      uuid: uuidv4(),
      index,
      chords: note.split(' '),
    }))

export const makeChords = (bars: Bar[]): Chord[] => {
  const tempChords: Chord[] = []

  bars.forEach(({ uuid, chords }) => {
    chords.forEach((chord, index) => {
      const base = {
        uuid: uuidv4(),
        barUuid: uuid,
        index,
      }
      const isOnChord = chord.indexOf('/') !== -1

      if (isOnChord) {
        const split = chord.split('/')

        tempChords.push({
          ...base,
          configurationSymbol: tonalChord.get(split[0]).symbol,
          baseSymbol: tonalChord.get(split[1]).symbol,
        })
      } else {
        tempChords.push({
          ...base,
          symbol: tonalChord.get(chord).symbol,
        })
      }
    })
  })

  return tempChords
}

export const makeNotes = (chords: Chord[]): Note[] => {
  const tempNote: Note[] = []

  chords.forEach((chord) => {
    if ('symbol' in chord) {
      const { symbol, barUuid, uuid } = chord
      const { notes, intervals } = tonalChord.get(symbol)

      notes.forEach((note, index) => {
        tempNote.push({
          uuid: uuidv4(),
          note,
          index,
          barUuid,
          chordUuid: uuid,
          distance: intervals[index],
        })
      })
    } else {
      const { configurationSymbol, baseSymbol, barUuid, uuid } = chord

      const { notes: configurationNotes, intervals: configurationIntervals } = tonalChord.get(
        configurationSymbol
      )
      const { notes: baseNotes, intervals: baseIntervals } = tonalChord.get(baseSymbol)

      const temp: { note: string; distance: string }[] = [
        { note: baseNotes[0], distance: baseIntervals[0] },
        ...configurationNotes
          .filter((_note, index) => index !== 0)
          .map((note, index) => ({ note, distance: configurationIntervals[index + 1] })),
      ]

      temp.forEach(({ note, distance }, index) => {
        tempNote.push({
          uuid: uuidv4(),
          note,
          index,
          barUuid,
          chordUuid: uuid,
          distance,
        })
      })
    }
  })

  return tempNote
}

export const makeData = (
  bars: Bar[],
  chords: Chord[],
  notes: Note[],
  baseNoteNumber: number,
  beat: typeof Beats[number]
): Data[] => {
  const newBeat = {
    molecular: Number(beat.split('/')[0]),
    denominator: Number(beat.split('/')[1]),
  }
  const barLimit = newBeat.molecular / 2

  return notes.map(({ barUuid, chordUuid, uuid, distance }) => {
    const parentBar = bars.find((bar) => bar.uuid === barUuid)
    const parentChord = chords.find((chord) => chord.uuid === chordUuid)
    const chordsLength = parentBar.chords.length

    const isInscrutable = chordsLength === newBeat.molecular - 1

    const barStartTime = parentBar.index * barLimit
    const baseDuration = barLimit / (isInscrutable ? chordsLength + 1 : chordsLength)

    const isLastInscrutableChord = isInscrutable && chordsLength === parentChord.index + 1

    const baseNote = notes.find((_note) => _note.chordUuid === chordUuid && _note.index === 0)

    const newNote = tonalNote.transpose(`${baseNote.note}${baseNoteNumber}`, distance)

    return {
      uuid: uuidv4(),
      barUuid,
      chordUuid,
      noteUuid: uuid,
      note: newNote,
      time: barStartTime + baseDuration * parentChord.index,
      duration: isLastInscrutableChord ? baseDuration * 2 : baseDuration,
    }
  })
}

export const makeAllData = (
  chordText: string,
  baseNoteNumber: number,
  beat: typeof Beats[number]
): { bars: Bar[]; chords: Chord[]; notes: Note[]; data: Data[] } => {
  const bars = makeBars(chordText)
  const chords = makeChords(bars)
  const notes = makeNotes(chords)
  const data = makeData(bars, chords, notes, baseNoteNumber, beat)

  return {
    bars,
    chords,
    notes,
    data,
  }
}
