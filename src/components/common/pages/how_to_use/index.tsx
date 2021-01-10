import React from 'react'
import { DispatchToProps, StateToProps } from '../../../../containers/common/settings'
import { MobileHowToUseContainer } from '../../../../containers/mobile/pages/how_to_use'
import { generateInitBool } from '../../../../utils/generate_init_bool'
import { Loading } from '../../templates/loading'

export type Props = DispatchToProps & StateToProps

export const HowToUse: React.FC<Props> = ({ onLaunch, isBrowser, isLoading }) => {
  const memoizeIsBrowser = React.useMemo(() => generateInitBool(isBrowser, true), [isBrowser])

  React.useEffect(() => {
    onLaunch()
  }, [onLaunch])

  return (
    <Loading isLoading={isLoading}>
      {memoizeIsBrowser ? <></> : <MobileHowToUseContainer />}
    </Loading>
  )
}
