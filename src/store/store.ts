import { MakeStore, createWrapper, HYDRATE } from 'next-redux-wrapper'
import { createStore, AnyAction } from 'redux'
import { initialState } from './state'
import { State } from './state/types'

const reducer = (state: State = initialState, action: AnyAction): State => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload }
    case 'CHORD_SYMBOL':
      return { ...state, chordSymbol: action.payload }
    case 'BEAT':
      return { ...state, beat: action.payload }
    case 'MIDINoteNumber':
      return { ...state, midiNoteNumber: action.payload }
    default:
      return state
  }
}

const makeStore: MakeStore<State> = () => createStore(reducer)

export const wrapper = createWrapper<State>(makeStore, { debug: true })
