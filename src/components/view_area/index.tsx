import { Note } from '@tonaljs/tonal'
import _ from 'lodash'
import React from 'react'
import { Data, Chord } from '../types'
import * as Styles from './styles'

type Props = {
  data: Data[]
  chords: Chord[]
}

export const ViewArea: React.FC<Props> = ({ data, chords }) => {
  console.log(chords)
  const baseNote = Note.midi('C3')

  const allChord: {
    chord: string[]
    notes: Data[]
  }[] = React.useMemo(() => {
    return chords.map(({ chord, index }) => {
      return {
        chord,
        notes: data.filter(({ noteIndex }) => noteIndex === index),
      }
    })
  }, [data, chords])

  const symbolsList: {
    duration: number
    symbol: string
  }[][] = React.useMemo(() => {
    return chords.map(({ uuid }) => {
      const targetData = data
        .filter(({ uuid: _uuid }) => uuid === _uuid)
        .map(({ chordIndex, duration, symbol }) => {
          return { chordIndex, duration: 2 / duration, symbol }
        })

      return _.uniqBy(targetData, 'chordIndex').map(({ duration, symbol }) => ({
        duration,
        symbol,
      }))
    })
  }, [data, chords])

  return (
    <Styles.Main>
      <Styles.Bars>
        {allChord.map(({ chord, notes }, index) => {
          return (
            <Styles.Bar key={`${chord}_${index}`}>
              {symbolsList[index].map(({ symbol, duration }, index) => {
                return (
                  <Styles.Chord duration={duration} key={index}>
                    {symbol}
                  </Styles.Chord>
                )
              })}
              {notes.map(({ note, duration, time }, _index) => {
                return (
                  <Styles.Note
                    key={_index}
                    duration={2 / duration}
                    position={(Note.midi(note) - baseNote) * 4}
                    left={((time - index * 2) / 2) * 100}
                  ></Styles.Note>
                )
              })}
            </Styles.Bar>
          )
        })}
      </Styles.Bars>
    </Styles.Main>
  )
}
