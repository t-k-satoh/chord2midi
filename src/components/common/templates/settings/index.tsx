import { TextField, RadioGroup, Radio, Form, Picker, Item } from '@adobe/react-spectrum'
import React from 'react'
import { BEAT, CHORD_SYMBOL } from '../../../../constants'
import { ChordSymbol, Beat, MIDINoteNumber } from '../../../../types'
import { Title } from '../../molecules/title'
import { dictionary as _dictionary, options } from './constants'
import * as Styles from './styles'

export type Props = {
  locale: string
  chordSymbol: ChordSymbol
  beat: Beat
  midiNoteNumber: MIDINoteNumber
  onChangeBaseNoteSymbol: (baseNoteSymbol: ChordSymbol) => void
  onChangeBaseNoteNumber: (baseNoteNumber: MIDINoteNumber) => void
  onChangeBeat: (beat: Beat) => void
}

export const Setting: React.FC<Props> = ({
  locale,
  chordSymbol,
  beat,
  midiNoteNumber,
  onChangeBaseNoteSymbol,
  onChangeBaseNoteNumber,
  onChangeBeat,
}) => {
  const [tempBaseNoteNumber, setTempBaseNoteNumber] = React.useState<string>(String(midiNoteNumber))
  const [isBaseNoteNumberError, setIsBaseNoteNumberError] = React.useState<boolean>(false)

  const dictionary = React.useMemo(() => {
    return locale === 'ja' ? _dictionary.ja : _dictionary.en
  }, [locale])

  const changeHandlerBaseNoteSymbol = React.useCallback(
    (baseNoteSymbol: string) => {
      const _baseNoteSymbol = baseNoteSymbol as ChordSymbol

      if (_baseNoteSymbol === 'init') {
        return
      }

      if (CHORD_SYMBOL.includes(_baseNoteSymbol)) {
        onChangeBaseNoteSymbol(_baseNoteSymbol)
      }
    },
    [onChangeBaseNoteSymbol]
  )

  const changeHandlerBaseNoteNumber = React.useCallback((baseNoteNumber: string) => {
    setTempBaseNoteNumber(baseNoteNumber)
    setIsBaseNoteNumberError(!Number.isInteger(Number(baseNoteNumber)) || baseNoteNumber === '')
  }, [])

  const changeHandlerBeat = React.useCallback(
    (beat: string) => {
      const _beat = beat as Beat

      if (_beat === 'init') {
        return
      }

      if (BEAT.includes(_beat)) {
        onChangeBeat(_beat)
      }
    },
    [onChangeBeat]
  )

  React.useEffect(() => {
    if (!isBaseNoteNumberError) {
      onChangeBaseNoteNumber(Number(tempBaseNoteNumber))
    }
  }, [isBaseNoteNumberError, tempBaseNoteNumber, onChangeBaseNoteNumber])

  return (
    <Styles.Main>
      <Title text={dictionary.title} />
      <Form>
        <Picker
          label={dictionary.baseNoteSymbol}
          items={options}
          onSelectionChange={changeHandlerBaseNoteSymbol}
          defaultSelectedKey={chordSymbol}
        >
          {(item) => <Item key={item.name}>{item.name}</Item>}
        </Picker>
        <TextField
          label={dictionary.baseNoteNumber}
          defaultValue={String(midiNoteNumber)}
          onChange={changeHandlerBaseNoteNumber}
          inputMode={'tel'}
          validationState={isBaseNoteNumberError ? 'invalid' : 'valid'}
        />
        <RadioGroup label={dictionary.beat} defaultValue={beat} onChange={changeHandlerBeat}>
          {BEAT.map((_beat) => (
            <Radio key={_beat} value={_beat}>
              {_beat}
            </Radio>
          ))}
        </RadioGroup>
      </Form>
    </Styles.Main>
  )
}
