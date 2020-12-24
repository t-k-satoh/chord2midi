import React from 'react'
import * as Styles from './styles'

export type Props = {
  text: string
}

export const Title: React.FC<Props> = ({ text }) => {
  return <Styles.Title>{text}</Styles.Title>
}
