import React from 'react'
import * as Styles from './styles'
import { Props } from './types'
import { generateValues } from './utils'

const IndicatorValue: (props: Props, ref: React.ForwardedRef<HTMLDivElement>) => JSX.Element = (
  { value, title },
  ref
) => {
  const fallbackRef = React.useRef<HTMLDivElement | null>(null)
  const domRef = ref || fallbackRef
  const newValues = React.useMemo(() => generateValues(value), [value])

  return (
    <Styles.Main ref={domRef}>
      <Styles.Top>
        {newValues.map(({ value, isZero }, index) =>
          isZero ? (
            <Styles.Zero key={index}>{value}</Styles.Zero>
          ) : (
            <Styles.Value key={index}>{value}</Styles.Value>
          )
        )}
      </Styles.Top>
      <Styles.Bottom>
        <Styles.Title>
          <Styles.TitleInner>{title}</Styles.TitleInner>
        </Styles.Title>
      </Styles.Bottom>
    </Styles.Main>
  )
}

const _IndicatorValue = React.memo(React.forwardRef(IndicatorValue))
export { _IndicatorValue as IndicatorValue }
