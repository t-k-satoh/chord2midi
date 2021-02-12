import _ from 'lodash'
import { Dispatch } from 'react'
import { ThunkAction } from 'redux-thunk'
import { BEAT, CHORD_SYMBOL, INIT_VALUE, FROM } from '../../../constants'
import { INIT } from '../../../constants'
import * as utils from '../../../utils'
import { ActionTypes, actions } from '../../actions'
import { State } from '../../state/types'

export const launch = (
  payload: Pick<State, 'query' | 'isDarkMode' | 'isBrowser' | 'version'> &
    Partial<Pick<State, 'isDisabledDownLoad' | 'isDisabledShare'>>
): ThunkAction<Promise<void>, State, void, ActionTypes> => async (
  dispatch: Dispatch<ActionTypes>,
  getState: () => State
) => {
  const { query, isDarkMode, isBrowser, version, isDisabledDownLoad, isDisabledShare } = payload
  const state = getState()

  dispatch(actions.query({ query }))

  if (
    query !== INIT &&
    BEAT.includes(query.beat) &&
    query.beat !== undefined &&
    state.beat.from !== FROM.URL &&
    state.beat.from !== FROM.APP
  ) {
    dispatch(actions.beat({ beat: { value: query.beat, from: FROM.URL } }))
  } else if (state.beat.from === FROM.INIT) {
    dispatch(actions.beat({ beat: { value: INIT_VALUE.beat, from: FROM.LAUNCH } }))
  }

  if (
    query !== INIT &&
    CHORD_SYMBOL.includes(query.chordSymbol) &&
    query.chordSymbol !== undefined &&
    state.chordSymbol.from !== FROM.URL &&
    state.chordSymbol.from !== FROM.APP
  ) {
    dispatch(actions.chordSymbol({ chordSymbol: { value: query.chordSymbol, from: FROM.URL } }))
  } else if (state.chordSymbol.from === FROM.INIT) {
    dispatch(
      actions.chordSymbol({ chordSymbol: { value: INIT_VALUE.chordSymbol, from: FROM.LAUNCH } })
    )
  }

  if (
    query !== INIT &&
    _.isNumber(Number(query.midiNoteNumber)) &&
    query.midiNoteNumber !== undefined &&
    state.midiNoteNumber.from !== FROM.URL &&
    state.midiNoteNumber.from !== FROM.APP
  ) {
    dispatch(
      actions.midiNoteNumber({
        midiNoteNumber: { value: Number(query.midiNoteNumber), from: FROM.URL },
      })
    )
  } else if (state.midiNoteNumber.from === FROM.INIT) {
    dispatch(
      actions.midiNoteNumber({
        midiNoteNumber: { value: INIT_VALUE.midiNoteNumber, from: FROM.LAUNCH },
      })
    )
  }

  if (
    query !== INIT &&
    query.value !== undefined &&
    state.value.from !== FROM.URL &&
    state.value.from !== FROM.APP
  ) {
    dispatch(actions.value({ value: { value: decodeURI(query.value), from: FROM.URL } }))
  } else if (state.value.from === FROM.INIT) {
    dispatch(actions.value({ value: { value: INIT_VALUE.value, from: FROM.LAUNCH } }))
  }

  if (
    query !== INIT &&
    _.isNumber(Number(query.bpm)) &&
    query.bpm !== undefined &&
    state.bpm.from !== FROM.URL &&
    state.bpm.from !== FROM.APP
  ) {
    dispatch(actions.bpm({ bpm: { value: Number(decodeURI(query.bpm)), from: FROM.URL } }))
  } else if (state.value.from === FROM.INIT) {
    dispatch(actions.bpm({ bpm: { value: INIT_VALUE.bpm, from: FROM.LAUNCH } }))
  }

  if (isDisabledDownLoad) {
    dispatch(actions.isDisabledDownLoad({ isDisabledDownLoad }))
  }

  if (isDisabledShare) {
    dispatch(actions.isDisabledShare({ isDisabledShare }))
  }

  if (typeof isDisabledDownLoad === 'undefined' && typeof isDisabledShare === 'undefined') {
    const arg = utils.pickState(getState(), ['value', 'chordSymbol', 'beat', 'midiNoteNumber'])
    const newDisabledState = utils.generateDisabledState(arg)

    dispatch(
      actions.isDisabledDownLoad({ isDisabledDownLoad: newDisabledState.isDisabledDownLoad })
    )
    dispatch(actions.isDisabledShare({ isDisabledShare: newDisabledState.isDisabledShare }))
  }

  if (state.isDarkMode.from === FROM.INIT) {
    dispatch(actions.isDarkMode({ isDarkMode }))
  }

  if (state.isShowNav === FROM.INIT) {
    dispatch(actions.isShowNav({ isShowNav: false }))
  }

  dispatch(actions.query({ query }))
  dispatch(actions.isBrowser({ isBrowser }))
  dispatch(actions.version({ version }))
}
