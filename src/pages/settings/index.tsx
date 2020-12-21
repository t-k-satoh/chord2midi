import { GetStaticProps, NextPage } from 'next'
import { isBrowser } from 'react-device-detect'
import { useSelector, shallowEqual } from 'react-redux'
import useDarkMode from 'use-dark-mode'
import { Browser } from '../../components/browser/pages/home'
import { MobileHome } from '../../components/mobile/pages/home'
import { State } from '../../store/state/types'
import { GlobalStyle } from '../../styles/global_styles'

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
  const state = useSelector<State, State>((state: State) => state, shallowEqual)

  console.log(state)

  return (
    <>
      <GlobalStyle S_isNightMode={value} />
      {isBrowser ? <Browser /> : <MobileHome locale={locale} />}
    </>
  )
}
