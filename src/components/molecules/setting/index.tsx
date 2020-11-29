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
} from '@adobe/react-spectrum'
import React, { ComponentProps } from 'react'
import { Beats } from '../../constants'

export type Props = {
  beat: typeof Beats[number]
  baseNote: number
  isStringsMode: boolean
  onClose: () => void
  onChangeBaseNote: (baseNote: number) => void
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
  const [tempBeat, setTempBeat] = React.useState<typeof beat>(beat)
  const [tempBaseNote, setTempBaseNote] = React.useState<string>(String(baseNote))
  const [tempIsStringsMode, setTempIsStringsMode] = React.useState<typeof isStringsMode>(
    isStringsMode
  )

  const isValidBaseNoteNumber = React.useMemo(
    () => /\d/.test(tempBaseNote) && tempBaseNote !== '',
    [tempBaseNote]
  )

  const onChancel = React.useCallback(() => {
    setTempBeat(beat)
    setTempBaseNote(String(baseNote))
    setTempIsStringsMode(isStringsMode)
    onClose()
  }, [beat, baseNote, isStringsMode, onClose])

  const onSubmit = React.useCallback(() => {
    onChangeBeat(tempBeat)
    onChangeBaseNote(Number(tempBaseNote))
    onChangeStringsMode(tempIsStringsMode)
    onClose()
  }, [
    tempBeat,
    tempBaseNote,
    tempIsStringsMode,
    onClose,
    onChangeBaseNote,
    onChangeBeat,
    onChangeStringsMode,
  ])

  const onChangeTempBeat = React.useCallback((_beat: typeof beat) => {
    setTempBeat(_beat)
  }, [])

  const onChangeTempBaseNote = React.useCallback(
    (_baseNote: Parameters<ComponentProps<typeof TextField>['onChange']>[0]) => {
      setTempBaseNote(_baseNote)
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
          <TextField
            label="Base Note Number"
            defaultValue={String(tempBaseNote)}
            onChange={onChangeTempBaseNote}
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
