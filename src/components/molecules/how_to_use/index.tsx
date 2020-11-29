import { Button, ButtonGroup, Content, Divider, Heading, Text } from '@adobe/react-spectrum'
import React from 'react'

export type Props = {
  onClose: () => void
}

export const HowToUse: React.FC<Props> = ({ onClose }) => {
  return (
    <>
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
        <Button variant="cta" onPress={onClose}>
          Confirm
        </Button>
      </ButtonGroup>
    </>
  )
}
