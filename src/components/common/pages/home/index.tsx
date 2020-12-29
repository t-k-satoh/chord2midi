import React from 'react'
import { DispatchToProps, StateToProps } from '../../../../containers/common/home'
import { MobileHomeContainer } from '../../../../containers/mobile/pages/home'

export const Home: React.FC<DispatchToProps & StateToProps> = ({ onLaunch, isBrowser }) => {
  const memoizeIsBrowser = React.useMemo(() => isBrowser, [isBrowser])

  React.useEffect(() => {
    onLaunch()
  }, [onLaunch])

  return memoizeIsBrowser ? <p>pc</p> : <MobileHomeContainer />
}
