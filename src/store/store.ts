import { MakeStore, createWrapper, HYDRATE } from 'next-redux-wrapper'
import { createStore, AnyAction, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { INIT } from '../constants'
import { initialState } from './state'

export type State = typeof initialState

const reducer = (state: State = initialState, action: AnyAction): State => {
  switch (action.type) {
    case HYDRATE:
      if (action.payload.chordSymbol === INIT) delete action.payload.chordSymbol
      if (action.payload.beat === INIT) delete action.payload.beat
      if (action.payload.midiNoteNumber === INIT) delete action.payload.midiNoteNumber
      if (action.payload.locale === INIT) delete action.payload.locale

      return { ...state, ...action.payload }
    case 'CHORD_SYMBOL':
      return { ...state, chordSymbol: action.payload }
    case 'BEAT':
      return { ...state, beat: action.payload }
    case 'MIDINoteNumber':
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
