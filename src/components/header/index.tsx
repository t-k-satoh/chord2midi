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
} from '@adobe/react-spectrum'
import React from 'react'
import { version } from '../../../package.json'
import { HeaderHight } from '../../components/constants'
import * as Styles from './styles'

export const MainHeader: React.FC = () => {
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
            <ActionButton>How to use</ActionButton>
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
