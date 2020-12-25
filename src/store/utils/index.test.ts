import { INIT } from '../../constants'
import { initialState } from '../state/index'
import { generateHydrateState } from '.'

describe(generateHydrateState.name, () => {
  test('All Init value', () => {
    const testValue: typeof initialState = {
      chordSymbol: INIT,
      chordSymbolFrom: INIT,
      beat: INIT,
      beatFrom: INIT,
      midiNoteNumber: INIT,
      midiNoteNumberFrom: INIT,
      value: INIT,
      valueFrom: INIT,
      locale: INIT,
    }

    expect(generateHydrateState(testValue)).toEqual({})
  })

  test('一部に値がある場合', () => {
    const testValue: typeof initialState = {
      chordSymbol: 'C',
      chordSymbolFrom: INIT,
      beat: INIT,
      beatFrom: INIT,
      midiNoteNumber: 3,
      midiNoteNumberFrom: INIT,
      value: INIT,
      valueFrom: INIT,
      locale: INIT,
    }

    expect(generateHydrateState(testValue)).toEqual({
      chordSymbol: 'C',
      midiNoteNumber: 3,
    })
  })
})
