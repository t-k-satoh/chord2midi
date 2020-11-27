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
import * as Styles from './styles'

type Props = {
  onChangeBaseNoteNumber: (baseNoteNumber: number) => void
  baseNoteNumber: number
}

export const MainHeader: React.FC<Props> = ({ baseNoteNumber, onChangeBaseNoteNumber }) => {
  const [currentBaseNoteNumber, setCurrentBaseNoteNumber] = React.useState<string>(
    String(baseNoteNumber)
  )

  const isValidBaseNoteNumber = React.useMemo(() => /\d/.test(currentBaseNoteNumber), [
    currentBaseNoteNumber,
  ])

  const onSubmitSettings = React.useCallback(
    (close: () => void) => () => {
      if (isValidBaseNoteNumber) {
        onChangeBaseNoteNumber(Number(currentBaseNoteNumber))

        close()
      }
    },
    [currentBaseNoteNumber, onChangeBaseNoteNumber, isValidBaseNoteNumber]
  )

  const onChangeCurrentBaseNoteNumber = React.useCallback((value: string) => {
    setCurrentBaseNoteNumber(value)
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
                    <RadioGroup label="Beat">
                      <Radio value="3/4">3/4</Radio>
                      <Radio value="4/4">4/4</Radio>
                    </RadioGroup>
                    <Switch>Strings mode</Switch>
                  </Form>
                </Content>
                <ButtonGroup>
                  <Button variant="cta" onPress={onSubmitSettings(close)}>
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
