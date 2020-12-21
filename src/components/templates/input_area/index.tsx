import { TextArea } from '@adobe/react-spectrum'
import React from 'react'
import * as Styles from './styles'

export type Props = {
  onChangeValue: (value: string) => void
  value: string
}

export const InputArea: React.FC<Props> = ({ onChangeValue, value }) => {
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
          placeholder={'ex. C#/D6 | C C/F A | E/F A B | A B C/D | A B | A B C | A | A B C D'}
        />
      </Styles.TextArea>
    </Styles.Main>
  )
}
