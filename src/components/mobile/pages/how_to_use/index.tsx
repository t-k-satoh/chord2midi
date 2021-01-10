import { TextArea, ActionButton, TooltipTrigger, Tooltip } from '@adobe/react-spectrum'
import Download from '@spectrum-icons/workflow/Download'
import Share from '@spectrum-icons/workflow/Share'
import Image from 'next/image'
import React from 'react'
import { Title } from '../../../../components/common/molecules/title'
import { ViewArea } from '../../../../components/common/templates/view_area'
import { StateToProps } from '../../../../containers/mobile/pages/how_to_use'
import { PageContainer } from '../../../../containers/mobile/templates/page'
import { Frame } from '../../templates/frame'
import * as Styles from './styles'

export type Props = StateToProps

export const MobileHowToUse: React.FC<Props> = ({ locale }) => {
  const { protocol, port, hostname } = window.location
  const [exampleValue, setExampleValue] = React.useState<string>('')

  const buttonSize: 32 = React.useMemo(() => 32, [])
  const buttonIconSize: 20 = React.useMemo(() => 20, [])
  const path = React.useMemo(() => `${protocol}//${hostname}${port === '' ? '' : `:${port}`}/`, [
    protocol,
    port,
    hostname,
  ])

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
          <Title text={locale === 'ja' ? '使い方' : 'How to use'} />
          <Styles.Section>
            <Styles.SubTitle>和音の入力</Styles.SubTitle>
            <Styles.BasicText>
              画面下の入力ボックスに和音を入力します。
              <br />
              和音や小節以外の文字を入力するとエラーになります。
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
              小節は&quot;|&quot;で区切ります。(前後のスペースは無視されます)
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
              四拍子なら一小節に四分音符を４つ含めることができます。
              <br />
              同様に三拍子なら3つ含められます。
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
              一小節に含められる上限の四分音符から1を引いた数の和音を入力した場合(四拍子で3つの和音を入力)、最後の和音の長さが自動的に伸びます。
              <br />
              下記の例では「C」と「B」がそれぞれ二分音符になっているのがわかります。
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
              和音のコードネームは一般的な記法を入力することができます。
              <br />
              詳細は<a href={'https://en.wikipedia.org/wiki/Chord_(music)'}>ウィキペディア</a>
              を参考にしてください。
            </Styles.BasicText>
          </Styles.Section>
          <Styles.Section>
            <Styles.SubTitle>和音表示エリア</Styles.SubTitle>
            <Styles.BasicText>
              和音を表示します。 <br />
              タップすると和音の詳細を表示することができます。
            </Styles.BasicText>
            <ViewArea
              isBrowser={false}
              value={`${exampleValue}`}
              beat={'4/4'}
              baseNote={{ symbol: 'C', number: 3 }}
              locale={locale}
            />
            <Styles.BasicText>
              上限を超えた小節や不正な和音はエラーになります。
              <br />
              同様にタップすると詳細が表示されます。
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
            <Styles.SubTitle>ダウンロードと共有</Styles.SubTitle>
            <Styles.BasicText>
              画面上部の
              {
                <ActionButton isQuiet isDisabled={false} width={buttonSize} height={buttonSize}>
                  <Download width={buttonIconSize} />
                </ActionButton>
              }
              をクリックするとMIDI データをダウンロードできます。
              <br />
              不正なデータがある場合などはクリックできません。
            </Styles.BasicText>
            <Styles.BasicText>
              また
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
              をクリックすると作成したデータをクリップボードにコピーすることができ、共有できます。入力した時点でエラーに関わらずクリックできます。
              <br />
              コピーされたURL にアクセスすることによって入力されたデータを共有できます。
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
              クリップボードにコピーされたURL:
              <Styles.CodeText>{`${path}?value=A%20B%20C%20D%7CG%20D%20B%20D&beat=4/4&midiNoteNumber=3&chordSymbol=C`}</Styles.CodeText>
            </Styles.BasicText>
          </Styles.Section>
        </Styles.Main>
      </Frame>
    </PageContainer>
  )
}
