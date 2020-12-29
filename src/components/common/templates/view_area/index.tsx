import { Note as tonalNote } from '@tonaljs/tonal'
import React from 'react'
import { ChordSymbol, Beat, MIDINoteNumber } from '../../../../types'
import { makeAllData } from '../../../../utils/data'
import * as Styles from './styles'
import { makeViewData } from './utils'

export type Props = {
  isBrowser: boolean
  value: string
  beat: Beat
  baseNote: {
    symbol: ChordSymbol
    number: MIDINoteNumber
  }
}

export const ViewArea: React.FC<Props> = ({ value, beat, baseNote, isBrowser }) => {
  const allData = React.useMemo(() => makeAllData(value, baseNote, beat), [value, baseNote, beat])
  const beatParser = React.useMemo(
    () => ({
      molecular: Number(beat.split('/')[0]),
      denominator: Number(beat.split('/')[1]),
    }),
    [beat]
  )
  const baseNoteParser: number = React.useMemo(
    () => tonalNote.midi(`${baseNote.symbol}${baseNote.number}`),
    [baseNote]
  )
  const parsedBars = React.useMemo(
    () =>
      makeViewData(
        allData.bars,
        allData.chords,
        allData.notes,
        allData.data,
        baseNoteParser,
        beatParser.molecular
      ),
    [allData, baseNoteParser, beatParser]
  )

  const onClickChord = React.useCallback(
    (barIndex: number, chordIndex: number) => () => {
      const target = allData.chords.find(
        (chord) => chord.barIndex === barIndex && chord.index === chordIndex
      )

      console.log(target)
    },
    [allData.chords]
  )

  return (
    <Styles.Main>
      <Styles.Bars>
        {parsedBars.map((bar) => {
          if (bar.isError) {
            return (
              <Styles.Bar key={bar.index} beat={beatParser.molecular}>
                <Styles.ErrorBar />
              </Styles.Bar>
            )
          }

          return (
            <Styles.Bar key={bar.index} beat={beatParser.molecular}>
              {bar.targetChords.map((targetChord) => (
                <Styles.Chord
                  key={String(bar.index + targetChord.index)}
                  duration={targetChord.chordDuration}
                  onClick={onClickChord(bar.index, targetChord.index)}
                >
                  {targetChord.isNoteError ? (
                    <Styles.Error />
                  ) : (
                    <>
                      {isBrowser && <Styles.Symbol>{targetChord.symbol}</Styles.Symbol>}
                      {targetChord.targetNotes.map((targetNote) => (
                        <Styles.Note
                          key={String(bar.index + targetChord.index + targetNote.index)}
                          position={targetNote.interval}
                        ></Styles.Note>
                      ))}
                    </>
                  )}
                </Styles.Chord>
              ))}
            </Styles.Bar>
          )
        })}
      </Styles.Bars>
    </Styles.Main>
  )
}
