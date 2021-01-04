import React from 'react'
import Div100vh from 'react-div-100vh'
import { MainHeader } from '../../../../components/mobile/templates/header'
import { NavContainer } from '../../../../containers/mobile/templates/nav'
import { StateToProps } from '../../../../containers/mobile/templates/page'
import * as Styles from './styles'

export type Props = StateToProps

export const Page: React.FC<Props> = (props) => {
  const [isShowNav, setIsShowNav] = React.useState<boolean>(false)

  const handlerCloseNav = React.useCallback(() => {
    setIsShowNav(false)
  }, [setIsShowNav])

  const onClickNav = React.useCallback(
    (newIsShowNav: typeof isShowNav) => {
      setIsShowNav(newIsShowNav)
    },
    [setIsShowNav]
  )

  return (
    <Div100vh>
      <Styles.Main>
        <Styles.Layer S_isShow={isShowNav} onClick={handlerCloseNav} />
        <Styles.Settings S_isShow={isShowNav}>
          <NavContainer />
        </Styles.Settings>
        <Styles.Header>
          <MainHeader {...props} onClickNav={onClickNav} isShowNav={isShowNav} />
        </Styles.Header>
        {props.children}
      </Styles.Main>
    </Div100vh>
  )
}
