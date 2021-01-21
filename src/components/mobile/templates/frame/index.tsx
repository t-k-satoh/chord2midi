import React from 'react'
import * as Styles from './styles'

export const Frame: React.FC = React.memo(function Component({ children }) {
  return <Styles.Main>{children}</Styles.Main>
})
