import React from 'react'
import { POSITION_LIMIT } from './constants'
import * as Styles from './styles'

export type Props = {
  position: number
}

export const Note: React.ForwardRefExoticComponent<Props> = React.memo(function Component({
  position,
}) {
  const newPosition = React.useMemo(() => {
    if (position > POSITION_LIMIT) {
      return POSITION_LIMIT
    }
    if (position < 0) {
      return 0
    }
    return position
  }, [position])

  return <Styles.Main S_position={newPosition} />
})
