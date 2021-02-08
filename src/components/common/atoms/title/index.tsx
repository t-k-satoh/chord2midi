import React from 'react'
import * as Styles from './styles'

export type Props = {
  text: string
}

export const Title: React.ForwardRefExoticComponent<Props> = React.memo(function Component({
  text,
}) {
  return <Styles.Title>{text}</Styles.Title>
})
