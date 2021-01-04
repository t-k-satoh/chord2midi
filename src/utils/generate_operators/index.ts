import { Dispatch } from 'react'
import { ActionTypes } from '../../store/actions'

type Functions = {
  [key: string]: (dispatch: Dispatch<ActionTypes>) => void
}

export const generateOperators = <F extends Functions, D extends Dispatch<ActionTypes>>(
  functions: F,
  dispatch: D
) => {
  const tempOperators = {}

  Object.entries(functions).forEach((func) => {
    const key = func[0]
    const newDispatch = func[1]

    tempOperators[key] = newDispatch(dispatch)
  })

  return tempOperators
}
