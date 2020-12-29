import { useRouter } from 'next/router'
import React from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import useDarkMode from 'use-dark-mode'
import { version } from '../../../../package.json'
import { Home } from '../../../components/common/pages/home'
import { launch } from '../../../store/operators'
import { utilitySelector } from '../../../store/selector'
import { State } from '../../../store/state/types'
import { generateUrlQuery } from '../../../utils/url_query'

export type DispatchToProps = {
  onLaunch: () => void
}

export type StateToProps = {
  isBrowser: State['isBrowser']
}

export const HomeContainer = (): JSX.Element => {
  const dispatch = useDispatch()
  const router = useRouter()
  const state = useSelector<State, State>((state: State) => state, shallowEqual)
  const { value: isDarkMode } = useDarkMode(false)
  const newQuery = React.useMemo(() => router.query, [router.query])
  const query = React.useMemo(() => generateUrlQuery(newQuery), [newQuery])
  const launchOperatorState: Pick<
    State,
    'beat' | 'chordSymbol' | 'midiNoteNumber' | 'value'
  > = React.useMemo(
    () => ({
      beat: state.beat,
      chordSymbol: state.chordSymbol,
      midiNoteNumber: state.midiNoteNumber,
      value: state.value,
    }),
    [state.beat, state.chordSymbol, state.midiNoteNumber, state.value]
  )

  const launchOperator = React.useMemo(() => launch(dispatch, launchOperatorState), [
    dispatch,
    launchOperatorState,
  ])

  const onLaunch = React.useCallback(() => {
    launchOperator(query, isDarkMode, isBrowser, version)
  }, [launchOperator, query, isDarkMode])

  const dispatchToProps: DispatchToProps = React.useMemo(
    () => ({
      onLaunch,
    }),
    [onLaunch]
  )

  const stateToProps: StateToProps = React.useMemo(
    () => utilitySelector<StateToProps>(state, ['isBrowser']),
    [state]
  )

  const props: DispatchToProps & StateToProps = React.useMemo(
    () => ({ ...dispatchToProps, ...stateToProps }),
    [dispatchToProps, stateToProps]
  )

  return <Home {...props} />
}
