import { Note as tonalNote } from '@tonaljs/tonal'
import React from 'react'
import { isBrowser } from 'react-device-detect'
import { ChordSymbol, Beat, MIDINoteNumber } from '../../../../store/state/types'
import { makeAllData } from '../../utils/data'
import * as Styles from './styles'
import { makeViewData } from './utils'

export type Props = {
  value: string
  beat: Beat
  baseNote: {
    symbol: ChordSymbol
    number: MIDINoteNumber
  }
}

export const ViewArea: React.FC<Props> = ({ value, beat, baseNote }) => {
  const allData = React.useMemo(() => makeAllData(value, baseNote, beat), [value, baseNote, beat])
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
  const parsedBars = React.useMemo(
    () => makeViewData(allData.bars, allData.chords, allData.notes, allData.data, baseNoteParser),
    [allData, baseNoteParser]
  )

  const onClickChord = React.useCallback(
    (index: number, isError: boolean) => () => {
      console.log(index, isError)
    },
    []
  )

  return (
    <Styles.Main>
      <Styles.Bars>
        {parsedBars.map((bar) => {
          if (bar.isError) {
            return (
              <Styles.Bar key={bar.index} beat={beatParser.denominator}>
                <Styles.ErrorBar />
              </Styles.Bar>
            )
          }

          return (
            <Styles.Bar key={bar.index} beat={beatParser.denominator}>
              {bar.targetChords.map((targetChord) => {
                return (
                  <Styles.Chord
                    key={String(bar.index + targetChord.index)}
                    duration={targetChord.chordDuration}
                    onClick={onClickChord(targetChord.index, targetChord.isNoteError)}
                  >
                    {targetChord.isNoteError ? (
                      <Styles.Error />
                    ) : (
                      <>
                        {isBrowser ?? <Styles.Symbol>{targetChord.symbol}</Styles.Symbol>}
                        {targetChord.targetNotes.map((targetNote) => {
                          if (!targetNote.targetData) {
                            return
                          }

                          return (
                            <Styles.Note
                              key={String(bar.index + targetChord.index + targetNote.index)}
                              position={targetNote.interval}
                            ></Styles.Note>
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
