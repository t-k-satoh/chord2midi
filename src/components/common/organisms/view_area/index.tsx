import React from 'react'
import * as utils from '../../../../utils'
import { Bar } from '../../molecules/bar'
import * as Styles from './styles'
import { makeViewData } from './utils'

export type Props = {
  isIdling: boolean
  isDarkMode: boolean
  currentBarIndex: number
  currentBeatIndex: number
  beatCountProgress: number
  allData: ReturnType<typeof utils.makeAllData>
  timeSignature: number
  baseNote: number
  onClick: () => void
}

export const ViewArea: React.FC<Props> = React.memo(function Component({
  isDarkMode,
  currentBarIndex,
  currentBeatIndex,
  beatCountProgress,
  allData,
  timeSignature,
  baseNote,
}) {
  const parsedBars = React.useMemo(() => makeViewData({ ...allData, baseNote, timeSignature }), [
    allData,
    baseNote,
    timeSignature,
  ])

  const barProgress = React.useMemo(
    () => (beatCountProgress / timeSignature + (1 / timeSignature) * (currentBeatIndex - 1)) * 100,
    [timeSignature, beatCountProgress, currentBeatIndex]
  )

  const newCurrentBarIndex = React.useMemo(() => (currentBarIndex === 0 ? 1 : currentBarIndex), [
    currentBarIndex,
  ])

  return (
    <Styles.Main>
      <Styles.Bars>
        {parsedBars.map((bar) => (
          <Styles.Bar key={bar.index}>
            <Bar
              isHandle={bar.index + 1 === newCurrentBarIndex}
              isDarkMode={isDarkMode}
              barProgress={barProgress}
              timeSignature={timeSignature}
              chords={bar.targetChords}
              onClick={() => ({})}
            />
          </Styles.Bar>
        ))}
      </Styles.Bars>
    </Styles.Main>
  )
})
