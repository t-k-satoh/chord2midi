import { INIT } from '../../constants'
import { MergeInit } from '../../store/state/types'

export const generateInitBool = (bool: MergeInit<boolean>, initValue: boolean): boolean =>
  bool === INIT ? initValue : bool
