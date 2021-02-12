import React from 'react'
import { use100vh } from 'react-div-100vh'
import { HeaderContainer } from '../../../../containers/mobile/templates/header'
import { NavContainer } from '../../../../containers/mobile/templates/nav'
import { StateToProps, DispatchToProps } from '../../../../containers/mobile/templates/page/types'
import * as Styles from './styles'

export type Props = StateToProps & DispatchToProps

export const Page: React.FC<Props> = React.memo(function Component({
  children,
  isShowNav,
  onCloseShowNav,
}) {
  const height = use100vh()

  const handleCloseShowNav = React.useCallback(() => {
    onCloseShowNav()
  }, [onCloseShowNav])

  return (
    <Styles.Main S_height={height}>
      <Styles.Layer S_isShow={isShowNav} onClick={handleCloseShowNav} />
      <Styles.Settings S_isShow={isShowNav}>
        <NavContainer />
      </Styles.Settings>
      <Styles.Header>
        <HeaderContainer />
      </Styles.Header>
      {children}
    </Styles.Main>
  )
})
