import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle<{ S_isNightMode: boolean }>`
  body {
    background: #1e1e1e;
  }

  * {
    box-sizing: border-box;
  }
`
