import { STATE } from './constants'

const STATE_VALUES = Object.values(STATE)

export type State = typeof STATE_VALUES[number]

export type UseBeatCounter = (arg: {
  bpm: number
  timeSignature: number
  threshold?: number
}) => {
  beatCount: number
  beatCountProgress: number
  beatIndex: number
  state: State
  onPlay: () => void
  onPause: () => void
  onRewind: () => void
}
