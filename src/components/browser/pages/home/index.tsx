import { ActionButton } from '@adobe/react-spectrum'
import FastForward from '@spectrum-icons/workflow/FastForward'
import Pause from '@spectrum-icons/workflow/Pause'
import Play from '@spectrum-icons/workflow/Play'
import Refresh from '@spectrum-icons/workflow/Refresh'
import Rewind from '@spectrum-icons/workflow/Rewind'
import Stop from '@spectrum-icons/workflow/Stop'
import { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import { StateToProps } from '../../../../containers/browser/pages/home'
import * as utils from '../../../../utils'
import * as CONSTANTS from './constants'
import * as Styles from './styles'

type Props = StateToProps

export const BrowserHome: NextPage<Props> = ({ isDarkMode, version }) => {
  const pickedValues = React.useMemo(() => utils.pickValues({ isDarkMode }), [isDarkMode])
  const newValues = React.useMemo(() => utils.convertExcludeObject({ ...pickedValues }), [
    pickedValues,
  ])

  const altImage: string = React.useMemo(() => utils.generateTitle(version), [version])
  const iconImage: string = React.useMemo(
    () => (newValues.isDarkMode ? CONSTANTS.ICON_WH_PATH : CONSTANTS.ICON_BLK_PATH),
    [newValues.isDarkMode]
  )

  return (
    <Styles.Main>
      <Styles.Header>
        <Styles.Logo>
          <Image
            src={iconImage}
            alt={altImage}
            width={CONSTANTS.LOGO_SIZE}
            height={CONSTANTS.LOGO_SIZE}
          />
        </Styles.Logo>
      </Styles.Header>
      <Styles.ControlArea>
        <Styles.ControllerArea>
          <ActionButton
            isQuiet
            height={CONSTANTS.BUTTON_HEIGHT}
            isDisabled={false}
            onPress={() => ({})}
          >
            <Rewind height={CONSTANTS.BUTTON_HEIGHT} />
          </ActionButton>
          <ActionButton
            isQuiet
            height={CONSTANTS.BUTTON_HEIGHT}
            isDisabled={false}
            onPress={() => ({})}
          >
            <FastForward height={CONSTANTS.BUTTON_HEIGHT} />
          </ActionButton>
          <ActionButton
            isQuiet
            height={CONSTANTS.BUTTON_HEIGHT}
            isDisabled={false}
            onPress={() => ({})}
          >
            <Stop height={CONSTANTS.BUTTON_HEIGHT} />
          </ActionButton>
          <ActionButton
            isQuiet
            height={CONSTANTS.BUTTON_HEIGHT}
            isDisabled={false}
            onPress={() => ({})}
          >
            <Play height={CONSTANTS.BUTTON_HEIGHT} />
          </ActionButton>
          <ActionButton
            isQuiet
            height={CONSTANTS.BUTTON_HEIGHT}
            isDisabled={false}
            onPress={() => ({})}
          >
            <Pause height={CONSTANTS.BUTTON_HEIGHT} />
          </ActionButton>
        </Styles.ControllerArea>
      </Styles.ControlArea>
    </Styles.Main>
  )
}
