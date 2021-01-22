import React from 'react'
import { StateToProps, DispatchToProps } from '../../../../containers/mobile/pages/home'
import { PageContainer } from '../../../../containers/mobile/templates/page'
import * as utils from '../../../../utils'
import { Indicator } from '../../../common/templates/indicator'
import { InputArea } from '../../../common/templates/input_area'
import { Player } from '../../../common/templates/player'
import { ViewArea } from '../../../common/templates/view_area'
import { Frame } from '../../templates/frame'
import * as Styles from './styles'

export type Props = StateToProps & DispatchToProps

export const MobileHome: React.FC<Props> = React.memo(function Component({
  value,
  chordSymbol,
  beat,
  midiNoteNumber,
  locale,
  onChangeValue,
}) {
  const requestRef = React.useRef<number | null>(null)

  const [isSetLoop, setIsSetLoop] = React.useState<boolean>(false)
  const [isPlay, setIsPlay] = React.useState<boolean>(false)
  const [isEnd, setIsEnd] = React.useState<boolean>(false)

  const [barPosition, setBarPosition] = React.useState<number>(0)
  const [currentBar, setCurrentBar] = React.useState<number>(0)
  const [currentBeat, setCurrentBeat] = React.useState<number>(0)
  const [tempo, setTempo] = React.useState<number>(120)

  const pickedValues = React.useMemo(
    () => utils.pickValues({ value, chordSymbol, beat, midiNoteNumber }),
    [value, chordSymbol, beat, midiNoteNumber]
  )
  const newValues = React.useMemo(() => utils.convertExcludeObject({ ...pickedValues, locale }), [
    pickedValues,
    locale,
  ])
  const { hasInit } = React.useMemo(() => utils.checkInit(pickedValues), [pickedValues])
  const { notes, bars, chords, data } = React.useMemo(() => utils.makeAllData(newValues), [
    newValues,
  ])
  const isError = React.useMemo(
    () =>
      notes.some(({ isError }) => isError) ||
      chords.some(({ isError }) => isError) ||
      bars.some(({ isError }) => isError),
    [chords, notes, bars]
  )
  const canControl = React.useMemo(
    () => !isError && notes.length !== 0 && chords.length !== 0 && bars.length !== 0,
    [chords, notes, bars, isError]
  )
  const beatRate = React.useMemo(() => 60000 / tempo, [tempo])
  const { molecular } = React.useMemo(() => utils.beatToFraction(newValues.beat), [newValues.beat])

  const handlerChangeValue = React.useCallback(
    (value: string) => {
      onChangeValue(value)
    },
    [onChangeValue]
  )

  const onPause = React.useCallback(() => {
    setIsPlay(false)
    cancelAnimationFrame(requestRef.current || 0)
  }, [requestRef])

  const onPlay = React.useCallback(() => {
    setIsPlay(true)

    const baseTime = Math.floor(performance.now())
    const countBar = (now: number): void => {
      const count = currentBeat + (now - baseTime) / beatRate + 1
      const isOver = count > bars.length * molecular + 1

      if (isOver) {
        setIsEnd(true)
        return
      }

      setBarPosition(count)

      requestRef.current = requestAnimationFrame(countBar)
    }

    requestRef.current = requestAnimationFrame(countBar)
  }, [beatRate, bars.length, molecular, currentBeat])

  const onRewind = React.useCallback(() => {
    setBarPosition(0)
  }, [])

  const onSetLoop = React.useCallback(() => {
    setIsSetLoop(!isSetLoop)
  }, [isSetLoop])

  React.useEffect(() => {
    return cancelAnimationFrame(requestRef.current || 0)
  }, [])

  React.useEffect(() => {
    const newBeat = Math.floor(barPosition)
    const newBar = Math.floor(newBeat / molecular - 1 / molecular + 1)
    const isStart = newBeat === 0 && newBar === 0

    setCurrentBeat(newBeat)
    setCurrentBar(newBar)

    if (isStart) {
      setIsEnd(false)
    }
  }, [barPosition, beatRate, bars.length, isSetLoop, molecular, onPlay, onPause])

  React.useEffect(() => {
    const shouldLoop = isEnd && isSetLoop

    if (shouldLoop) {
      console.log('loop')
      return
    }

    onPause()
  }, [isEnd, isSetLoop, onPause])

  React.useEffect(() => {
    const playData = data.filter(
      ({ barIndex, chordIndex }) =>
        barIndex + 1 === currentBar && chordIndex + 1 === currentBeat - (currentBar - 1) * molecular
    )

    console.log({ playData })
  }, [currentBeat, currentBar, data, molecular])

  if (hasInit) {
    return null
  }

  return (
    <PageContainer>
      <Frame>
        <Styles.PlayerArea>
          <Indicator
            beat={beat.value}
            currentBar={currentBar}
            currentBeat={currentBeat}
            tempo={tempo}
          />
        </Styles.PlayerArea>
        <Styles.ViewArea>
          <ViewArea
            value={newValues.value}
            beat={newValues.beat}
            chordSymbol={newValues.chordSymbol}
            midiNoteNumber={newValues.midiNoteNumber}
            barPosition={barPosition}
            currentBar={currentBar}
            isBrowser={false}
            locale={newValues.locale}
          />
        </Styles.ViewArea>
        <Styles.ControlArea>
          <Styles.Player>
            <Player
              onPlay={onPlay}
              onPause={onPause}
              onRewind={onRewind}
              onSetLoop={onSetLoop}
              isPlay={isPlay}
              isSetLoop={isSetLoop}
              canPlay={canControl && !isEnd}
              canPause={canControl}
              canRewind={canControl && currentBar !== 0 && currentBeat !== 0}
              canSetLoop={canControl}
            />
          </Styles.Player>
          <Styles.InputArea>
            <InputArea
              onChangeValue={handlerChangeValue}
              value={newValues.value}
              isError={isError}
              canInput={!isPlay}
            />
          </Styles.InputArea>
        </Styles.ControlArea>
      </Frame>
    </PageContainer>
  )
})
