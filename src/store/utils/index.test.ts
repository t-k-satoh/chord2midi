import { INIT } from '../../constants'
import { initialState } from '../state/index'
import { generateHydrateState } from '.'

describe(generateHydrateState.name, () => {
  test('All Init value', () => {
    const testValue: typeof initialState = initialState

    expect(generateHydrateState(testValue)).toEqual({})
  })

  test('一部に値がある場合', () => {
    const testValue: typeof initialState = {
      ...initialState,
      chordSymbol: {
        value: 'C',
        from: 'app',
      },
      beat: {
        value: INIT,
        from: INIT,
      },
      midiNoteNumber: {
        value: 3,
        from: 'url',
      },
      value: {
        value: INIT,
        from: INIT,
      },
      locale: INIT,
    }

    expect(generateHydrateState(testValue)).toEqual({
      chordSymbol: {
        value: 'C',
        from: 'app',
      },
      midiNoteNumber: {
        value: 3,
        from: 'url',
      },
    })
  })
})
