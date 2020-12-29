import React from 'react'
import Div100vh from 'react-div-100vh'
import { HeaderContainer } from '../../../../containers/mobile/templates/header'
import { NavContainer } from '../../../../containers/mobile/templates/nav'
import { StateToProps, DispatchToProps } from '../../../../containers/mobile/templates/page'
import { generateInitBool } from '../../../../utils/generate_init_bool'
import * as Styles from './styles'

export type Props = StateToProps & DispatchToProps

export const Page: React.FC<Props> = ({ children, isShowNav, onCloseNav }) => {
  const newIsShowNav = React.useMemo(() => generateInitBool(isShowNav, false), [isShowNav])

  const handlerCloseNav = React.useCallback(() => {
    onCloseNav()
  }, [onCloseNav])

  return (
    <Div100vh>
      <Styles.Main>
        <Styles.Layer S_isShow={newIsShowNav} onClick={handlerCloseNav} />
        <Styles.Settings S_isShow={newIsShowNav}>
          <NavContainer />
        </Styles.Settings>
        <Styles.Header>
          <HeaderContainer />
        </Styles.Header>
        {children}
      </Styles.Main>
    </Div100vh>
  )
}
