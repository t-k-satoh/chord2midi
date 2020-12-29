import { INIT } from '../../constants'
import { State } from '../state/types'

export const generateHydrateState = (payload: State): Partial<State> => {
  const tempObject: Partial<State> = {}

  Object.entries(payload).forEach((entry) => {
    const key = entry[0]
    const value = entry[1]

    if (typeof value === 'object' && 'from' in value && 'value' in value) {
      if (value.from !== INIT && value.value !== INIT) {
        tempObject[key] = value
      }
      return
    }

    if (value !== INIT) {
      tempObject[key] = value
    }
  })

  return tempObject
}
