import { Header, ActionButton } from '@adobe/react-spectrum'
import Download from '@spectrum-icons/workflow/Download'
import Rail from '@spectrum-icons/workflow/Rail'
import Image from 'next/image'
import React from 'react'
import * as Styles from './styles'

type Props = {
  version: string
  onClickSettings: () => void
  onClickDownLoad: () => void
  isDisabledDownLoad: boolean
}

export const MainHeader: React.FC<Props> = ({
  version,
  isDisabledDownLoad,
  onClickSettings,
  onClickDownLoad,
}) => {
  const onClickSettingsHandler = React.useCallback(() => {
    onClickSettings()
  }, [onClickSettings])

  return (
    <Header width={'100%'}>
      <Styles.Main>
        <Styles.Logo>
          <Image src="/icon_wh.png" alt={`Chord to MIDI v.${version}`} width={40} height={40} />
        </Styles.Logo>
        <Styles.Nav>
          <ActionButton isQuiet width={32} height={32} onPress={onClickSettingsHandler}>
            <Rail width={24} />
          </ActionButton>
        </Styles.Nav>
        <Styles.DownLoad>
          <ActionButton
            isQuiet
            isDisabled={isDisabledDownLoad}
            width={32}
            height={32}
            onPress={onClickDownLoad}
          >
            <Download width={20} />
          </ActionButton>
        </Styles.DownLoad>
      </Styles.Main>
    </Header>
  )
}
