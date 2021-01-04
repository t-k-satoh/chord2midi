import { Provider as UIProvider, defaultTheme } from '@adobe/react-spectrum'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Reset } from 'styled-reset'

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

export const decorators = [
  (Story) => (
    <RouterContext.Provider
        value={{
          push: () => Promise.resolve(),
          replace: () => Promise.resolve(),
          prefetch: () => Promise.resolve(),
        }}
      >
        <UIProvider theme={defaultTheme} minHeight="100%">
          <ThemeProvider theme={theme}>
            <Reset />
            <Story />
          </ThemeProvider>
        </UIProvider>
      </RouterContext.Provider>
  ),
]
