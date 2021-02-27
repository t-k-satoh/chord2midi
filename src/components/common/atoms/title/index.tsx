import React from 'react'
import * as Styles from './styles'
import { Props } from './types'

const Title: (props: Props, ref: React.ForwardedRef<HTMLHeadingElement>) => JSX.Element = (
  { text },
  ref
) => {
  const fallbackRef = React.useRef<HTMLHeadingElement | null>(null)
  const domRef = ref || fallbackRef

  return <Styles.Title ref={domRef}>{text}</Styles.Title>
}

const _Title = React.memo(React.forwardRef(Title))
export { _Title as Title }
