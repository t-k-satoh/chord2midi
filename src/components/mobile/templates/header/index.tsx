import { Header, ActionButton, Tooltip, TooltipTrigger } from '@adobe/react-spectrum'
import Download from '@spectrum-icons/workflow/Download'
import Rail from '@spectrum-icons/workflow/Rail'
import Share from '@spectrum-icons/workflow/Share'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { DispatchToProps, StateToProps } from '../../../../containers/mobile/templates/header/types'
import * as utils from '../../../../utils'
import * as CONSTANTS from './constants'
import * as Styles from './styles'

export type Props = DispatchToProps & StateToProps

export const MainHeader: React.FC<Props> = React.memo(function Component({
  version,
  isHome,
  isDarkMode,
  isDisabledDownLoad,
  isDisabledShare,
  isShowNav,
  value,
  beat,
  midiNoteNumber,
  chordSymbol,
  bpm,
  onChangeIsShowNav,
}) {
  const [copied, setCopied] = React.useState<boolean>(false)

  const iconImage: string = React.useMemo(
    () => (isDarkMode ? CONSTANTS.ICON_WH_PATH : CONSTANTS.ICON_BLK_PATH),
    [isDarkMode]
  )
  const altImage: string = React.useMemo(() => utils.generateTitle(version), [version])
  const newIsDisabledShare = React.useMemo(() => utils.generateInitBool(isDisabledShare, true), [
    isDisabledShare,
  ])
  const newIsDisabledDownLoad = React.useMemo(
    () => utils.generateInitBool(isDisabledDownLoad, true),
    [isDisabledDownLoad]
  )
  const sharedUrl: string = React.useMemo(
    () =>
      `${window.location.origin}${utils.generateQuery({
        value: encodeURI(value),
        beat,
        midiNoteNumber: String(midiNoteNumber),
        chordSymbol,
        bpm: String(bpm),
      })}`,
    [value, beat, midiNoteNumber, chordSymbol, bpm]
  )

  const handlerClickNav = React.useCallback(() => {
    onChangeIsShowNav(!isShowNav)
  }, [isShowNav, onChangeIsShowNav])
  const onClickShare = React.useCallback(() => {
    setCopied(true)
  }, [])
  const onClickDownLoad = React.useCallback(() => {
    const { data } = utils.makeAllData({ value, chordSymbol, beat, midiNoteNumber })

    utils.saveMIDIFile(data)
  }, [value, chordSymbol, beat, midiNoteNumber])

  React.useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    }
  }, [copied])

  return (
    <Header width={'100%'}>
      <Styles.Main>
        <Styles.Logo>
          <Link prefetch href={'/'} passHref>
            <Image
              src={iconImage}
              alt={altImage}
              width={CONSTANTS.LOGO_SIZE}
              height={CONSTANTS.LOGO_SIZE}
            />
          </Link>
        </Styles.Logo>
        <Styles.Nav>
          <ActionButton
            isQuiet
            width={CONSTANTS.BUTTON_SIZE}
            height={CONSTANTS.BUTTON_SIZE}
            onPress={handlerClickNav}
          >
            <Rail width={CONSTANTS.BUTTON_ICON_SIZE} />
          </ActionButton>
        </Styles.Nav>
        {isHome && (
          <Styles.DownLoad>
            <TooltipTrigger isOpen={copied}>
              <CopyToClipboard text={sharedUrl}>
                <ActionButton
                  isQuiet
                  isDisabled={newIsDisabledShare}
                  width={CONSTANTS.BUTTON_SIZE}
                  height={CONSTANTS.BUTTON_SIZE}
                  onPress={onClickShare}
                >
                  <Share width={CONSTANTS.BUTTON_ICON_SIZE} />
                </ActionButton>
              </CopyToClipboard>
              <Tooltip>
                <Styles.ToolTipField>
                  <Styles.ToolTipText>Copied to clipboard!!</Styles.ToolTipText>
                </Styles.ToolTipField>
              </Tooltip>
            </TooltipTrigger>
            <ActionButton
              isQuiet
              isDisabled={newIsDisabledDownLoad}
              width={CONSTANTS.BUTTON_SIZE}
              height={CONSTANTS.BUTTON_SIZE}
              onPress={onClickDownLoad}
            >
              <Download width={CONSTANTS.BUTTON_ICON_SIZE} />
            </ActionButton>
          </Styles.DownLoad>
        )}
      </Styles.Main>
    </Header>
  )
})
