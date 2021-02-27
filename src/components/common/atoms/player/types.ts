export interface Props {
  isPlay: boolean
  isSetLoop: boolean
  canPlay: boolean
  canSetLoop: boolean
  canRewind: boolean
  canPause: boolean
  onRewind: () => void
  onPlay: () => void
  onPause: () => void
  onSetLoop: () => void
}
