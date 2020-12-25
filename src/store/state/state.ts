import { INIT } from '../../constants'
import { ChordSymbol, Beat, MIDINoteNumber, Locale, From, Value } from '../../types'

export const initialState: {
  chordSymbol: ChordSymbol
  chordSymbolFrom: From
  beat: Beat
  beatFrom: From
  midiNoteNumber: MIDINoteNumber
  midiNoteNumberFrom: From
  value: Value
  valueFrom: From
  locale: Locale
} = {
  chordSymbol: INIT,
  chordSymbolFrom: INIT,
  beat: INIT,
  beatFrom: INIT,
  midiNoteNumber: INIT,
  midiNoteNumberFrom: INIT,
  value: INIT,
  valueFrom: INIT,
  locale: INIT,
}
