import React from 'react'
import * as Styles from './styles'

export type Props = {
  isLoading: boolean
  children: React.ReactNode
}

export const Loading: React.FC<Props> = React.memo(function Component({ isLoading, children }) {
  const canRender = React.useMemo(() => !isLoading, [isLoading])

  return (
    <>
      {canRender ? (
        children
      ) : (
        <Styles.Main>
          <Styles.LoaderWrap>
            <Styles.Loader />
          </Styles.LoaderWrap>
        </Styles.Main>
      )}
    </>
  )
})
