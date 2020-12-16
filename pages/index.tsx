import { GetStaticProps, NextPage } from 'next'
import { isBrowser } from 'react-device-detect'
import useDarkMode from 'use-dark-mode'
import { Browser } from '../src/components/browser/pages/home'
import { MobileHome } from '../src/components/mobile/pages/home'
import { GlobalStyle } from '../styles/global_styles'

type Props = {
  locale: string
}

type Params = {
  value: string
  symbol: string
  number: string
  beat: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const { locale } = context

  return {
    props: {
      locale,
    },
  }
}

export const Page: NextPage<Props> = ({ locale }) => {
  const { value } = useDarkMode(false)
  return (
    <>
      <GlobalStyle S_isNightMode={value} />
      {isBrowser ? <Browser /> : <MobileHome locale={locale} />}
    </>
  )
}

export default Page
