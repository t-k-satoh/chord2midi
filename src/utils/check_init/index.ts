import { INIT } from '../../constants'
import { State } from '../../store/state/types'

export const checkInitFromValue = (value: State[keyof State]): boolean =>
  typeof value === 'object' && 'from' in value && 'value' in value
    ? value.from === INIT || value.value === INIT
    : value === INIT

export const checkInit = <T extends Partial<State>>(
  state: T
): { hasInit: boolean; initKeys: Array<keyof T> } => ({
  hasInit: Object.values(state).some((value) => checkInitFromValue(value)),
  initKeys: Object.keys(state).filter((key) => checkInitFromValue(state[key])) as Array<keyof T>,
})
