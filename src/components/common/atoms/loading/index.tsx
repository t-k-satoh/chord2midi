import React from 'react'
import * as Styles from './styles'

export type Props = {
  isLoading: boolean
  isDarkMode: boolean
}

export const Loading: React.ForwardRefExoticComponent<Props> = React.memo(function Component({
  isLoading,
  isDarkMode,
}) {
  return (
    <Styles.Main S_isLoading={isLoading}>
      <Styles.LoaderWrap>
        <Styles.Loader S_isDarkMode={isDarkMode} />
      </Styles.LoaderWrap>
    </Styles.Main>
  )
})
