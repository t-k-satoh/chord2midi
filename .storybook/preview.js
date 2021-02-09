import { Provider as UIProvider,defaultTheme } from '@adobe/react-spectrum'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
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
  (Story) => {
    const mode = useDarkMode() ? 'dark' : 'light'

    return (
      <RouterContext.Provider
        value={{
          push: () => Promise.resolve(),
          replace: () => Promise.resolve(),
          prefetch: () => Promise.resolve(),
        }}
      >
        <UIProvider theme={defaultTheme} minHeight="100vh" colorScheme={ mode}>
          <ThemeProvider theme={theme}>
            <Reset />
            <Story />
          </ThemeProvider>
        </UIProvider>
      </RouterContext.Provider>
    )
  },
]
