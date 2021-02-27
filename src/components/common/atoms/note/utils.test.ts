import { POSITION_LIMIT } from './constants'
import { Props } from './types'
import { generatePosition } from './utils'

describe(generatePosition.name, () => {
  const tests: { position: Props['position']; result: ReturnType<typeof generatePosition> }[] = [
    { position: 90, result: POSITION_LIMIT },
    { position: 47, result: 47 },
    { position: -1, result: 0 },
    { position: 0.123, result: 0 },
  ]

  test.each(tests)('%i', ({ position, result }) => {
    expect(generatePosition(position)).toEqual(result)
  })
})
