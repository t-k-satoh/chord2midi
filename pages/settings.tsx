import { isBrowser } from 'react-device-detect'
import useDarkMode from 'use-dark-mode'
import { Browser } from '../src/components/browser/pages/home'
import { MobileSetting } from '../src/components/mobile/pages/settings'
import { GlobalStyle } from '../styles/global_styles'

export async function getStaticProps({ locale }) {
  return {
    props: {
      locale,
    },
  }
}

function Home({ locale }) {
  const { value } = useDarkMode(false)

  return (
    <>
      <GlobalStyle S_isNightMode={value} />
      {isBrowser ? <Browser /> : <MobileSetting locale={locale} />}
    </>
  )
}

export default Home
