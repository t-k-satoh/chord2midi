import { pickValues } from '.'

test(pickValues.name, () => {
  const test: Parameters<typeof pickValues>[0] = {
    test: { value: 'test', from: 'init' },
  }
  const result: ReturnType<typeof pickValues> = {
    test: 'test',
  }

  expect(pickValues(test)).toEqual(result)
})
