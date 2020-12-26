import { createAction, ActionType } from 'typesafe-actions'
import { InitialState } from '../state/types'
import { ACTION_TYPES } from './types'

export const actions = {
  hydrate: createAction(ACTION_TYPES.HYDRATE)<InitialState>(),
  chordSymbol: createAction(ACTION_TYPES.CHORD_SYMBOL)<Pick<InitialState, 'chordSymbol'>>(),
  beat: createAction(ACTION_TYPES.BEAT)<Pick<InitialState, 'beat'>>(),
  locale: createAction(ACTION_TYPES.LOCALE)<Pick<InitialState, 'locale'>>(),
  midiNoteNumber: createAction(ACTION_TYPES.MIDI_NOTE_NUMBER)<
    Pick<InitialState, 'midiNoteNumber'>
  >(),
  value: createAction(ACTION_TYPES.VALUE)<Pick<InitialState, 'value'>>(),
} as const

export type ActionTypes = ActionType<typeof actions>
