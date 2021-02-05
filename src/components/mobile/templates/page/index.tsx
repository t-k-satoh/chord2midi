import React from 'react'
import Div100vh from 'react-div-100vh'
import { MainHeader } from '../../../../components/mobile/templates/header'
import { NavContainer } from '../../../../containers/mobile/templates/nav'
import { StateToProps } from '../../../../containers/mobile/templates/page'
import * as utils from '../../../../utils'
import * as Styles from './styles'

export type Props = StateToProps

export const Page: React.FC<Props> = React.memo(function Component({
  version,
  children,
  chordSymbol,
  beat,
  midiNoteNumber,
  value,
  isDarkMode,
  isHome,
  isDisabledDownLoad,
  isDisabledShare,
  bpm,
}) {
  const [isShowNav, setIsShowNav] = React.useState<boolean>(false)

  const tempValues = React.useMemo(
    () => utils.pickValues({ chordSymbol, beat, midiNoteNumber, value, isDarkMode, bpm }),
    [chordSymbol, beat, midiNoteNumber, value, isDarkMode, bpm]
  )
  const { hasInit } = React.useMemo(
    () => utils.checkInit({ ...tempValues, isHome, isDisabledDownLoad, isDisabledShare }),
    [tempValues, isHome, isDisabledDownLoad, isDisabledShare]
  )
  const newProps = React.useMemo(
    () =>
      utils.convertExcludeObject({
        ...tempValues,
        isHome,
        isDisabledDownLoad,
        isDisabledShare,
      }),
    [tempValues, isHome, isDisabledDownLoad, isDisabledShare]
  )

  const handlerCloseNav = React.useCallback(() => {
    setIsShowNav(false)
  }, [setIsShowNav])

  const onClickNav = React.useCallback(
    (newIsShowNav: typeof isShowNav) => {
      setIsShowNav(newIsShowNav)
    },
    [setIsShowNav]
  )

  if (hasInit) {
    return null
  }

  return (
    <Div100vh>
      <Styles.Main>
        <Styles.Layer S_isShow={isShowNav} onClick={handlerCloseNav} />
        <Styles.Settings S_isShow={isShowNav}>
          <NavContainer />
        </Styles.Settings>
        <Styles.Header>
          <MainHeader
            onClickNav={onClickNav}
            isShowNav={isShowNav}
            value={newProps.value}
            chordSymbol={newProps.chordSymbol}
            beat={newProps.beat}
            midiNoteNumber={newProps.midiNoteNumber}
            version={version}
            isDarkMode={newProps.isDarkMode}
            isHome={newProps.isHome}
            isDisabledDownLoad={newProps.isDisabledDownLoad}
            isDisabledShare={newProps.isDisabledShare}
            bpm={newProps.bpm}
          />
        </Styles.Header>
        {children}
      </Styles.Main>
    </Div100vh>
  )
})
