import { SSRProvider, Provider, defaultTheme } from '@adobe/react-spectrum'
import { Reset } from 'styled-reset'

function MyApp({ Component, pageProps }): JSX.Element {
  return (
    <>
      <Reset />
      <SSRProvider>
        <Provider theme={defaultTheme}>
          <Component {...pageProps} />
        </Provider>
      </SSRProvider>
    </>
  )
}

export default MyApp
