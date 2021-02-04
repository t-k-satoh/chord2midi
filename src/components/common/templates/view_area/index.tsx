import React from 'react'
import * as utils from '../../../../utils'
import * as Styles from './styles'
import { makeViewData } from './utils'

export type Props = {
  isIdling: boolean
  currentBarIndex: number
  currentBeatIndex: number
  beatCountProgress: number
  allData: ReturnType<typeof utils.makeAllData>
  molecular: number
  baseNote: number
}

export const ViewArea: React.FC<Props> = React.memo(function Component({
  isIdling,
  currentBarIndex,
  currentBeatIndex,
  beatCountProgress,
  allData,
  molecular,
  baseNote,
}) {
  const parsedBars = React.useMemo(() => makeViewData({ ...allData, baseNote, molecular }), [
    allData,
    baseNote,
    molecular,
  ])

  const barProgress = React.useMemo(
    () => (beatCountProgress / molecular + (1 / molecular) * (currentBeatIndex - 1)) * 100,
    [molecular, beatCountProgress, currentBeatIndex]
  )

  const newCurrentBarIndex = React.useMemo(() => (currentBarIndex === 0 ? 1 : currentBarIndex), [
    currentBarIndex,
  ])

  return (
    <Styles.Main>
      <Styles.Bars>
        {parsedBars.map((bar) => (
          <Styles.Bar key={bar.index}>
            {bar.index + 1 === newCurrentBarIndex && (
              <Styles.Handle style={{ left: `${barProgress < 0 ? 0 : barProgress}%` }} />
            )}
            {bar.isError ? (
              <Styles.ErrorBar onClick={() => ({})} />
            ) : (
              bar.targetChords.map((targetChord) => (
                <Styles.Chord
                  key={String(bar.index + targetChord.index)}
                  S_duration={targetChord.chordDuration}
                  onClick={() => ({})}
                >
                  {targetChord.isNoteError ? (
                    <Styles.Error />
                  ) : (
                    targetChord.targetNotes.map((targetNote) => (
                      <Styles.Note
                        key={String(bar.index + targetChord.index + targetNote.index)}
                        S_position={targetNote.interval}
                        S_isIdling={isIdling}
                      />
                    ))
                  )}
                </Styles.Chord>
              ))
            )}
          </Styles.Bar>
        ))}
      </Styles.Bars>
    </Styles.Main>
  )
})
