import React from 'react'

type UsePrevious = <T>(value: T) => T

export const usePrevious: UsePrevious = (value) => {
  const ref = React.useRef<typeof value | null>(null)

  React.useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

type UseBeatCounter = (arg: {
  bpm: number
}) => {
  highAccuracyBeatCount: number
  beatCount: number
  duration: number
  onPlay: () => void
  onPause: () => void
  onRewind: () => void
}

export const useBeatCounter: UseBeatCounter = ({ bpm }) => {
  const requestRef = React.useRef<number | null>(null)

  const [now, setNow] = React.useState<number>(0)
  const [baseTime, setBaseTime] = React.useState<number>(0)
  const [duration, setDuration] = React.useState<number>(0)
  const [beatEngrave, setBeatEngrave] = React.useState<number>(0)
  const [engraves, setEngraves] = React.useState<number[]>([])

  const prevBeatEngrave = usePrevious(beatEngrave)

  const beatRate = React.useMemo(() => 60000 / bpm, [bpm])
  const beatCount = React.useMemo(() => Math.floor((baseTime + duration) / beatRate), [
    beatRate,
    duration,
    baseTime,
  ])

  const isSuccessBeatDuration = React.useCallback(
    (engrave) => engrave > beatRate - 20 && engrave < beatRate + 20,
    [beatRate]
  )

  const counter = React.useCallback(() => {
    setNow(Math.floor(performance.now()))

    requestRef.current = requestAnimationFrame(counter)
  }, [])

  const onPlay = React.useCallback(() => {
    setBaseTime(Math.floor(performance.now()))

    requestRef.current = requestAnimationFrame(counter)
  }, [counter])

  const onPause = React.useCallback(() => {
    setBeatEngrave(0)
    setDuration(0)
    setEngraves([])
    cancelAnimationFrame(requestRef.current || 0)
  }, [])

  const onRewind = React.useCallback(() => {
    setBaseTime(Math.floor(performance.now()))
    setBeatEngrave(0)
    setDuration(0)
    setEngraves([])
  }, [])

  React.useEffect(() => {
    const newDuration = now - baseTime

    if (newDuration > 0) {
      setDuration(newDuration)
      return
    }
  }, [now, baseTime])

  React.useEffect(() => {
    setBeatEngrave(Math.floor(performance.now()))
  }, [beatCount])

  React.useEffect(() => {
    const diff = beatEngrave - prevBeatEngrave

    if (diff > 0) {
      setEngraves((current) =>
        [...current, diff].filter((engrave) => isSuccessBeatDuration(engrave))
      )
    }
  }, [beatEngrave, prevBeatEngrave, duration, isSuccessBeatDuration])

  return {
    highAccuracyBeatCount: engraves.length,
    beatCount: Math.floor(duration / beatRate),
    duration,
    onPlay,
    onPause,
    onRewind,
  }
}
