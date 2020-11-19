import { SSRProvider, Provider, defaultTheme } from '@adobe/react-spectrum'
import { Reset } from 'styled-reset'

function MyApp({ Component, pageProps }) {
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
