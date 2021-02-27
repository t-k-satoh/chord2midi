import { POSITION_LIMIT } from './constants'

export const generatePosition = (position: number): number => {
  const _position = Math.floor(position)

  if (_position > POSITION_LIMIT) {
    return POSITION_LIMIT
  }
  if (_position < 0) {
    return 0
  }
  return _position
}
