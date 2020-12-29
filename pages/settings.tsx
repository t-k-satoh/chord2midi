import { NextPage, GetStaticPropsContext } from 'next'
import { isBrowser } from 'react-device-detect'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Store } from 'redux'
import useDarkMode from 'use-dark-mode'
import { Browser } from '../src/components/browser/pages/home'
import { MobileSetting } from '../src/components/mobile/pages/settings'
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
          chordSymbol={state.chordSymbol.value}
          beat={state.beat.value}
          midiNoteNumber={state.midiNoteNumber.value}
          onChangeBaseNoteNumber={(value) => {
            dispatch(actions.midiNoteNumber({ midiNoteNumber: { value, from: 'app' } }))
          }}
          onChangeBaseNoteSymbol={(value) => {
            dispatch(actions.chordSymbol({ chordSymbol: { value, from: 'app' } }))
          }}
          onChangeBeat={(value) => {
            dispatch(actions.beat({ beat: { value, from: 'app' } }))
          }}
        />
      )}
    </>
  )
}

export default Page
