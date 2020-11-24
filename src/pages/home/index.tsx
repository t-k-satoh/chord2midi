import { Button } from '@adobe/react-spectrum'
import { Midi } from '@tonejs/midi'
import { saveAs } from 'file-saver'
import { NextPage } from 'next'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { MainHeader } from '../../components/header'
import { InputArea } from '../../components/input_area'
import { Data, Chord } from '../../components/types'
import { ViewArea } from '../../components/view_area'
import * as Styles from './styles'

export const Home: NextPage = () => {
  const [data, setData] = React.useState<Data[]>([])
  const [chords, setChords] = React.useState<Chord[]>([])
  const [error, setError] = React.useState<{ isError: boolean; details: string }>({
    isError: false,
    details: '',
  })

  const onChangeData = React.useCallback((_data: Data[]) => {
    setData(_data)
  }, [])

  const onChangeChords = React.useCallback((_chords: Chord[]) => {
    setChords(_chords)
  }, [])

  const onError = React.useCallback((_error: typeof error) => {
    setError(_error)
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

  return (
    <Styles.Main>
      <MainHeader />
      <Styles.InputArea>
        <InputArea onChangeData={onChangeData} onChangeChords={onChangeChords} onError={onError} />
      </Styles.InputArea>
      <Styles.ViewArea>
        <ViewArea data={data} chords={chords} />
      </Styles.ViewArea>
      <Styles.ButtonArea>
        <Button
          variant={'primary'}
          isDisabled={data.length === 0 || error.isError}
          onPress={onPress}
        >
          Download
        </Button>
      </Styles.ButtonArea>
    </Styles.Main>
  )
}
