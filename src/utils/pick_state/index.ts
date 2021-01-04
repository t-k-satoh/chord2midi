import { State } from '../../store/state/types'

export const pickState = <T extends Partial<State>, K extends ReadonlyArray<keyof T>>(
  state: T,
  keys: K
): Pick<T, K[number]> => {
  const tempState: Partial<T> = {}

  keys.forEach((key) => {
    tempState[key] = state[key]
  })

  return tempState as Pick<T, K[number]>
}
