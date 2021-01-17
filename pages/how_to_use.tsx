import { Provider, defaultTheme } from '@adobe/react-spectrum'
import { NextPage, GetStaticPropsContext } from 'next'
import React from 'react'
import { ComponentProps } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Store } from 'redux'
import { HowToUseContainer } from '../src/containers/common/how_to_use'
import { wrapper } from '../src/store'
import { actions } from '../src/store/actions'
import { ActionTypes } from '../src/store/actions'
import { State } from '../src/store/state/types'
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
    <Provider theme={defaultTheme} colorScheme={colorScheme}>
      <GlobalStyle S_isNightMode={isDarkMode.value} />
      <HowToUseContainer />
    </Provider>
  )
}

export default Page
