import { TextArea } from '@adobe/react-spectrum'
import React from 'react'
import { Data, Chord } from '../types'
import { useChordParser } from './hooks'
import * as Styles from './styles'

type Props = {
  onChangeData: (data: Data[]) => void
  onChangeChords: (allNote: Chord[]) => void
  onError: (error: { isError: boolean; details: string }) => void
  baseNoteNumber: number
}

export const InputArea: React.FC<Props> = ({
  onChangeData,
  onChangeChords,
  onError,
  baseNoteNumber,
}) => {
  const [currentText, setCurrentText] = React.useState<string>('')

  const [data, isError, errorDetails, allChords] = useChordParser(currentText, baseNoteNumber)

  const onChange = React.useCallback(
    (value: string) => {
      setCurrentText(value)
    },
    [setCurrentText]
  )

  React.useEffect(() => {
    onChangeData(data)
  }, [data, onChangeData])

  React.useEffect(() => {
    onChangeChords(allChords)
  }, [allChords, onChangeChords])

  React.useEffect(() => {
    onError({ isError, details: errorDetails })
  }, [onError, errorDetails, isError])

  return (
    <Styles.Main>
      <Styles.TextArea>
        <TextArea
          width={'100%'}
          height={'100%'}
          onChange={onChange}
          validationState={isError ? 'invalid' : 'valid'}
          placeholder={'ex. C#/D6 | C C/F A | E/F A B | A B C/D | A B | A B C | A | A B C D'}
        />
      </Styles.TextArea>
    </Styles.Main>
  )
}
