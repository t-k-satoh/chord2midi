import beautify from 'json-beautify'
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import * as Styles from './styles'

type Props = {
  code: Record<string | number, unknown>
}

export const Combination: React.FC<Props> = React.memo(function Component({ children, code }) {
  const codeString = React.useMemo(() => beautify(code, null, 2, 100), [code])

  return (
    <Styles.Main>
      {children}
      <Styles.Code>
        <SyntaxHighlighter language="javascript" style={dark}>
          {codeString}
        </SyntaxHighlighter>
      </Styles.Code>
    </Styles.Main>
  )
})
