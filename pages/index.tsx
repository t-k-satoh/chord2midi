import { Provider, defaultTheme } from '@adobe/react-spectrum'
import { NextPage, GetStaticPropsContext } from 'next'
import { ComponentProps } from 'react'
import React from 'react'
import { use100vh } from 'react-div-100vh'
import { useSelector, shallowEqual } from 'react-redux'
import { Store } from 'redux'
import { version } from '../package.json'
import { Head } from '../src/components/common/utils/head'
import { HomeContainer } from '../src/containers/common/home'
import { actions } from '../src/store/actions'
import { ActionTypes } from '../src/store/actions'
import { State } from '../src/store/state/types'
import { wrapper } from '../src/store/store'
import { GlobalStyle } from '../src/styles/global_styles'
import { Locale } from '../src/types'

export const getStaticProps = wrapper.getStaticProps((ctx) => {
  const newCtx = ctx as GetStaticPropsContext & { store: Store<State, ActionTypes> }
  const locale = newCtx.locale as Locale

  newCtx.store.dispatch(actions.locale({ locale }))
})

const Page: NextPage = () => {
  const { isDarkMode } = useSelector<State, State>((state: State) => state, shallowEqual)

  const colorScheme: ComponentProps<typeof Provider>['colorScheme'] = React.useMemo(
    () => (isDarkMode.value ? 'dark' : 'light'),
    [isDarkMode]
  )

  return (
    <>
      <Head title={`Chord to MIDI v.${version}`} />
      <Provider theme={defaultTheme} colorScheme={colorScheme}>
        <GlobalStyle S_isNightMode={isDarkMode.value} />
        <HomeContainer />
      </Provider>
    </>
  )
}

export default Page
