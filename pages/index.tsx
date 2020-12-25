import { NextPage } from 'next'
import useDarkMode from 'use-dark-mode'
import { Index } from '../src/components/common/pages/index'
import { wrapper } from '../src/store/store'
import { GlobalStyle } from '../src/styles/global_styles'

export const getStaticProps = wrapper.getStaticProps((ctx) => {
  ctx.store.dispatch({ type: 'LOCALE', payload: 'ja' })
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
