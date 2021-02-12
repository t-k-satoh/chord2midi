import { createAction, ActionType } from 'typesafe-actions'
import { State } from '../state/types'
import { ACTION_TYPES } from './types'

export const actions = {
  hydrate: createAction(ACTION_TYPES.HYDRATE)<State>(),
  chordSymbol: createAction(ACTION_TYPES.CHORD_SYMBOL)<Pick<State, 'chordSymbol'>>(),
  beat: createAction(ACTION_TYPES.BEAT)<Pick<State, 'beat'>>(),
  locale: createAction(ACTION_TYPES.LOCALE)<Pick<State, 'locale'>>(),
  midiNoteNumber: createAction(ACTION_TYPES.MIDI_NOTE_NUMBER)<Pick<State, 'midiNoteNumber'>>(),
  value: createAction(ACTION_TYPES.VALUE)<Pick<State, 'value'>>(),
  bpm: createAction(ACTION_TYPES.BPM)<Pick<State, 'bpm'>>(),
  query: createAction(ACTION_TYPES.QUERY)<Pick<State, 'query'>>(),
  isDarkMode: createAction(ACTION_TYPES.IS_DARK_MODE)<Pick<State, 'isDarkMode'>>(),
  isBrowser: createAction(ACTION_TYPES.IS_BROWSER)<Pick<State, 'isBrowser'>>(),
  isHome: createAction(ACTION_TYPES.IS_HOME)<Pick<State, 'isHome'>>(),
  isDisabledDownLoad: createAction(ACTION_TYPES.IS_DISABLED_DOWNLOAD)<
    Pick<State, 'isDisabledDownLoad'>
  >(),
  isDisabledShare: createAction(ACTION_TYPES.IS_DISABLED_SHARE)<Pick<State, 'isDisabledShare'>>(),
  version: createAction(ACTION_TYPES.VERSION)<Pick<State, 'version'>>(),
  isShowNav: createAction(ACTION_TYPES.IS_SHOW_NAV)<Pick<State, 'isShowNav'>>(),
} as const

export type ActionTypes = ActionType<typeof actions>
