import React from 'react'
import { INIT } from '../../../../constants'
import { StateToProps, DispatchToProps } from '../../../../containers/mobile/pages/home'
import { PageContainer } from '../../../../containers/mobile/templates/page'
import { Note, Bar, Chord } from '../../../../types'
import { makeAllData } from '../../../../utils/data'
import { InputArea } from '../../../common/templates/input_area'
import { ViewArea } from '../../../common/templates/view_area'
import { Frame } from '../../templates/frame'
import * as Styles from './styles'

export type Props = StateToProps & DispatchToProps

export const MobileHome: React.FC<Props> = ({
  value,
  chordSymbol,
  beat,
  midiNoteNumber,
  onChangeValue,
}) => {
  const [chords, setChords] = React.useState<Chord[]>([])
  const [notes, setNotes] = React.useState<Note[]>([])
  const [bars, setBars] = React.useState<Bar[]>([])

  const memoizeValue = React.useMemo(() => (value.value === INIT ? '' : value.value), [value.value])
  const memoizeBeat = React.useMemo(() => beat.value, [beat.value])
  const baseNote = React.useMemo(
    () => ({
      symbol: chordSymbol.value,
      number: midiNoteNumber.value,
    }),
    [chordSymbol.value, midiNoteNumber.value]
  )
  const isError = React.useMemo(
    () =>
      notes.some(({ isError }) => isError) ||
      chords.some(({ isError }) => isError) ||
      bars.some(({ isError }) => isError),
    [chords, notes, bars]
  )

  const handlerChangeValue = React.useCallback(
    (value: string) => {
      onChangeValue(value)
    },
    [onChangeValue]
  )

  React.useEffect(() => {
    const { notes, bars, chords } = makeAllData(memoizeValue, baseNote, memoizeBeat)
    setNotes(notes)
    setChords(chords)
    setBars(bars)
  }, [memoizeValue, baseNote, memoizeBeat])

  return (
    <PageContainer>
      <Frame>
        <Styles.ViewArea>
          <ViewArea value={memoizeValue} baseNote={baseNote} beat={memoizeBeat} isBrowser={false} />
        </Styles.ViewArea>
        <Styles.InputArea>
          <InputArea onChangeValue={handlerChangeValue} value={memoizeValue} isError={isError} />
        </Styles.InputArea>
      </Frame>
    </PageContainer>
  )
}
