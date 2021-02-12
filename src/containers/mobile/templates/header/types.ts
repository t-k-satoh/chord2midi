import { State } from '../../../../store/state/types'
import { ExcludeAllInit } from '../../../../types'

export type PickState = Pick<
  State,
  | 'value'
  | 'chordSymbol'
  | 'beat'
  | 'midiNoteNumber'
  | 'bpm'
  | 'version'
  | 'isDarkMode'
  | 'isHome'
  | 'isDisabledDownLoad'
  | 'isDisabledShare'
  | 'isShowNav'
>

export type DispatchToProps = {
  onChangeIsShowNav: (isShowNav: boolean) => void
}

export type StateToProps = ExcludeAllInit<PickState>
