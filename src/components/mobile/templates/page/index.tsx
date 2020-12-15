import React from 'react'
import Div100vh from 'react-div-100vh'
import { version } from '../../../../../package.json'
import { MainHeader } from '../header'
import { Nav } from '../nav'
import * as Styles from './styles'

type Props = {
  locale: string
  onClickDownLoad: () => void
  isDisabledDownLoad: boolean
}

export const Page: React.FC<Props> = ({
  locale,
  children,
  isDisabledDownLoad,
  onClickDownLoad,
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
            isDisabledDownLoad={isDisabledDownLoad}
            onClickSettings={showSettings}
            onClickDownLoad={onClickDownLoad}
          />
        </Styles.Header>
        {children}
      </Styles.Main>
    </Div100vh>
  )
}
