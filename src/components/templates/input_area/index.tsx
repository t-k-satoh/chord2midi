import { TextArea } from '@adobe/react-spectrum'
import React from 'react'
import { Beats } from '../../constants'
import { Data, Chord, Bar, Note } from '../../types'
import { useChordParser } from './hooks'
import * as Styles from './styles'

export type Props = {
  onChangeSomeData: (args: { bars: Bar[]; chords: Chord[]; notes: Note[]; data: Data[] }) => void
  baseNote: {
    symbol: string
    number: number
  }
  beat: typeof Beats[number]
}

export const InputArea: React.FC<Props> = ({ onChangeSomeData, baseNote, beat }) => {
  const [currentText, setCurrentText] = React.useState<string>('')
  const [bars, chords, notes, data] = useChordParser(currentText, baseNote.number, beat)

  const onChange = React.useCallback(
    (value: string) => {
      setCurrentText(value)
    },
    [setCurrentText]
  )

  React.useEffect(() => {
    console.log({ data })
    onChangeSomeData({ bars, chords, notes, data })
  }, [bars, chords, notes, data, onChangeSomeData])

  return (
    <Styles.Main>
      <Styles.TextArea>
        <TextArea
          width={'100%'}
          height={'100%'}
          onChange={onChange}
          placeholder={'ex. C#/D6 | C C/F A | E/F A B | A B C/D | A B | A B C | A | A B C D'}
        />
      </Styles.TextArea>
    </Styles.Main>
  )
}
