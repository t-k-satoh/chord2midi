import { Provider, defaultTheme } from '@adobe/react-spectrum'
import { NextPage, GetStaticPropsContext } from 'next'
import React from 'react'
import { ComponentProps } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Store } from 'redux'
import { version } from '../package.json'
import { Head } from '../src/components/common/utils/head'
import { I18N } from '../src/constants/i18n'
import { HowToUseContainer } from '../src/containers/common/how_to_use'
import { wrapper } from '../src/store'
import { actions } from '../src/store/actions'
import { ActionTypes } from '../src/store/actions'
import { State } from '../src/store/state/types'
import { GlobalStyle } from '../src/styles/global_styles'
import { Locale } from '../src/types'
import * as utils from '../src/utils'

export const getStaticProps = wrapper.getStaticProps((ctx) => {
  const newCtx = ctx as GetStaticPropsContext & { store: Store<State, ActionTypes> }
  const locale = newCtx.locale as Locale

  newCtx.store.dispatch(actions.locale({ locale }))
})

const Page: NextPage = () => {
  const { isDarkMode, locale } = useSelector<State, State>((state: State) => state, shallowEqual)

  const pickedValue = React.useMemo(() => utils.pickValues({ isDarkMode }), [isDarkMode])
  const newProps = React.useMemo(() => utils.convertExcludeObject({ ...pickedValue, locale }), [
    pickedValue,
    locale,
  ])
  const { hasInit } = React.useMemo(() => utils.checkInit({ ...pickedValue, locale }), [
    pickedValue,
    locale,
  ])
  const colorScheme: ComponentProps<typeof Provider>['colorScheme'] = React.useMemo(
    () => (isDarkMode.value ? 'dark' : 'light'),
    [isDarkMode]
  )

  if (hasInit) {
    return null
  }

  return (
    <>
      <Head
        title={`Chord to MIDI v.${version} - ${utils.switchLangText(
          I18N.HOW_TO_USE.TITLE,
          newProps.locale,
          null
        )}`}
      />
      <Provider theme={defaultTheme} colorScheme={colorScheme}>
        <GlobalStyle S_isNightMode={newProps.isDarkMode} />
        <HowToUseContainer />
      </Provider>
    </>
  )
}

export default Page
