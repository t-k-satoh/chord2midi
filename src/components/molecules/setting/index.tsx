import {
  Button,
  ButtonGroup,
  Content,
  Divider,
  Heading,
  TextField,
  RadioGroup,
  Radio,
  Form,
  Switch,
  Picker,
  Item,
} from '@adobe/react-spectrum'
import React, { ComponentProps } from 'react'
import { Beats } from '../../constants'

export type Props = {
  beat: typeof Beats[number]
  baseNote: { symbol: string; number: number }
  isStringsMode: boolean
  onClose: () => void
  onChangeBaseNote: (baseNote: { symbol: string; number: number }) => void
  onChangeBeat: (beat: typeof Beats[number]) => void
  onChangeStringsMode: (stringsMode: boolean) => void
}

export const Setting: React.FC<Props> = ({
  beat,
  baseNote,
  isStringsMode,
  onClose,
  onChangeBaseNote,
  onChangeBeat,
  onChangeStringsMode,
}) => {
  const baseNoteSymbols = [{ symbol: 'C' }]

  const [tempBeat, setTempBeat] = React.useState<typeof beat>(beat)
  const [tempBaseNoteNumber, setTempBaseNoteNumber] = React.useState<string>(
    String(baseNote.number)
  )
  const [tempBaseNoteSymbol, setTempBaseNoteSymbol] = React.useState<string>(baseNote.symbol)
  const [tempIsStringsMode, setTempIsStringsMode] = React.useState<typeof isStringsMode>(
    isStringsMode
  )

  const isValidBaseNoteNumber = React.useMemo(
    () => /\d/.test(tempBaseNoteNumber) && tempBaseNoteNumber !== '',
    [tempBaseNoteNumber]
  )

  const onChancel = React.useCallback(() => {
    onClose()
    setTempBeat(beat)
    setTempBaseNoteNumber(String(baseNote))
    setTempIsStringsMode(isStringsMode)
  }, [beat, baseNote, isStringsMode, onClose])

  const onSubmit = React.useCallback(() => {
    onChangeBeat(tempBeat)
    onChangeBaseNote({ number: Number(tempBaseNoteNumber), symbol: tempBaseNoteSymbol })
    onChangeStringsMode(tempIsStringsMode)
    onClose()
  }, [
    tempBeat,
    tempBaseNoteNumber,
    tempIsStringsMode,
    tempBaseNoteSymbol,
    onClose,
    onChangeBaseNote,
    onChangeBeat,
    onChangeStringsMode,
  ])

  const onChangeTempBeat = React.useCallback((_beat: typeof beat) => {
    setTempBeat(_beat)
  }, [])

  const onChangeTempBaseNoteNumber = React.useCallback(
    (_baseNote: Parameters<ComponentProps<typeof TextField>['onChange']>[0]) => {
      setTempBaseNoteNumber(_baseNote)
    },
    []
  )

  const onChangeTempBaseNoteSymbol = React.useCallback(
    (_baseNoteSymbol: Parameters<ComponentProps<typeof TextField>['onChange']>[0]) => {
      setTempBaseNoteSymbol(_baseNoteSymbol)
    },
    []
  )

  const onChangeTempIsStringsMode = React.useCallback((_isStringsMode: typeof isStringsMode) => {
    setTempIsStringsMode(_isStringsMode)
  }, [])

  return (
    <>
      <Heading>Settings</Heading>
      <Divider />
      <Content>
        <Form>
          <Picker
            label="Base Note Symbol"
            items={baseNoteSymbols}
            selectedKey={tempBaseNoteSymbol}
            onSelectionChange={onChangeTempBaseNoteSymbol}
          >
            {(item) => <Item key={item.symbol}>{item.symbol}</Item>}
          </Picker>
          <TextField
            label="Base Note Number"
            defaultValue={String(tempBaseNoteNumber)}
            onChange={onChangeTempBaseNoteNumber}
            inputMode={'tel'}
            validationState={isValidBaseNoteNumber ? 'valid' : 'invalid'}
          />
          <RadioGroup label="Beat" value={tempBeat} onChange={onChangeTempBeat}>
            {Beats.map((_beat) => (
              <Radio key={_beat} value={_beat}>
                {_beat}
              </Radio>
            ))}
          </RadioGroup>
          <Switch onChange={onChangeTempIsStringsMode} isSelected={tempIsStringsMode}>
            Strings mode
          </Switch>
        </Form>
      </Content>
      <ButtonGroup>
        <Button variant="secondary" onPress={onChancel}>
          Cancel
        </Button>
        <Button variant="cta" onPress={onSubmit} isDisabled={!isValidBaseNoteNumber}>
          Submit
        </Button>
      </ButtonGroup>
    </>
  )
}
