import { NextPage, GetStaticPropsContext } from 'next'
import { Store } from 'redux'
import useDarkMode from 'use-dark-mode'
import { Index } from '../src/components/common/pages/index'
import { actions } from '../src/store/actions'
import { ActionTypes } from '../src/store/actions'
import { InitialState } from '../src/store/state/types'
import { wrapper } from '../src/store/store'
import { GlobalStyle } from '../src/styles/global_styles'
import { Locale } from '../src/types'

export const getStaticProps = wrapper.getStaticProps((ctx) => {
  const newCtx = ctx as GetStaticPropsContext & { store: Store<InitialState, ActionTypes> }
  const locale = newCtx.locale as Locale

  newCtx.store.dispatch(actions.locale({ locale }))
})

const Page: NextPage = () => {
  const { value } = useDarkMode(false)

  return (
    <>
      <GlobalStyle S_isNightMode={value} />
      <Index />
    </>
  )
}

export default Page
