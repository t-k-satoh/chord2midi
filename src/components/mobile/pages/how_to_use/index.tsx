import { TextArea, ActionButton, TooltipTrigger, Tooltip } from '@adobe/react-spectrum'
import Download from '@spectrum-icons/workflow/Download'
import Share from '@spectrum-icons/workflow/Share'
import Image from 'next/image'
import React from 'react'
import { Title } from '../../../../components/common/molecules/title'
import { I18N } from '../../../../constants/i18n'
import { StateToProps } from '../../../../containers/mobile/pages/how_to_use'
import { PageContainer } from '../../../../containers/mobile/templates/page'
import * as utils from '../../../../utils'
import { Frame } from '../../templates/frame'
import * as Styles from './styles'

export type Props = StateToProps

export const MobileHowToUse: React.FC<Props> = React.memo(function Component({ locale }) {
  const { protocol, port, hostname } = window.location
  const [exampleValue, setExampleValue] = React.useState<string>('A B C D|G D B D')

  const buttonSize: 32 = React.useMemo(() => 32, [])
  const buttonIconSize: 20 = React.useMemo(() => 20, [])
  const path = React.useMemo(() => `${protocol}//${hostname}${port === '' ? '' : `:${port}`}/`, [
    protocol,
    port,
    hostname,
  ])
  const newProps = React.useMemo(() => utils.convertExcludeObject({ locale }), [locale])

  React.useEffect(() => {
    const sampleCode = ['C#/D6', 'C C/F A', 'E/F A B', 'A B C/D', 'A B', 'A B C', 'A', 'A B C D']
    const interval = setInterval(() => {
      setExampleValue(
        `${sampleCode[Math.floor(Math.random() * 7)]}|${
          sampleCode[Math.floor(Math.random() * 7)]
        }|${sampleCode[Math.floor(Math.random() * 7)]}|${sampleCode[Math.floor(Math.random() * 7)]}`
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <PageContainer>
      <Frame>
        <Styles.Main>
          <Title text={utils.switchLangText(I18N.HOW_TO_USE.TITLE, newProps.locale, null)} />
          <Styles.Section>
            <Styles.SubTitle>
              {utils.switchLangText(I18N.HOW_TO_USE.CHORD_INPUT, newProps.locale, null)}
            </Styles.SubTitle>
            <Styles.BasicText>
              {utils.switchLangText(I18N.HOW_TO_USE.INPUT_BOX_DESCRIPTION, newProps.locale, null)}
            </Styles.BasicText>
            <Styles.Example>
              <TextArea
                width={'100%'}
                height={'100%'}
                value={exampleValue}
                validationState={'valid'}
                isReadOnly
              />
            </Styles.Example>
            <Styles.Example>
              <TextArea
                width={'100%'}
                height={'100%'}
                value={'Invalid Chord'}
                validationState={'invalid'}
                isReadOnly
              />
            </Styles.Example>
            <Styles.BasicText>
              {utils.switchLangText(I18N.HOW_TO_USE.BAR, newProps.locale, null)}
            </Styles.BasicText>
            <Styles.Example>
              <TextArea
                width={'100%'}
                height={'100%'}
                value={'A | B | C | D'}
                validationState={'valid'}
                isReadOnly
              />
            </Styles.Example>
            <Styles.ExampleImage>
              <Image src="/ex_1.png" alt={'ex_1'} width="auto" height="auto" />
            </Styles.ExampleImage>
            <Styles.BasicText>
              {utils.switchLangText(I18N.HOW_TO_USE.TIME_SIGNATURE, newProps.locale, null)}
            </Styles.BasicText>
            <Styles.Example>
              <TextArea
                width={'100%'}
                height={'100%'}
                value={'A B C D|G D B D'}
                validationState={'valid'}
                isReadOnly
              />
            </Styles.Example>
            <Styles.BasicText>
              {utils.switchLangText(I18N.HOW_TO_USE.UPPER_LIMIT, newProps.locale, null)}
            </Styles.BasicText>
            <Styles.Example>
              <TextArea
                width={'100%'}
                height={'100%'}
                value={'A B C |G D B'}
                validationState={'valid'}
                isReadOnly
              />
            </Styles.Example>
            <Styles.ExampleImage>
              <Image src="/ex_2.png" alt={'ex_2'} width="auto" height="auto" />
            </Styles.ExampleImage>
            <Styles.BasicText>
              {utils.switchLangText(I18N.HOW_TO_USE.GENERAL_NOTATION, newProps.locale, null)}
            </Styles.BasicText>
          </Styles.Section>
          <Styles.Section>
            <Styles.SubTitle>
              {utils.switchLangText(I18N.HOW_TO_USE.CHORD_DISPLAY_AREA, newProps.locale, null)}
            </Styles.SubTitle>
            <Styles.BasicText>
              {utils.switchLangText(I18N.HOW_TO_USE.SHOW_CHORDS, newProps.locale, null)}
            </Styles.BasicText>
            <Styles.BasicText>
              {utils.switchLangText(I18N.HOW_TO_USE.LIMIT_CHORDS, newProps.locale, null)}
            </Styles.BasicText>
          </Styles.Section>
          <Styles.Section>
            <Styles.SubTitle>
              {utils.switchLangText(I18N.HOW_TO_USE.DOWNLOADING_AND_SHARING, newProps.locale, null)}
            </Styles.SubTitle>
            <Styles.BasicText>
              {utils.switchLangText(I18N.HOW_TO_USE.MIDI_DOWNLOAD, newProps.locale, null)}(
              {
                <ActionButton isQuiet isDisabled={false} width={buttonSize} height={buttonSize}>
                  <Download width={buttonIconSize} />
                </ActionButton>
              }
              )
              <br />
              {utils.switchLangText(I18N.HOW_TO_USE.INVALID_DATA, newProps.locale, null)}
            </Styles.BasicText>
            <Styles.BasicText>
              {utils.switchLangText(I18N.HOW_TO_USE.CAN_CLICK_SHARE, newProps.locale, null)}(
              {
                <TooltipTrigger isOpen={false}>
                  <ActionButton isQuiet isDisabled={false} width={buttonSize} height={buttonSize}>
                    <Share width={buttonIconSize} />
                  </ActionButton>
                  <Tooltip>
                    <Styles.ToolTipField>
                      <Styles.ToolTipText>Copied to clipboard!!</Styles.ToolTipText>
                    </Styles.ToolTipField>
                  </Tooltip>
                </TooltipTrigger>
              }
              )
              <br />
              {utils.switchLangText(I18N.HOW_TO_USE.CAN_SHARE, newProps.locale, null)}
            </Styles.BasicText>
            <Styles.Example>
              <TextArea
                width={'100%'}
                height={'100%'}
                value={'A B C D|G D B D'}
                validationState={'valid'}
                isReadOnly
              />
            </Styles.Example>
            <Styles.BasicText>
              {utils.switchLangText(I18N.HOW_TO_USE.CLICK_COPY_BOARD, newProps.locale, null)}:
              <Styles.CodeText>{`${path}?value=A%20B%20C%20D%7CG%20D%20B%20D&beat=4/4&midiNoteNumber=3&chordSymbol=C`}</Styles.CodeText>
            </Styles.BasicText>
          </Styles.Section>
        </Styles.Main>
      </Frame>
    </PageContainer>
  )
})
