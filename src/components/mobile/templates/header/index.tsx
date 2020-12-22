import { Header, ActionButton } from '@adobe/react-spectrum'
import Download from '@spectrum-icons/workflow/Download'
import Rail from '@spectrum-icons/workflow/Rail'
import Share from '@spectrum-icons/workflow/Share'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import * as Styles from './styles'

export type Props = {
  version: string
  isHome?: boolean
  isDisabledDownLoad?: boolean
  isDisabledShare?: boolean
  onClickSettings: () => void
  onClickDownLoad?: () => void
  onClickShare?: () => void
}

export const MainHeader: React.FC<Props> = ({
  version,
  isHome,
  isDisabledDownLoad,
  isDisabledShare,
  onClickSettings,
  onClickDownLoad,
  onClickShare,
}) => {
  const onClickSettingsHandler = React.useCallback(() => {
    onClickSettings()
  }, [onClickSettings])

  return (
    <Header width={'100%'}>
      <Styles.Main>
        <Styles.Logo>
          <Link prefetch href={'/'} passHref>
            <Image src="/icon_wh.png" alt={`Chord to MIDI v.${version}`} width={40} height={40} />
          </Link>
        </Styles.Logo>
        <Styles.Nav>
          <ActionButton isQuiet width={32} height={32} onPress={onClickSettingsHandler}>
            <Rail width={24} />
          </ActionButton>
        </Styles.Nav>
        {isHome ? (
          <Styles.DownLoad>
            <ActionButton
              isQuiet
              isDisabled={isDisabledShare}
              width={32}
              height={32}
              onPress={onClickShare}
            >
              <Share width={20} />
            </ActionButton>
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
        ) : null}
      </Styles.Main>
    </Header>
  )
}
