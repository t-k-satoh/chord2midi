import { TextArea } from '@adobe/react-spectrum'
import React from 'react'
import * as Styles from './styles'

export type Props = {
  isError: boolean
  canInput: boolean
  onChangeValue: (value: string) => void
  value: string
}

export const InputArea: React.VFC<Props> = React.memo(function Component({
  onChangeValue,
  value,
  isError,
  canInput,
}) {
  const onChange = React.useCallback(
    (_value: string) => {
      onChangeValue(_value)
    },
    [onChangeValue]
  )

  return (
    <Styles.Main>
      <Styles.TextArea>
        <TextArea
          width={'100%'}
          height={'100%'}
          onChange={onChange}
          value={value}
          isDisabled={!canInput}
          validationState={isError ? 'invalid' : 'valid'}
          placeholder={'ex. C#/D6 | C C/F A | E/F A B | A B C/D | A B | A B C | A | A B C D'}
        />
      </Styles.TextArea>
    </Styles.Main>
  )
})
