import { INIT } from '../../constants'
import { ExcludeAllInit, MergeValueAndFrom, MergeInit } from '../../types'

export const excludeAllInit = <
  T extends Record<string, MergeValueAndFrom<unknown> | MergeInit<unknown>>
>(
  object: T
): ExcludeAllInit<T> => {
  const temp = {}

  Object.entries(object).forEach((entry) => {
    const key = entry[0]
    const value = entry[1]

    if (typeof value === 'object' && ('value' in value || 'from' in value)) {
      const newValue = value as MergeValueAndFrom<unknown>

      if (newValue.value !== INIT) {
        temp[key] = newValue.value
      }

      return
    }

    if (value !== INIT) {
      temp[key] = value
    }
  })

  return temp as ExcludeAllInit<T>
}
