// import { DialogContainer, AlertDialog } from '@adobe/react-spectrum'
import React from 'react'
import { ChordSymbol, Beat, MIDINoteNumber } from '../../../../store/state/types'
import { Data, Note, Bar } from '../../../../types'
import { InputArea } from '../../../common/templates/input_area'
import { ViewArea } from '../../../common/templates/view_area'
import { makeAllData } from '../../../common/utils/data'
import { saveMIDIFile } from '../../../common/utils/save_as'
import { Frame } from '../../templates/frame'
import { Page } from '../../templates/page'
import * as Styles from './styles'

export type Props = {
  currentValue: string
  locale: string
  chordSymbol: ChordSymbol
  beat: Beat
  midiNoteNumber: MIDINoteNumber
  onChangeValue: (value: string) => void
}

export const MobileHome: React.FC<Props> = ({
  locale,
  currentValue,
  chordSymbol,
  beat,
  midiNoteNumber,
  onChangeValue,
}) => {
  const [data, setData] = React.useState<Data[]>([])
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

  const onClickShare = React.useCallback(() => {
    console.log(onClickShare)
  }, [])

  React.useEffect(() => {
    const { data, notes, bars } = makeAllData(memoizeCurrentValue, baseNote, memoizeBeat)

    setData(data)
    setNotes(notes)
    setBars(bars)
  }, [memoizeCurrentValue, baseNote, memoizeBeat])

  return (
    <Page
      locale={locale}
      onClickDownLoad={onClickDownLoad}
      onClickShare={onClickShare}
      isDisabledDownLoad={isDataError}
      isDisabledShare={!canShare}
      isHome={true}
    >
      <Frame>
        <Styles.ViewArea>
          <ViewArea value={currentValue} baseNote={baseNote} beat={memoizeBeat} />
        </Styles.ViewArea>
        <Styles.InputArea>
          <InputArea onChangeValue={handlerChangeValue} value={memoizeCurrentValue} />
        </Styles.InputArea>
      </Frame>
    </Page>
  )
}
