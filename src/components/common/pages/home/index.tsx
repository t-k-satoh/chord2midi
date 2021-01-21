import React from 'react'
import { DispatchToProps, StateToProps } from '../../../../containers/common/home'
import { MobileHomeContainer } from '../../../../containers/mobile/pages/home'
import { generateInitBool } from '../../../../utils/generate_init_bool'
import { Loading } from '../../templates/loading'

export type Props = DispatchToProps & StateToProps

export const Home: React.FC<Props> = React.memo(function Component({
  onLaunch,
  isBrowser,
  isLoading,
}) {
  const memoizeIsBrowser = React.useMemo(() => generateInitBool(isBrowser, true), [isBrowser])

  React.useEffect(() => {
    onLaunch()
  }, [onLaunch])

  return (
    <Loading isLoading={isLoading}>{memoizeIsBrowser ? <></> : <MobileHomeContainer />}</Loading>
  )
})
