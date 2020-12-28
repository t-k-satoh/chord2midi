import _ from 'lodash'
import { useRouter } from 'next/router'
import React from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import useDarkMode from 'use-dark-mode'
import { INIT, BEAT, CHORD_SYMBOL } from '../../../../constants'
import { actions } from '../../../../store/actions'
import { selector } from '../../../../store/selector'
import { InitialState } from '../../../../store/state/types'
import { Query } from '../../../../types'
import { Browser } from '../../../browser/pages/home'
import { MobileHome } from '../../../mobile/pages/home'
import { generateUrlQuery } from '../../utils/url_query'

export const Index: React.FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { value: isDarkMode } = useDarkMode(false)
  const state = useSelector<InitialState, InitialState>(
    (state: InitialState) => state,
    shallowEqual
  )
  const query = React.useMemo(() => generateUrlQuery(router.query), [router.query])
  const chordSymbol = React.useMemo(() => selector.chordSymbol(state), [state])
  const beat = React.useMemo(() => selector.beat(state), [state])
  const locale = React.useMemo(() => selector.locale(state), [state])
  const value = React.useMemo(() => selector.value(state), [state])
  const midiNoteNumber = React.useMemo(() => selector.midiNoteNumber(state), [state])

  const onChangeValue = React.useCallback(
    (newValue: string) => {
      dispatch(actions.value({ value: { value: newValue, from: 'app' } }))
    },
    [dispatch]
  )

  const onClickShare = React.useCallback(() => {
    const tempQuery: Partial<Query> = {}

    Object.entries({ beat, chordSymbol, midiNoteNumber, value }).forEach((entry) => {
      const key = entry[0]
      const { value } = entry[1]

      tempQuery[key] = String(value)
    })

    const qs = Object.keys(tempQuery)
      .map((key) => `${key}=${tempQuery[key]}`)
      .join('&')

    console.log(`${router.pathname}?${qs}`)
  }, [beat, chordSymbol, midiNoteNumber, router.pathname, value])

  React.useEffect(() => {
    if (BEAT.includes(query.beat) && query.beat !== undefined) {
      dispatch(actions.beat({ beat: { value: query.beat, from: 'url' } }))
    } else if (beat.from === 'init') {
      dispatch(actions.beat({ beat: { value: '4/4', from: 'launch' } }))
    }
  }, [query.beat, dispatch, beat.from])

  React.useEffect(() => {
    if (CHORD_SYMBOL.includes(query.chordSymbol) && query.chordSymbol !== undefined) {
      dispatch(actions.chordSymbol({ chordSymbol: { value: query.chordSymbol, from: 'url' } }))
    } else if (chordSymbol.from === 'init') {
      dispatch(actions.chordSymbol({ chordSymbol: { value: 'C', from: 'launch' } }))
    }
  }, [query.chordSymbol, dispatch, chordSymbol.from])

  React.useEffect(() => {
    if (_.isNumber(Number(query.midiNoteNumber)) && query.midiNoteNumber !== undefined) {
      dispatch(
        actions.midiNoteNumber({
          midiNoteNumber: { value: Number(query.midiNoteNumber), from: 'url' },
        })
      )
    } else if (midiNoteNumber.from === 'init') {
      dispatch(actions.midiNoteNumber({ midiNoteNumber: { value: 3, from: 'launch' } }))
    }
  }, [query.midiNoteNumber, dispatch, midiNoteNumber.from])

  React.useEffect(() => {
    if (query.value !== undefined) {
      dispatch(actions.value({ value: { value: query.value, from: 'url' } }))
    }
  }, [query.value, dispatch])

  return (
    <>
      {isBrowser ? (
        <Browser />
      ) : (
        <MobileHome
          isDarkMode={isDarkMode}
          locale={locale}
          currentValue={value.value === INIT ? '' : value.value}
          chordSymbol={chordSymbol.value}
          beat={beat.value}
          midiNoteNumber={midiNoteNumber.value}
          onChangeValue={onChangeValue}
          onClickShare={onClickShare}
          asPath={router.asPath}
        />
      )}
    </>
  )
}
