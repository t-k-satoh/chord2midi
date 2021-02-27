import React from 'react'
import * as Styles from './styles'
import { Props } from './types'

const Loading: (props: Props, ref: React.ForwardedRef<HTMLDivElement>) => JSX.Element = (
  { isLoading, isDarkMode },
  ref
) => {
  const fallbackRef = React.useRef<HTMLDivElement | null>(null)
  const domRef = ref || fallbackRef

  return (
    <Styles.Main S_isLoading={isLoading} ref={domRef}>
      <Styles.LoaderWrap>
        <Styles.Loader S_isDarkMode={isDarkMode} />
      </Styles.LoaderWrap>
    </Styles.Main>
  )
}

const _Loading = React.memo(React.forwardRef(Loading))
export { _Loading as Loading }
