import { Note as tonalNote } from '@tonaljs/tonal'
import React from 'react'
import { StateToProps, DispatchToProps } from '../../../../containers/mobile/pages/home/types'
import { PageContainer } from '../../../../containers/mobile/templates/page'
import * as utils from '../../../../utils'
import { Indicator } from '../../../common/templates/indicator'
import { InputArea } from '../../../common/templates/input_area'
import { Player } from '../../../common/templates/player'
import { ViewArea } from '../../../common/templates/view_area'
import { useBeatCounter } from '../../../hooks'
import { Frame } from '../../templates/frame'
import * as Styles from './styles'

export type Props = StateToProps & DispatchToProps

export const MobileHome: React.FC<Props> = React.memo(function Component({
  value,
  chordSymbol,
  beat,
  midiNoteNumber,
  bpm,
  onChangeValue,
}) {
  const [isSetLoop, setIsSetLoop] = React.useState<boolean>(false)
  const [playerBeatCount, setPlayerBeatCount] = React.useState<number>(0)

  const { molecular: timeSignature } = React.useMemo(() => utils.beatToFraction(beat), [beat])
  const { beatCount, beatCountProgress, state, onPause, onPlay, onRewind } = useBeatCounter({
    bpm,
    timeSignature,
  })
  const barCount = React.useMemo(
    () => Math.floor(playerBeatCount / timeSignature - 1 / timeSignature + 1),
    [playerBeatCount, timeSignature]
  )
  const allData = React.useMemo(
    () => utils.makeAllData({ value, chordSymbol, beat, midiNoteNumber }),
    [value, chordSymbol, beat, midiNoteNumber]
  )

  const beatLimit = React.useMemo(() => allData.bars.length * timeSignature + 1, [
    allData.bars.length,
    timeSignature,
  ])

  const currentBeatIndex = React.useMemo(() => {
    if (barCount === 0 || playerBeatCount === 0) {
      return 0
    }

    if (barCount === 1) {
      return playerBeatCount
    }

    return playerBeatCount - (barCount - 1) * timeSignature
  }, [barCount, timeSignature, playerBeatCount])

  const baseNote: number = React.useMemo(() => tonalNote.midi(`${chordSymbol}${midiNoteNumber}`), [
    chordSymbol,
    midiNoteNumber,
  ])

  const onRest = React.useCallback(() => {
    setPlayerBeatCount(0)
  }, [])

  const handleOnPause = React.useCallback(() => {
    onPause()
  }, [onPause])

  const handleOnPlay = React.useCallback(() => {
    onPlay()
  }, [onPlay])

  const handleOnRewind = React.useCallback(() => {
    onRest()
    onRewind()
  }, [onRewind, onRest])

  const handleOnSetLoop = React.useCallback(() => {
    setIsSetLoop(!isSetLoop)
  }, [isSetLoop])

  React.useEffect(() => {
    if (beatCount >= 1) {
      setPlayerBeatCount((current) => current + 1)
    }
  }, [beatCount])

  React.useEffect(() => {
    if (isSetLoop && playerBeatCount === beatLimit) {
      handleOnRewind()
      return
    }

    if (playerBeatCount === beatLimit) {
      handleOnRewind()
      handleOnPause()

      return
    }
  }, [playerBeatCount, isSetLoop, beatLimit, handleOnRewind, handleOnPause])

  return (
    <PageContainer>
      <Frame>
        <Styles.PlayerArea>
          <Indicator beat={beat} currentBar={barCount} currentBeat={playerBeatCount} bpm={bpm} />
        </Styles.PlayerArea>
        <Styles.ViewArea>
          <ViewArea
            isIdling={state === 'IDLING'}
            currentBarIndex={barCount}
            currentBeatIndex={currentBeatIndex}
            beatCountProgress={beatCountProgress}
            allData={allData}
            molecular={timeSignature}
            baseNote={baseNote}
          />
        </Styles.ViewArea>
        <Styles.ControlArea>
          <Styles.Player>
            <Player
              onPlay={handleOnPlay}
              onPause={handleOnPause}
              onRewind={handleOnRewind}
              onSetLoop={handleOnSetLoop}
              isPlay={state === 'RUN'}
              isSetLoop={isSetLoop}
              canPlay={(state === 'STOP' || state === 'INITIAL') && allData.bars.length !== 0}
              canPause={state === 'RUN'}
              canRewind={beatLimit !== 0 && playerBeatCount !== 0}
              canSetLoop={beatLimit !== 0}
            />
          </Styles.Player>
          <Styles.InputArea>
            <InputArea
              onChangeValue={onChangeValue}
              value={value}
              isError={false}
              canInput={state !== 'RUN'}
            />
          </Styles.InputArea>
        </Styles.ControlArea>
      </Frame>
    </PageContainer>
  )
})
