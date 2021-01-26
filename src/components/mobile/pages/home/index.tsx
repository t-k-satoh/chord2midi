import React from 'react'
import { StateToProps, DispatchToProps } from '../../../../containers/mobile/pages/home'
import { PageContainer } from '../../../../containers/mobile/templates/page'
import * as utils from '../../../../utils'
import { Indicator } from '../../../common/templates/indicator'
import { InputArea } from '../../../common/templates/input_area'
import { Player } from '../../../common/templates/player'
import { ViewArea } from '../../../common/templates/view_area'
import { Frame } from '../../templates/frame'
import { useBeatCounter } from './hooks'
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
  const [bpm, setBpm] = React.useState<number>(120)
  const [isSetLoop, setIsSetLoop] = React.useState<boolean>(false)
  const [isPlay, setIsPlay] = React.useState<boolean>(false)
  const [prevBeat, setPrevBeat] = React.useState<number>(0)

  const { highAccuracyBeatCount, duration, onPlay, onPause, onRewind } = useBeatCounter({
    bpm,
  })

  const isIdling = React.useMemo(() => highAccuracyBeatCount < 1, [highAccuracyBeatCount])
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
  const { molecular } = React.useMemo(() => utils.beatToFraction(newValues.beat), [newValues.beat])
  const isError = React.useMemo(
    () => [...chords, ...notes, ...bars].some(({ isError }) => isError),
    [chords, notes, bars]
  )
  const canControl = React.useMemo(() => !isError && [...chords, ...notes, ...bars].length !== 0, [
    chords,
    notes,
    bars,
    isError,
  ])
  const currentBeat = React.useMemo(() => (isPlay ? highAccuracyBeatCount : 0) + prevBeat, [
    highAccuracyBeatCount,
    prevBeat,
    isPlay,
  ])
  const currentBar = React.useMemo(() => Math.floor(currentBeat / molecular - 1 / molecular + 1), [
    currentBeat,
    molecular,
  ])
  const isBeatLimit = React.useMemo(() => currentBeat > bars.length * molecular, [
    currentBeat,
    bars.length,
    molecular,
  ])

  const handleOnPause = React.useCallback(() => {
    setIsPlay(false)
    setPrevBeat(currentBeat)
    onPause()
  }, [onPause, currentBeat])

  const handleOnPlay = React.useCallback(() => {
    setIsPlay(true)
    onPlay()
  }, [onPlay])

  const handleOnRewind = React.useCallback(() => {
    setPrevBeat(0)
    onRewind()
  }, [onRewind])

  const handleOnSetLoop = React.useCallback(() => {
    setIsSetLoop(!isSetLoop)
  }, [isSetLoop])

  React.useEffect(() => {
    if (isBeatLimit && isSetLoop) {
      handleOnRewind()
      return
    }

    if (isBeatLimit) {
      setPrevBeat(0)
      setIsPlay(false)
      onPause()
      return
    }
  }, [isBeatLimit, isSetLoop, handleOnRewind, onPause])

  return (
    <PageContainer>
      <Frame>
        <Styles.PlayerArea>
          <Indicator
            beat={beat.value}
            currentBar={currentBar}
            currentBeat={currentBeat}
            tempo={bpm}
          />
        </Styles.PlayerArea>
        <Styles.ViewArea>
          <ViewArea
            isLoading={isIdling && isPlay}
            value={newValues.value}
            beat={newValues.beat}
            chordSymbol={newValues.chordSymbol}
            midiNoteNumber={newValues.midiNoteNumber}
            barPosition={duration}
            currentBar={currentBar}
            isBrowser={false}
            locale={newValues.locale}
          />
        </Styles.ViewArea>
        <Styles.ControlArea>
          <Styles.Player>
            <Player
              onPlay={handleOnPlay}
              onPause={handleOnPause}
              onRewind={handleOnRewind}
              onSetLoop={handleOnSetLoop}
              isPlay={isPlay}
              isSetLoop={isSetLoop}
              canPlay={canControl && !isBeatLimit}
              canPause={canControl && isPlay}
              canRewind={canControl && currentBeat !== 0 && currentBar !== 0}
              canSetLoop={canControl}
            />
          </Styles.Player>
          <Styles.InputArea>
            <InputArea
              onChangeValue={onChangeValue}
              value={newValues.value}
              isError={isError}
              canInput={true}
            />
          </Styles.InputArea>
        </Styles.ControlArea>
      </Frame>
    </PageContainer>
  )
})
