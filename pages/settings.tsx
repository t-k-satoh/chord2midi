import { NextPage } from 'next'
import { isBrowser } from 'react-device-detect'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import useDarkMode from 'use-dark-mode'
import { Browser } from '../src/components/browser/pages/home'
import { MobileSetting } from '../src/components/mobile/pages/settings'
import { wrapper, State } from '../src/store/store'
import { GlobalStyle } from '../src/styles/global_styles'

export const getStaticProps = wrapper.getStaticProps((ctx) => {
  ctx.store.dispatch({ type: 'LOCALE', payload: 'ja' })
})

const Page: NextPage = () => {
  const dispatch = useDispatch()
  const { value } = useDarkMode(false)
  const state = useSelector<State, State>((state: State) => state, shallowEqual)

  return (
    <>
      <GlobalStyle S_isNightMode={value} />
      {isBrowser ? (
        <Browser />
      ) : (
        <MobileSetting
          locale={state.locale}
          isDarkMode={value}
          chordSymbol={state.chordSymbol}
          beat={state.beat}
          midiNoteNumber={state.midiNoteNumber}
          onChangeBaseNoteNumber={(payload) => {
            dispatch({ type: 'MIDI_NOTE_NUMBER', payload })
          }}
          onChangeBaseNoteSymbol={(payload) => {
            dispatch({ type: 'CHORD_SYMBOL', payload })
          }}
          onChangeBeat={(payload) => {
            dispatch({ type: 'BEAT', payload })
          }}
        />
      )}
    </>
  )
}

export default Page
