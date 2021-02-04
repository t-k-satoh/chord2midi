import React from 'react'
import { usePrevious } from 'react-use'
import { MINUTES_MS, BASE_THRESHOLD, STATE } from './constants'
import { UseBeatCounter, State } from './types'

export const useBeatCounter: UseBeatCounter = ({ bpm, timeSignature, threshold }) => {
  const requestRef = React.useRef<number | null>(null)

  const [state, setState] = React.useState<State>(STATE.INITIAL)
  const [now, setNow] = React.useState<number>(0)
  const [baseTime, setBaseTime] = React.useState<number>(0)
  const [duration, setDuration] = React.useState<number>(0)

  const [beatBetweenDuration, setBeatBetweenDuration] = React.useState<number>(0)
  const [beatBetweenBaseTime, setBeatBetweenBaseTime] = React.useState<number>(0)

  const [fourBeatCountTime, setFourBeatCountTime] = React.useState<number>(0)
  const [stackFourBeatCountTime, setStackFourBeatCountTime] = React.useState<number[]>([])

  const newThreshold = React.useMemo(() => threshold ?? BASE_THRESHOLD, [threshold])
  const beatRate = React.useMemo(() => MINUTES_MS / bpm, [bpm])
  const beatCount: number = React.useMemo(() => stackFourBeatCountTime.length, [
    stackFourBeatCountTime.length,
  ])
  const beatCountProgress: number = React.useMemo(() => {
    const tempDuration = (beatBetweenDuration - beatBetweenBaseTime) / beatRate

    return tempDuration < 0 || tempDuration > 1 || beatCount === 0 ? 0 : tempDuration
  }, [beatBetweenDuration, beatBetweenBaseTime, beatRate, beatCount])
  const beatCountTime = React.useMemo(() => Math.floor((baseTime + duration) / beatRate), [
    beatRate,
    duration,
    baseTime,
  ])
  const beatIndex: number = React.useMemo(
    () =>
      beatCount === 0 ? 0 : beatCount - Math.floor((beatCount - 1) / timeSignature) * timeSignature,
    [timeSignature, beatCount]
  )

  const prevFourBeatCountTime = usePrevious(fourBeatCountTime)
  const prevBeatCount = usePrevious(beatCount)

  const currentBeatCountDiff = React.useMemo(() => fourBeatCountTime - prevFourBeatCountTime, [
    fourBeatCountTime,
    prevFourBeatCountTime,
  ])
  const isSuccessBeatDuration = React.useMemo(
    () =>
      currentBeatCountDiff > beatRate - newThreshold &&
      currentBeatCountDiff < beatRate + newThreshold,
    [beatRate, newThreshold, currentBeatCountDiff]
  )

  const counter = React.useCallback(() => {
    const tempNow = Math.floor(performance.now())

    setNow(tempNow)
    setBeatBetweenDuration(tempNow)

    requestRef.current = requestAnimationFrame(counter)
  }, [])

  const onReset = React.useCallback(() => {
    setFourBeatCountTime(0)
    setDuration(0)
    setStackFourBeatCountTime([])
  }, [])

  const onPlay = React.useCallback(() => {
    setBaseTime(Math.floor(performance.now()))
    setState(STATE.IDLING)

    requestRef.current = requestAnimationFrame(counter)
  }, [counter])

  const onPause = React.useCallback(() => {
    onReset()
    setState(STATE.STOP)

    cancelAnimationFrame(requestRef.current || 0)
  }, [onReset])

  const onRewind = React.useCallback(() => {
    setBaseTime(Math.floor(performance.now()))
    if (state !== STATE.STOP) {
      setState(STATE.IDLING)
    }

    onReset()
  }, [onReset, state])

  React.useEffect(() => {
    if (now - baseTime > 0) {
      setDuration(now - baseTime)
    }
  }, [now, baseTime])

  React.useEffect(() => {
    setFourBeatCountTime(Math.floor(performance.now()))
  }, [beatCountTime])

  React.useEffect(() => {
    if (currentBeatCountDiff > 0 && isSuccessBeatDuration) {
      setStackFourBeatCountTime((current) => [...current, currentBeatCountDiff])
    }
  }, [currentBeatCountDiff, isSuccessBeatDuration])

  React.useEffect(() => {
    if (beatCount - prevBeatCount === 1) {
      setBeatBetweenDuration(0)
      setBeatBetweenBaseTime(Math.floor(performance.now()))
    }
  }, [beatCount, prevBeatCount])

  React.useEffect(() => {
    if (beatCount >= 1) {
      setState(STATE.RUN)
    }
  }, [beatCount])

  React.useEffect(() => {
    return cancelAnimationFrame(requestRef.current || 0)
  }, [])

  return {
    beatCount,
    beatCountProgress,
    beatIndex,
    state,
    onPlay,
    onPause,
    onRewind,
  }
}
