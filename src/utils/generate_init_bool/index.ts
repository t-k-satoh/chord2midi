import { INIT } from '../../constants'
import { MergeInit, MergeValueAndFrom } from '../../types'

export const generateInitBool = (
  boolValue: MergeInit<boolean> | MergeValueAndFrom<boolean>,
  initValue: boolean
): boolean => {
  if (typeof boolValue === 'boolean') {
    return boolValue
  }

  if (boolValue === INIT) {
    return initValue
  }

  if (typeof boolValue.value === 'boolean') {
    return boolValue.value
  }

  if (boolValue.value === INIT) {
    return initValue
  }
}
