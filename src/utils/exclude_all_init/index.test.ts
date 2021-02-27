import { INIT } from '../../constants'
import { excludeAllInit } from '.'

test(excludeAllInit.name, () => {
  const test: Parameters<typeof excludeAllInit>[0] = {
    test: { value: INIT, from: 'init' },
  }
  const result: ReturnType<typeof excludeAllInit> = {}

  expect(excludeAllInit(test)).toEqual(result)
})
