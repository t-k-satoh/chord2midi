import { useRouter } from 'next/router'
import React from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import useDarkMode from 'use-dark-mode'
import { version } from '../../../../package.json'
import { Home } from '../../../components/common/pages/home'
import { FROM } from '../../../constants'
import * as operators from '../../../store/operators'
import { State } from '../../../store/state/types'
import * as utils from '../../../utils'

export type DispatchToProps = {
  onLaunch: () => void
}

export type StateToProps = {
  isBrowser: State['isBrowser']
  isLoading: boolean
}

export const HomeContainer: React.FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const state = useSelector<State, State>((state: State) => state, shallowEqual)
  const { value: isDarkMode } = useDarkMode(false)

  const query = React.useMemo(() => utils.generateUrlQuery(router.query), [router.query])
  const { hasInit } = React.useMemo(() => utils.checkInit(state), [state])
  const launchArg: Parameters<typeof operators.launch>[0] = React.useMemo(() => {
    return {
      query,
      isDarkMode: { from: FROM.LAUNCH, value: isDarkMode },
      isBrowser,
      version,
    }
  }, [query, isDarkMode])
  const isHome = React.useMemo(() => router.pathname === '/', [router.pathname])

  const onLaunch = React.useCallback(() => {
    dispatch(operators.launch(launchArg))
    dispatch(operators.changeIsHome({ isHome }))
  }, [dispatch, launchArg, isHome])

  return <Home onLaunch={onLaunch} isLoading={hasInit} isBrowser={isBrowser} />
}
