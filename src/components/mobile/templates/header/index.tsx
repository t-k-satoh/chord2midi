import { Header, ActionButton } from '@adobe/react-spectrum'
import Download from '@spectrum-icons/workflow/Download'
import Rail from '@spectrum-icons/workflow/Rail'
import Share from '@spectrum-icons/workflow/Share'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DispatchToProps, StateToProps } from '../../../../containers/mobile/templates/header'
import { makeAllData } from '../../../../utils/data'
import { generateInitBool } from '../../../../utils/generate_init_bool'
import { generateQuery } from '../../../../utils/generate_query'
import { makeAllDataArg } from '../../../../utils/make_all_data_arg'
import { saveMIDIFile } from '../../../../utils/save_as'
import * as Styles from './styles'

export type Props = DispatchToProps & StateToProps

export const MainHeader: React.FC<Props> = ({
  version,
  isHome,
  isDarkMode,
  isDisabledDownLoad,
  isDisabledShare,
  isShowNav,
  onClickNav,
  value,
  beat,
  midiNoteNumber,
  chordSymbol,
}) => {
  const iconImage: string = React.useMemo(() => (isDarkMode ? '/icon_wh.png' : '/icon_blk.png'), [
    isDarkMode,
  ])
  const altImage: string = React.useMemo(() => `Chord to MIDI v.${version}`, [version])
  const logoSize: 40 = React.useMemo(() => 40, [])
  const buttonSize: 32 = React.useMemo(() => 32, [])
  const buttonIconSize: 20 = React.useMemo(() => 20, [])
  const newIsDisabledShare = React.useMemo(() => generateInitBool(isDisabledShare, true), [
    isDisabledShare,
  ])
  const newIsDisabledDownLoad = React.useMemo(() => generateInitBool(isDisabledDownLoad, true), [
    isDisabledDownLoad,
  ])

  const handlerClickNav = React.useCallback(() => {
    onClickNav(!isShowNav)
  }, [isShowNav, onClickNav])
  const onClickShare = React.useCallback(() => {
    console.log(
      generateQuery({
        value: value.value,
        beat: beat.value,
        midiNoteNumber: String(midiNoteNumber.value),
        chordSymbol: chordSymbol.value,
      })
    )
  }, [value.value, beat.value, midiNoteNumber.value, chordSymbol.value])
  const onClickDownLoad = React.useCallback(() => {
    const [chordText, baseNote, newBeat] = makeAllDataArg({
      value,
      beat,
      midiNoteNumber,
      chordSymbol,
    })
    const { data } = makeAllData(chordText, baseNote, newBeat)

    saveMIDIFile(data)
  }, [value, beat, midiNoteNumber, chordSymbol])

  return (
    <Header width={'100%'}>
      <Styles.Main>
        <Styles.Logo>
          <Link prefetch href={'/'} passHref>
            <Image src={iconImage} alt={altImage} width={logoSize} height={logoSize} />
          </Link>
        </Styles.Logo>
        <Styles.Nav>
          <ActionButton isQuiet width={buttonSize} height={buttonSize} onPress={handlerClickNav}>
            <Rail width={24} />
          </ActionButton>
        </Styles.Nav>
        {isHome ? (
          <Styles.DownLoad>
            <ActionButton
              isQuiet
              isDisabled={newIsDisabledShare}
              width={buttonSize}
              height={buttonSize}
              onPress={onClickShare}
            >
              <Share width={buttonIconSize} />
            </ActionButton>
            <ActionButton
              isQuiet
              isDisabled={newIsDisabledDownLoad}
              width={buttonSize}
              height={buttonSize}
              onPress={onClickDownLoad}
            >
              <Download width={buttonIconSize} />
            </ActionButton>
          </Styles.DownLoad>
        ) : null}
      </Styles.Main>
    </Header>
  )
}
