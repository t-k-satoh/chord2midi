import { Props } from './types'
import { generateValues } from './utils'

describe(generateValues.name, () => {
  const tests: { value: Props['value']; result: ReturnType<typeof generateValues> }[] = [
    { value: '120', result: [{ isZero: false, value: '120' }] },
    { value: 120, result: [{ isZero: false, value: '120' }] },
    { value: 'long_long_long', result: [{ isZero: false, value: '---' }] },
    { value: 0.123, result: [{ isZero: false, value: '0' }] },
    { value: 1.0e20, result: [{ isZero: false, value: '---' }] },
  ]

  test.each(tests)('%i', ({ value, result }) => {
    expect(generateValues(value)).toEqual(result)
  })
})
