import React from 'react'
import Div100vh from 'react-div-100vh'
import { version } from '../../../../../package.json'
import { MainHeader } from '../header'
import { Nav } from '../nav'
import * as Styles from './styles'

export type Props = {
  locale: string
  isDarkMode: boolean
  isHome?: boolean
  isDisabledDownLoad?: boolean
  isDisabledShare?: boolean
  onClickDownLoad?: () => void
  onClickShare?: () => void
}

export const Page: React.FC<Props> = ({
  locale,
  children,
  isHome,
  isDarkMode,
  isDisabledDownLoad,
  isDisabledShare,
  onClickDownLoad,
  onClickShare,
}) => {
  const [isShowSettings, setIsShowSettings] = React.useState<boolean>(false)

  const showSettings = React.useCallback(() => {
    setIsShowSettings(true)
  }, [])

  const closeSettings = React.useCallback(() => {
    setIsShowSettings(false)
  }, [])

  return (
    <Div100vh>
      <Styles.Main>
        <Styles.Layer S_isShow={isShowSettings} onClick={closeSettings} />
        <Styles.Settings S_isShow={isShowSettings}>
          <Nav locale={locale} version={version} />
        </Styles.Settings>
        <Styles.Header>
          <MainHeader
            version={version}
            isHome={isHome}
            isDarkMode={isDarkMode}
            isDisabledDownLoad={isDisabledDownLoad}
            isDisabledShare={isDisabledShare}
            onClickSettings={showSettings}
            onClickDownLoad={onClickDownLoad}
            onClickShare={onClickShare}
          />
        </Styles.Header>
        {children}
      </Styles.Main>
    </Div100vh>
  )
}
