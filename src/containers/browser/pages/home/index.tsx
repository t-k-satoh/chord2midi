import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { BrowserHome } from '../../../../components/browser/pages/home'
import { FROM } from '../../../../constants'
import * as operators from '../../../../store/operators'
import { utilitySelector } from '../../../../store/selector'
import { State } from '../../../../store/state/types'
import { PickValue } from '../../../../types'

export type DispatchToProps = {
  onChangeValue: (value: PickValue<State['value']>) => void
}

export type StateToProps = Pick<State, 'version' | 'isDarkMode'>

export const BrowserHomeContainer = (): JSX.Element => {
  const dispatch = useDispatch()
  const stateToProps = useSelector<State, StateToProps>(
    (state: State) => utilitySelector(state, ['version', 'isDarkMode']),
    shallowEqual
  )
  const onChangeValue: DispatchToProps['onChangeValue'] = React.useCallback(
    (value) => {
      dispatch(operators.changeValue({ value: { value, from: FROM.APP } }))
    },
    [dispatch]
  )

  const dispatchToProps: DispatchToProps = React.useMemo(
    () => ({
      onChangeValue,
    }),
    [onChangeValue]
  )

  return <BrowserHome {...stateToProps} />
}
