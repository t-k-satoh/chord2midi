import { HYDRATE } from 'next-redux-wrapper'

export const ACTION_TYPES = {
  HYDRATE,
  VALUE: 'VALUE',
  CHORD_SYMBOL: 'CHORD_SYMBOL',
  BEAT: 'BEAT',
  MIDI_NOTE_NUMBER: 'MIDI_NOTE_NUMBER',
  LOCALE: 'LOCALE',
} as const
