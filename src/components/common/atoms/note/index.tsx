import React from 'react'
import * as Styles from './styles'
import { Props } from './types'
import { generatePosition } from './utils'

export const Note: React.ForwardRefExoticComponent<Props> = React.memo(function Component({
  position,
}) {
  const newPosition = React.useMemo(() => generatePosition(position), [position])

  return <Styles.Main S_position={newPosition} />
})
