import { NextPage, GetStaticPropsContext } from 'next'
import { Store } from 'redux'
import useDarkMode from 'use-dark-mode'
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
  const { value } = useDarkMode(false)

  return (
    <>
      <GlobalStyle S_isNightMode={value} />
      <HowToUseContainer />
    </>
  )
}

export default Page
