import React from 'react'
import { isBrowser } from 'react-device-detect'
import { Provider } from 'react-redux'
import { useDispatch } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import useDarkMode from 'use-dark-mode'
import { version } from '../../../../package.json'
import { FROM } from '../../../constants'
import * as operators from '../../../store/operators'
import { reducers } from '../../../store/reducer'
import { initialState } from '../../../store/state'

export const WithProvider: React.FC<{ isHome?: boolean; disabledOnLaunch?: true }> = ({
  children,
  isHome,
  disabledOnLaunch,
}) => {
  const store = createStore(reducers, initialState, applyMiddleware(thunk))

  return (
    <Provider store={store}>
      <WithLaunch {...{ isHome, disabledOnLaunch }}>{children}</WithLaunch>
    </Provider>
  )
}

export const WithLaunch: React.FC<{ isHome?: boolean; disabledOnLaunch?: true }> = ({
  children,
  isHome,
  disabledOnLaunch,
}) => {
  const dispatch = useDispatch()

  const { value: isDarkMode } = useDarkMode(false)
  const launchArg: Parameters<typeof operators.launch>[0] = React.useMemo(() => {
    return {
      query: {},
      isDarkMode: { from: FROM.LAUNCH, value: isDarkMode },
      isBrowser,
      version,
    }
  }, [isDarkMode])

  React.useEffect(() => {
    if (!disabledOnLaunch) {
      dispatch(operators.launch(launchArg))
    }

    dispatch(operators.changeIsHome({ isHome: isHome ?? false }))
    dispatch(operators.changeLocale({ locale: 'ja' }))
  }, [dispatch, launchArg, isHome, disabledOnLaunch])

  return <>{children}</>
}
