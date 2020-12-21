import React from 'react'
import * as Styles from './styles'

type Props = {
  text: string
}

export const SubTitle: React.FC<Props> = ({ text }) => {
  return <Styles.SubTitle>{text}</Styles.SubTitle>
}
