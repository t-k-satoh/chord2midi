import { INIT } from '../../constants'
import { initialState } from '../state/index'

export const generateHydrateState = (
  payload: typeof initialState
): Partial<typeof initialState> => {
  const tempObject: Partial<typeof initialState> = {}

  for (const property in payload) {
    const value = payload[property]

    if (value !== INIT) {
      tempObject[property] = value
    }
  }

  return tempObject
}
