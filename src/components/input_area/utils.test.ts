import * as Utils from './utils'

describe(Utils.chordValidate.name, () => {
  test('Correct', () => {
    expect(9).toBe(9)
  })
})

describe(Utils.makeDuration.name, () => {
  test('Correct', () => {
    expect(Utils.makeDuration(['C', 'C', 'C'], 1)).toBe(0.5)
  })
})

describe(Utils.makeTime.name, () => {
  test('Correct', () => {
    expect(9).toBe(9)
  })
})
