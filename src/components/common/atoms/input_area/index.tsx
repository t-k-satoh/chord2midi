import { TextArea } from '@adobe/react-spectrum'
import React from 'react'
import { PLACE_HOLDER } from './constants'
import * as Styles from './styles'
import { Props } from './types'

const InputArea: (props: Props, ref: React.ForwardedRef<HTMLDivElement>) => JSX.Element = (
  { onChangeValue, value, isError, canInput },
  ref
) => {
  const fallbackRef = React.useRef<HTMLDivElement | null>(null)
  const domRef = ref || fallbackRef

  const onChange = React.useCallback(
    (_value: string) => {
      onChangeValue(_value)
    },
    [onChangeValue]
  )

  return (
    <Styles.Main ref={domRef}>
      <Styles.TextArea>
        <TextArea
          width={'100%'}
          height={'100%'}
          onChange={onChange}
          value={value}
          isDisabled={!canInput}
          validationState={isError ? 'invalid' : 'valid'}
          placeholder={PLACE_HOLDER}
        />
      </Styles.TextArea>
    </Styles.Main>
  )
}

const _InputArea = React.memo(React.forwardRef(InputArea))
export { _InputArea as InputArea }
