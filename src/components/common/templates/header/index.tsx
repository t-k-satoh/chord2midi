import { Header, ActionButton } from '@adobe/react-spectrum'
import Help from '@spectrum-icons/workflow/Help'
import Rail from '@spectrum-icons/workflow/Rail'
import Settings from '@spectrum-icons/workflow/Settings'
import Image from 'next/image'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { version } from '../../../../../package.json'
import { HeaderHight } from '../../../../constants'
import { Beats } from '../../../../constants'
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

export const MainHeader: React.FC<Props> = () => {
  const iconSize = React.useMemo(() => (isMobile ? 40 : 32), [])

  const logoImage = React.useMemo(
    () => (
      <Image
        src="/icon_wh.png"
        alt={`Chord to MIDI v.${version}`}
        width={iconSize}
        height={iconSize}
      />
    ),
    [iconSize]
  )

  return (
    <Header width={'100%'} height={`${HeaderHight}px`}>
      {isMobile ? (
        <Styles.MobileMain>
          <Styles.MobileLogo>{logoImage}</Styles.MobileLogo>
          <Styles.MobileNav>
            <ActionButton isQuiet width={32} height={32}>
              <Rail />
            </ActionButton>
          </Styles.MobileNav>
        </Styles.MobileMain>
      ) : (
        <Styles.Main S_isMobile={isMobile}>
          <Styles.Right>{logoImage}</Styles.Right>
          <Styles.Left>
            <Settings />
            <Help />
          </Styles.Left>
        </Styles.Main>
      )}
    </Header>
  )
}
