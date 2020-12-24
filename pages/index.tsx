import { NextPage } from 'next'
import { isBrowser } from 'react-device-detect'
import { useSelector, shallowEqual } from 'react-redux'
import useDarkMode from 'use-dark-mode'
import { Browser } from '../src/components/browser/pages/home'
import { MobileHome } from '../src/components/mobile/pages/home'
import { wrapper, State } from '../src/store/store'
import { GlobalStyle } from '../src/styles/global_styles'

export const getStaticProps = wrapper.getStaticProps((ctx) => {
  ctx.store.dispatch({ type: 'LOCALE', payload: 'ja' })
})

const Page: NextPage = () => {
  const { value } = useDarkMode(false)
  const state = useSelector<State, State>((state: State) => state, shallowEqual)

  return (
    <>
      <GlobalStyle S_isNightMode={value} />
      {isBrowser ? (
        <Browser />
      ) : (
        <MobileHome
          isDarkMode={value}
          locale={state.locale}
          currentValue={'D'}
          chordSymbol={state.chordSymbol}
          beat={state.beat}
          midiNoteNumber={state.midiNoteNumber}
          onChangeValue={() => {
            console.log()
          }}
        />
      )}
    </>
  )
}

export default Page
