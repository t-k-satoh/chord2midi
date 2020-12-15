import { Midi } from '@tonejs/midi'
import { saveAs } from 'file-saver'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { InputArea } from '../../../templates/input_area'
import { ViewArea } from '../../../templates/view_area'
import { Data, Chord, Note, Bar } from '../../../types'
import { Frame } from '../../templates/frame'
import { Page } from '../../templates/page'
import * as Styles from './styles'

type Props = {
  locale: string
}

export const MobileHome: React.FC<Props> = ({ locale }) => {
  const [data, setData] = React.useState<Data[]>([])
  const [chords, setChords] = React.useState<Chord[]>([])
  const [notes, setNotes] = React.useState<Note[]>([])
  const [bars, setBars] = React.useState<Bar[]>([])

  const isDataError = React.useMemo(
    () => notes.some(({ isError }) => isError) || data.length === 0,
    [notes, data]
  )

  const onChangeSomeData = React.useCallback(
    (args: { bars: Bar[]; chords: Chord[]; notes: Note[]; data: Data[] }) => {
      setData(args.data)
      setChords(args.chords)
      setNotes(args.notes)
      setBars(args.bars)
    },
    []
  )

  const onChangeValue = React.useCallback((_value: string) => {
    console.log(_value)
  }, [])

  const onClickDownLoad = React.useCallback(() => {
    if (isDataError) {
      return
    }

    const midi = new Midi()
    const track = midi.addTrack()

    data.forEach(({ note, time, duration }) => {
      track.addNote({ name: note, time, duration })
    })

    const blob = new Blob([midi.toArray().buffer], { type: 'audio/midi' })

    saveAs(blob, `${uuidv4()}.midi`)
  }, [data, isDataError])

  return (
    <Page locale={locale} onClickDownLoad={onClickDownLoad} isDisabledDownLoad={isDataError}>
      <Frame>
        <Styles.ViewArea>
          <ViewArea
            data={data}
            chords={chords}
            notes={notes}
            bars={bars}
            baseNote={{
              symbol: 'C',
              number: 3,
            }}
            beat={'4/4'}
          />
        </Styles.ViewArea>
        <Styles.InputArea>
          <InputArea
            onChangeSomeData={onChangeSomeData}
            baseNote={{
              symbol: 'C',
              number: 3,
            }}
            beat={'4/4'}
            onChangeValue={onChangeValue}
          />
        </Styles.InputArea>
      </Frame>
    </Page>
  )
}
