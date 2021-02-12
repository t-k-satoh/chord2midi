import { State } from '../../../../store/state/types'
import { ExcludeAllInit } from '../../../../types'

export type PickState = Pick<State, 'isShowNav' | 'isDarkMode'>

export type StateToProps = ExcludeAllInit<PickState>

export type DispatchToProps = {
  onCloseShowNav: () => void
}
