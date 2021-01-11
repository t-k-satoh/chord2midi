import { TextArea, ActionButton, TooltipTrigger, Tooltip } from '@adobe/react-spectrum'
import Download from '@spectrum-icons/workflow/Download'
import Share from '@spectrum-icons/workflow/Share'
import Image from 'next/image'
import React from 'react'
import { Title } from '../../../../components/common/molecules/title'
import { ViewArea } from '../../../../components/common/templates/view_area'
import { StateToProps } from '../../../../containers/mobile/pages/how_to_use'
import { PageContainer } from '../../../../containers/mobile/templates/page'
import * as utils from '../../../../utils'
import { Frame } from '../../templates/frame'
import * as Styles from './styles'

export type Props = StateToProps

export const MobileHowToUse: React.FC<Props> = ({ locale }) => {
  const { protocol, port, hostname } = window.location
  const [exampleValue, setExampleValue] = React.useState<string>('A B C D|G D B D')

  const buttonSize: 32 = React.useMemo(() => 32, [])
  const buttonIconSize: 20 = React.useMemo(() => 20, [])
  const path = React.useMemo(() => `${protocol}//${hostname}${port === '' ? '' : `:${port}`}/`, [
    protocol,
    port,
    hostname,
  ])

  const generateText = React.useCallback(
    (ja: string, en: string) => utils.switchLangText(locale, ja, en),
    [locale]
  )

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
          <Title text={generateText('使い方', 'How to use')} />
          <Styles.Section>
            <Styles.SubTitle>{generateText('和音の入力', 'Chord input')}</Styles.SubTitle>
            <Styles.BasicText>
              {generateText(
                '画面下の入力ボックスに和音を入力します。',
                'Enter a chord in the input box at the bottom of the screen.'
              )}
              <br />
              {generateText(
                '和音や小節以外の文字を入力するとエラーになります。',
                'If you enter characters other than chords or measures, an error will occur.'
              )}
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
              {generateText(
                '小節は"|"で区切ります。(前後のスペースは無視されます)',
                'Measures are separated by "|". (Spaces before and after are ignored.)'
              )}
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
              {generateText(
                '四拍子なら一小節に四分音符を４つ含めることができます。',
                'If you are in four time, you can include four quarter notes in a measure.'
              )}
              <br />
              {generateText(
                '同様に三拍子なら3つ含められます。',
                'Similarly, if you have three beats, you can include three.'
              )}
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
              {generateText(
                '一小節に含められる上限の四分音符から1を引いた数の和音を入力した場合(四拍子で3つの和音を入力)、最後の和音の長さが自動的に伸びます。',
                'If you enter a number of chords that is equal to the maximum number of quarter notes that can be included in a measure minus one (three chords in four beats), the length of the last chord will be automatically increased.'
              )}
              <br />
              {generateText(
                '下記の例では「C」と「B」がそれぞれ二分音符になっているのがわかります。',
                'In the example below, you can see that "C" and "B" are each a half note.'
              )}
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
              {generateText(
                '和音のコードネームは一般的な記法を入力することができます。',
                'Chord names for chords can be entered in common notation.'
              )}
            </Styles.BasicText>
          </Styles.Section>
          <Styles.Section>
            <Styles.SubTitle>
              {generateText('和音表示エリア', 'Chord display area')}
            </Styles.SubTitle>
            <Styles.BasicText>
              {generateText('和音を表示します。', 'Displays chords.')}
              <br />
              {generateText(
                'タップすると和音の詳細を表示することができます。',
                'Tap to view the details of the chords.'
              )}
            </Styles.BasicText>
            <ViewArea
              isBrowser={false}
              value={`${exampleValue}`}
              beat={'4/4'}
              baseNote={{ symbol: 'C', number: 3 }}
              locale={locale}
            />
            <Styles.BasicText>
              {generateText(
                '上限を超えた小節や不正な和音はエラーになります。',
                'Measures that exceed the upper limit or incorrect chords will result in an error.'
              )}
              <br />
              {generateText(
                '同様にタップすると詳細が表示されます。',
                'Tap to view the error details.'
              )}
            </Styles.BasicText>
            <ViewArea
              isBrowser={false}
              value={'A D C D F| Invalid | C | D'}
              beat={'4/4'}
              baseNote={{ symbol: 'C', number: 3 }}
              locale={locale}
            />
          </Styles.Section>
          <Styles.Section>
            <Styles.SubTitle>
              {generateText('ダウンロードと共有', 'Downloading and Sharing')}
            </Styles.SubTitle>
            <Styles.BasicText>
              {generateText(
                '画面上部のダウンロードアイコンをクリックするとMIDI データをダウンロードできます。',
                'Click the download icon at the top of the screen to download the MIDI data.'
              )}
              (
              {
                <ActionButton isQuiet isDisabled={false} width={buttonSize} height={buttonSize}>
                  <Download width={buttonIconSize} />
                </ActionButton>
              }
              )
              <br />
              {generateText(
                '不正なデータがある場合などはクリックできません。',
                'You will not be able to click if there is invalid data, for example.'
              )}
            </Styles.BasicText>
            <Styles.BasicText>
              {generateText(
                'また、共有アイコンをクリックすると作成したデータをクリップボードにコピーすることができ、共有できます。入力した時点でエラーに関わらずクリックできます。',
                'You can also click the share icon to copy the data you have created to the clipboard for sharing. You can click on it regardless of errors as you type.'
              )}
              (
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
              {generateText(
                'コピーされたURL にアクセスすることによって入力されたデータを共有できます。',
                'You can share the input data by accessing the copied URL.'
              )}
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
              {generateText('クリップボードにコピーされたURL', 'The URL copied to the clipboard')}:
              <Styles.CodeText>{`${path}?value=A%20B%20C%20D%7CG%20D%20B%20D&beat=4/4&midiNoteNumber=3&chordSymbol=C`}</Styles.CodeText>
            </Styles.BasicText>
          </Styles.Section>
        </Styles.Main>
      </Frame>
    </PageContainer>
  )
}
