import * as utils from '../../../../utils'
import * as CONSTANTS from './constants'
import { Values, Props } from './types'

export const generateValues = (value: Props['value']): Values[] => {
  if (typeof value === 'string' && value.length <= 3) {
    return [
      {
        value,
        isZero: false,
      },
    ]
  }

  if (typeof value === 'string') {
    return [
      {
        value: CONSTANTS.ERROR_TEXT,
        isZero: false,
      },
    ]
  }

  const newValue = Math.floor(value)

  if (String(newValue).length > CONSTANTS.LIMIT) {
    return [
      {
        value: CONSTANTS.ERROR_TEXT,
        isZero: false,
      },
    ]
  }

  const zeros: Values[] = utils
    .addZero(value, CONSTANTS.LIMIT)
    .split('')
    .map((zero) => {
      return {
        value: zero,
        isZero: true,
      }
    })

  return [...zeros, { value: String(newValue), isZero: false }]
}
