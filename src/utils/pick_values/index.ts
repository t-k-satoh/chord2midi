import { MergeValueAndFrom } from '../../types'

export const pickValues = <
  T extends Record<string, MergeValueAndFrom<unknown>>,
  U = { [K in keyof T]: T[K]['value'] }
>(
  payload: T
): U => {
  const tempObject = {}

  Object.entries(payload).forEach((entry) => {
    const key = entry[0]
    const value = entry[1].value

    tempObject[key] = value
  })

  return tempObject as U
}
