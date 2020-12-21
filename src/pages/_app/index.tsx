import { SSRProvider, Provider, defaultTheme } from '@adobe/react-spectrum'
import { AppProps } from 'next/app'
import React, { FC } from 'react'
import { Reset } from 'styled-reset'
import { wrapper } from '../../store/store'

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Reset />
    <SSRProvider>
      <Provider theme={defaultTheme}>
        <Component {...pageProps} />
      </Provider>
    </SSRProvider>
  </>
)

export const App = wrapper.withRedux(WrappedApp)
