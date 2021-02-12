import { State } from '../../../../store/state/types'
import { ExcludeAllInit } from '../../../../types'

export type PickState = Pick<State, 'locale' | 'isDarkMode' | 'query' | 'version' | 'isHome'>

export type StateToProps = ExcludeAllInit<PickState>
