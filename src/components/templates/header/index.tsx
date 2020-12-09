import { Header, ActionButton, Dialog, DialogTrigger, Text } from '@adobe/react-spectrum'
import Help from '@spectrum-icons/workflow/Help'
import Settings from '@spectrum-icons/workflow/Settings'
import React from 'react'
import { version } from '../../../../package.json'
import { HeaderHight } from '../../constants'
import { Beats } from '../../constants'
import { HowToUse } from '../../molecules/how_to_use'
import { Setting } from '../../molecules/setting'
import * as Styles from './styles'

type Props = {
  onChangeBeat: (beat: typeof Beats[number]) => void
  onChangeBaseNote: (baseNote: { symbol: string; number: number }) => void
  baseNote: {
    symbol: string
    number: number
  }
  beat: typeof Beats[number]
}

export const MainHeader: React.FC<Props> = ({ baseNote, onChangeBaseNote, beat, onChangeBeat }) => {
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
                <Setting
                  beat={beat}
                  baseNote={baseNote}
                  isStringsMode={true}
                  onChangeBaseNote={onChangeBaseNote}
                  onChangeBeat={onChangeBeat}
                  onChangeStringsMode={() => ({})}
                  onClose={close}
                />
              </Dialog>
            )}
          </DialogTrigger>
          <DialogTrigger>
            <ActionButton isQuiet>
              <Help />
            </ActionButton>
            {(close) => (
              <Dialog>
                <HowToUse onClose={close} />
              </Dialog>
            )}
          </DialogTrigger>
        </Styles.Left>
      </Styles.Main>
    </Header>
  )
}
