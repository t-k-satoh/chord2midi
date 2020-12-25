import { MakeStore, createWrapper, HYDRATE } from 'next-redux-wrapper'
import { createStore, AnyAction, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { initialState } from './state'
import { generateHydrateState } from './utils'

export type State = typeof initialState

const reducer = (state: State = initialState, action: AnyAction): State => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...generateHydrateState(action.payload) }
    case 'VALUE':
      return { ...state, value: action.payload }
    case 'CHORD_SYMBOL':
      return { ...state, chordSymbol: action.payload }
    case 'BEAT':
      return { ...state, beat: action.payload }
    case 'MIDI_NOTE_NUMBER':
      return { ...state, midiNoteNumber: action.payload }
    case 'LOCALE':
      return { ...state, locale: action.payload }
    default:
      return state
  }
}

export const makeStore: MakeStore<State> = () => {
  return createStore(reducer, applyMiddleware(logger))
}

export const wrapper = createWrapper<State>(makeStore)
