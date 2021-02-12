import { INIT } from '../../constants'
import { MergeValueAndFrom, MergeInit } from '../../types'

export const checkInitFromValue = (
  value: MergeValueAndFrom<unknown> | MergeInit<unknown>
): boolean => {
  if (value === INIT) {
    return true
  }
  const newValue = value as MergeValueAndFrom<unknown>

  if (typeof newValue === 'object' && (newValue.value === INIT || newValue.from === INIT)) {
    return true
  }

  return false
}

export const checkInit = <
  T extends Record<string, MergeValueAndFrom<unknown> | MergeInit<unknown>>
>(
  values: T
): { hasInit: boolean; initKeys: (keyof T)[] } => ({
  hasInit: Object.values(values).some((value) => checkInitFromValue(value)),
  initKeys: Object.keys(values).filter((key) => checkInitFromValue(values[key])) as Array<keyof T>,
})
