import { Button } from '@adobe/react-spectrum'
import { Midi } from '@tonejs/midi'
import { saveAs } from 'file-saver'
import { NextPage } from 'next'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Beats } from '../../constants'
import { MainHeader } from '../../templates/header'
import { InputArea } from '../../templates/input_area'
import { ViewArea } from '../../templates/view_area'
import { Data, Chord, Note, Bar } from '../../types'
import * as Styles from './styles'

export const Home: NextPage = () => {
  const [data, setData] = React.useState<Data[]>([])
  const [chords, setChords] = React.useState<Chord[]>([])
  const [notes, setNotes] = React.useState<Note[]>([])
  const [bars, setBars] = React.useState<Bar[]>([])
  const [baseNote, setBaseNote] = React.useState<{ symbol: string; number: number }>({
    symbol: 'C',
    number: 4,
  })
  const [beat, setBeat] = React.useState<typeof Beats[number]>('4/4')

  const onChangeBaseNote = React.useCallback((_baseNote: typeof baseNote) => {
    setBaseNote(_baseNote)
  }, [])

  const onChangeBeat = React.useCallback((_beat: typeof beat) => {
    setBeat(_beat)
  }, [])

  const onPress = React.useCallback(() => {
    const midi = new Midi()
    const track = midi.addTrack()

    data.forEach(({ note, time, duration }) => {
      track.addNote({ name: note, time, duration })
    })

    const blob = new Blob([midi.toArray().buffer], { type: 'audio/midi' })

    saveAs(blob, `${uuidv4()}.midi`)
  }, [data])

  const onChangeSomeData = React.useCallback(
    (args: { bars: Bar[]; chords: Chord[]; notes: Note[]; data: Data[] }) => {
      setData(args.data)
      setChords(args.chords)
      setNotes(args.notes)
      setBars(args.bars)
    },
    []
  )

  return (
    <Styles.Main>
      <MainHeader
        baseNote={baseNote}
        onChangeBaseNote={onChangeBaseNote}
        onChangeBeat={onChangeBeat}
        beat={beat}
      />
      <Styles.InputArea>
        <InputArea baseNote={baseNote} beat={beat} onChangeSomeData={onChangeSomeData} />
      </Styles.InputArea>
      <Styles.ViewArea>
        <ViewArea
          data={data}
          chords={chords}
          notes={notes}
          bars={bars}
          baseNote={baseNote}
          beat={beat}
        />
      </Styles.ViewArea>
      <Styles.ButtonArea>
        <Button variant={'primary'} onPress={onPress}>
          Download
        </Button>
      </Styles.ButtonArea>
    </Styles.Main>
  )
}
