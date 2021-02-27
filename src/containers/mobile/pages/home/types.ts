import { State } from '../../../../store/state/types'
import { ExcludeAllInit, PickValue } from '../../../../types'

export type PickState = Pick<
  State,
  'value' | 'chordSymbol' | 'beat' | 'midiNoteNumber' | 'locale' | 'bpm' | 'isDarkMode'
>

export type DispatchToProps = {
  onChangeValue: (value: PickValue<State['value']>) => void
}

export type StateToProps = ExcludeAllInit<PickState>
