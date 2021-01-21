import { checkInit } from '.'

test(checkInit.name, () => {
  const test: Parameters<typeof checkInit>[0] = {
    test: { value: 'test', from: 'init' },
  }
  const result = checkInit(test)

  expect(result.hasInit).toBe(true)
  expect(result.initKeys).toEqual(['test'])
})
