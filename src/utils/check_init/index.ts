import { INIT } from '../../constants'
import { State } from '../../store/state/types'

export const checkInit = (state: Partial<State>): { hasInit: boolean } => {
  return {
    hasInit: Object.values(state).some((value) =>
      typeof value === 'object' && 'from' in value && 'value' in value
        ? value.from === INIT || value.value === INIT
        : value === INIT
    ),
  }
}
