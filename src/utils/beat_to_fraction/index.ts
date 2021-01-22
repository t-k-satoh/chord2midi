import { Beat, ExcludeInit } from '../../types'

export const beatToFraction = (
  beat: ExcludeInit<Beat>
): {
  molecular: number
  denominator: number
} => ({
  molecular: Number(beat.split('/')[0]),
  denominator: Number(beat.split('/')[1]),
})
