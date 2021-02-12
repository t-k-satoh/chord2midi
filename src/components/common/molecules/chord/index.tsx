import React from 'react'
import { Note } from '../../atoms/note'
import * as Styles from './styles'

export type Props = {
  width: number
  notes: { index: number; position: number; isError: boolean }[]
  onClick: () => void
}

export const Chord: React.VFC<Props> = React.memo(function Component({ width, notes, onClick }) {
  const isError = React.useMemo(() => notes.some(({ isError }) => isError), [notes])

  const handleOnClick = React.useCallback(() => {
    onClick()
  }, [onClick])

  return (
    <Styles.Main S_width={width} onClick={handleOnClick}>
      {isError ? (
        <Styles.Error />
      ) : (
        notes.map(({ index, position }) => <Note key={index} position={position} />)
      )}
    </Styles.Main>
  )
})
