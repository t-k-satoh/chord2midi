// import { DialogContainer, AlertDialog } from '@adobe/react-spectrum'
import React from 'react'
import { ChordSymbol, Beat, MIDINoteNumber } from '../../../../types'
import { Data, Note, Bar, Chord } from '../../../../types'
import { InputArea } from '../../../common/templates/input_area'
import { ViewArea } from '../../../common/templates/view_area'
import { makeAllData } from '../../../common/utils/data'
import { saveMIDIFile } from '../../../common/utils/save_as'
import { Frame } from '../../templates/frame'
import { Page } from '../../templates/page'
import * as Styles from './styles'

export type Props = {
  isDarkMode: boolean
  currentValue: string
  locale: string
  asPath: string
  chordSymbol: ChordSymbol
  beat: Beat
  midiNoteNumber: MIDINoteNumber
  onChangeValue: (value: string) => void
  onClickShare: () => void
}

export const MobileHome: React.FC<Props> = ({
  isDarkMode,
  locale,
  currentValue,
  chordSymbol,
  asPath,
  beat,
  midiNoteNumber,
  onChangeValue,
  onClickShare,
}) => {
  const [data, setData] = React.useState<Data[]>([])
  const [chords, setChords] = React.useState<Chord[]>([])
  const [notes, setNotes] = React.useState<Note[]>([])
  const [bars, setBars] = React.useState<Bar[]>([])

  const memoizeCurrentValue = React.useMemo(() => currentValue, [currentValue])
  const memoizeBeat = React.useMemo(() => beat, [beat])
  const baseNote = React.useMemo(
    () => ({
      symbol: chordSymbol,
      number: midiNoteNumber,
    }),
    [chordSymbol, midiNoteNumber]
  )
  const canShare = React.useMemo(() => bars.length !== 0, [bars])
  const isDataError = React.useMemo(
    () => notes.some(({ isError }) => isError) || data.length === 0,
    [notes, data]
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

  const onClickDownLoad = React.useCallback(() => {
    if (isDataError) {
      return
    }

    saveMIDIFile(data)
  }, [data, isDataError])

  const handlerShare = React.useCallback(() => {
    onClickShare()
  }, [onClickShare])

  React.useEffect(() => {
    const { data, notes, bars, chords } = makeAllData(memoizeCurrentValue, baseNote, memoizeBeat)

    setData(data)
    setNotes(notes)
    setChords(chords)
    setBars(bars)
  }, [memoizeCurrentValue, baseNote, memoizeBeat])

  return (
    <Page
      locale={locale}
      onClickDownLoad={onClickDownLoad}
      onClickShare={handlerShare}
      isDisabledDownLoad={isDataError}
      isDisabledShare={!canShare}
      isHome={true}
      isDarkMode={isDarkMode}
      asPath={asPath}
    >
      <Frame>
        <Styles.ViewArea>
          <ViewArea value={currentValue} baseNote={baseNote} beat={memoizeBeat} isBrowser={false} />
        </Styles.ViewArea>
        <Styles.InputArea>
          <InputArea
            onChangeValue={handlerChangeValue}
            value={memoizeCurrentValue}
            isError={isError}
          />
        </Styles.InputArea>
      </Frame>
    </Page>
  )
}
