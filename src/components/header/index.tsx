import {
  Header,
  ActionButton,
  Button,
  ButtonGroup,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Heading,
  Text,
  TextField,
  RadioGroup,
  Radio,
  Form,
  Switch,
} from '@adobe/react-spectrum'
import Help from '@spectrum-icons/workflow/Help'
import Settings from '@spectrum-icons/workflow/Settings'
import React from 'react'
import { version } from '../../../package.json'
import { HeaderHight } from '../../components/constants'
import { Beats } from '../constants'
import * as Styles from './styles'

type Props = {
  onChangeBeat: (beat: typeof Beats[number]) => void
  onChangeBaseNoteNumber: (baseNoteNumber: number) => void
  baseNoteNumber: number
  beat: typeof Beats[number]
}

export const MainHeader: React.FC<Props> = ({
  baseNoteNumber,
  onChangeBaseNoteNumber,
  beat,
  onChangeBeat,
}) => {
  const [currentBaseNoteNumber, setCurrentBaseNoteNumber] = React.useState<string>(
    String(baseNoteNumber)
  )
  const [currentBeat, setCurrentBeat] = React.useState<typeof beat>(beat)

  const isValidBaseNoteNumber = React.useMemo(() => /\d/.test(currentBaseNoteNumber), [
    currentBaseNoteNumber,
  ])

  React.useEffect(() => {
    setCurrentBaseNoteNumber(String(baseNoteNumber))
  }, [baseNoteNumber])

  React.useEffect(() => {
    setCurrentBeat(beat)
  }, [beat])

  const onSubmitSettings = React.useCallback(
    (close: () => void) => () => {
      onChangeBaseNoteNumber(Number(currentBaseNoteNumber))
      onChangeBeat(currentBeat)

      close()
    },
    [currentBaseNoteNumber, onChangeBaseNoteNumber, currentBeat, onChangeBeat]
  )

  const onClose = React.useCallback(
    (close: () => void) => () => {
      setCurrentBaseNoteNumber(String(baseNoteNumber))
      setCurrentBeat(beat)
      close()
    },
    [baseNoteNumber, beat]
  )

  const onChangeCurrentBaseNoteNumber = React.useCallback((value: string) => {
    setCurrentBaseNoteNumber(value)
  }, [])

  const onChangeCurrentBeat = React.useCallback((value: typeof Beats[number]) => {
    setCurrentBeat(value)
  }, [])

  return (
    <Header width={'100%'} height={`${HeaderHight}px`}>
      <Styles.Main>
        <Styles.Right>
          <Styles.Title>
            <Text>Chord to MIDI</Text>
          </Styles.Title>
          <Styles.Version>
            <Text>{`v.${version}`}</Text>
          </Styles.Version>
        </Styles.Right>
        <Styles.Left>
          <DialogTrigger>
            <ActionButton isQuiet>
              <Settings />
            </ActionButton>
            {(close) => (
              <Dialog>
                <Heading>Settings</Heading>
                <Divider />
                <Content>
                  <Form>
                    <TextField
                      label="Base Note Number"
                      defaultValue={String(currentBaseNoteNumber)}
                      onChange={onChangeCurrentBaseNoteNumber}
                      inputMode={'tel'}
                      validationState={isValidBaseNoteNumber ? 'valid' : 'invalid'}
                    />
                    <RadioGroup label="Beat" value={currentBeat} onChange={onChangeCurrentBeat}>
                      {Beats.map((_beat) => (
                        <Radio key={_beat} value={_beat}>
                          {_beat}
                        </Radio>
                      ))}
                    </RadioGroup>
                    <Switch>Strings mode</Switch>
                  </Form>
                </Content>
                <ButtonGroup>
                  <Button variant="secondary" onPress={onClose(close)}>
                    Cancel
                  </Button>
                  <Button
                    variant="cta"
                    onPress={onSubmitSettings(close)}
                    isDisabled={!isValidBaseNoteNumber}
                  >
                    Submit
                  </Button>
                </ButtonGroup>
              </Dialog>
            )}
          </DialogTrigger>
          <DialogTrigger>
            <ActionButton isQuiet>
              <Help />
            </ActionButton>
            {(close) => (
              <Dialog>
                <Heading>How to use</Heading>
                <Divider />
                <Content>
                  <Text>
                    Bars are separated by {`'|'`}
                    <br />
                    ex.) | CbMaj7 | Db | Ebm | Ebm |
                    <br />
                    <br />
                    Whole note = | CbMaj7 |
                    <br />
                    Half note = | Db Eb |
                    <br />
                    Quarter note = | Ebm7 Ebm Db Db7|
                    <br />
                    <br />
                    Developed for personal use and therefore does not guarantee its operation
                  </Text>
                </Content>
                <ButtonGroup>
                  <Button variant="cta" onPress={close}>
                    Confirm
                  </Button>
                </ButtonGroup>
              </Dialog>
            )}
          </DialogTrigger>
        </Styles.Left>
      </Styles.Main>
    </Header>
  )
}
