import React from 'react'
import { Chord } from '../chord'
import * as Styles from './styles'

export type Props = {
  isHandle: boolean
  isDarkMode: boolean
  barProgress: number
  timeSignature: number
  chords: {
    index: number
    width: number
    notes: { index: number; position: number; isError: boolean }[]
  }[]
  onClick: (index: number) => void
}

export const Bar: React.VFC<Props> = React.memo(function Component({
  isHandle,
  isDarkMode,
  timeSignature,
  barProgress,
  chords,
  onClick,
}) {
  const isError = React.useMemo(() => chords.length > timeSignature, [timeSignature, chords.length])
  const handlePosition = React.useMemo(() => `${barProgress < 0 ? 0 : barProgress}%`, [barProgress])

  const onClickChord = React.useCallback(
    (index: number) => () => {
      onClick(index)
    },
    [onClick]
  )

  return (
    <Styles.Main>
      {isHandle && <Styles.Handle style={{ left: handlePosition }} S_isDarkMode={isDarkMode} />}
      {isError ? (
        <Styles.Error />
      ) : (
        chords.map(({ notes, width, index }) => (
          <Chord key={index} width={width} notes={notes} onClick={onClickChord(index)} />
        ))
      )}
    </Styles.Main>
  )
})
