import { INIT } from '../../constants'
import { InitialState } from '../state/types'

export const generateHydrateState = (payload: InitialState): Partial<InitialState> => {
  const tempObject: Partial<InitialState> = {}

  Object.entries(payload).forEach((entry) => {
    const key = entry[0]
    const value = entry[1]

    if (typeof value === 'object') {
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
