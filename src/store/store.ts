import { MakeStore, createWrapper } from 'next-redux-wrapper'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { ActionTypes } from './actions'
import { reducers } from './reducer'
import { initialState } from './state'
import { State } from './state/types'

export const makeStore: MakeStore<State, ActionTypes> = () => {
  return createStore(reducers, initialState, applyMiddleware(logger))
}

export const wrapper = createWrapper<State, ActionTypes>(makeStore)
