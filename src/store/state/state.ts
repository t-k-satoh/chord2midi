import { INIT } from '../../constants'
import { ChordSymbol, Beat, MIDINoteNumber, Locale } from '../../types'

export const initialState: {
  chordSymbol: ChordSymbol
  beat: Beat
  midiNoteNumber: MIDINoteNumber
  locale: Locale
} = {
  chordSymbol: INIT,
  beat: INIT,
  midiNoteNumber: INIT,
  locale: INIT,
}
