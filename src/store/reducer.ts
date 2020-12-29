import { Reducer } from 'redux'
import { ActionTypes } from './actions'
import { ACTION_TYPES } from './actions/types'
import { initialState } from './state'
import { State } from './state/types'
import { generateHydrateState } from './utils'

export const reducers: Reducer<State, ActionTypes> = (state = initialState, action: ActionTypes) =>
  action.type === ACTION_TYPES.HYDRATE
    ? {
        ...state,
        ...generateHydrateState(action.payload),
      }
    : {
        ...state,
        ...action.payload,
      }
