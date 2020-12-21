import { Note as tonalNote } from '@tonaljs/tonal'
import _ from 'lodash'
import React from 'react'
import { isBrowser } from 'react-device-detect'
import { Beats } from '../../constants'
import { Data, Chord, Bar, Note } from '../../types'
import * as Styles from './styles'

export type Props = {
  bars: Bar[]
  chords: Chord[]
  notes: Note[]
  data: Data[]
  beat: typeof Beats[number]
  baseNote: {
    symbol: string
    number: number
  }
}

export const ViewArea: React.FC<Props> = ({ bars, chords, notes, data, beat, baseNote }) => {
  const beatParser = React.useMemo(() => {
    return {
      molecular: Number(beat.split('/')[0]),
      denominator: Number(beat.split('/')[1]),
    }
  }, [beat])

  const baseNoteParser: number = React.useMemo(
    () => tonalNote.midi(`${baseNote.symbol}${baseNote.number}`),
    [baseNote]
  )

  const onClickChord = React.useCallback(
    (uuid: string, isError: boolean) => () => {
      console.log(uuid, isError)
    },
    []
  )

  return (
    <Styles.Main>
      <Styles.Bars>
        {bars.map((bar) => {
          const targetChords = chords.filter((chord) => chord.barUuid === bar.uuid)
          const isBarError = targetChords.some((chord) => chord.isError)

          if (isBarError) {
            return (
              <Styles.Bar key={bar.uuid} beat={beatParser.denominator}>
                <Styles.ErrorBar />
              </Styles.Bar>
            )
          }

          return (
            <Styles.Bar key={bar.uuid} beat={beatParser.denominator}>
              {targetChords.map((targetChord) => {
                const chordDuration = _.uniq(
                  data
                    .filter(({ chordUuid }) => chordUuid === targetChord.uuid)
                    .map(({ duration }) => duration)
                )
                const symbol =
                  'symbol' in targetChord
                    ? targetChord.symbol
                    : `${targetChord.configurationSymbol}/${targetChord.baseSymbol}`
                const targetNotes = notes.filter(({ chordUuid }) => chordUuid === targetChord.uuid)
                const isNoteError = targetNotes.some((note) => note.isError)

                return (
                  <Styles.Chord
                    key={targetChord.uuid}
                    duration={(chordDuration[0] / 2) * 100}
                    onClick={onClickChord(targetChord.uuid, isNoteError)}
                  >
                    {isNoteError ? (
                      <Styles.Error />
                    ) : (
                      <>
                        {isBrowser ?? <Styles.Symbol>{symbol}</Styles.Symbol>}
                        {targetNotes.map((targetNote) => {
                          const targetData = data.find(
                            ({ noteUuid }) => noteUuid === targetNote.uuid
                          )

                          if (!targetData) {
                            return
                          }

                          const interval =
                            tonalNote.midi(
                              data.find(({ noteUuid }) => noteUuid === targetNote.uuid).note
                            ) - baseNoteParser

                          return (
                            <Styles.Note key={targetNote.uuid} position={interval}></Styles.Note>
                          )
                        })}
                      </>
                    )}
                  </Styles.Chord>
                )
              })}
            </Styles.Bar>
          )
        })}
      </Styles.Bars>
    </Styles.Main>
  )
}
