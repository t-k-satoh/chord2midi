import { Button, Text } from '@adobe/react-spectrum'
import Alert from '@spectrum-icons/workflow/Alert'
import { Midi } from '@tonejs/midi'
import { saveAs } from 'file-saver'
import { NextPage } from 'next'
import Router from 'next/router'
import { useRouter } from 'next/router'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Beats } from '../../constants'
import { MainHeader } from '../../templates/header'
import { InputArea } from '../../templates/input_area'
import { ViewArea } from '../../templates/view_area'
import { Data, Chord } from '../../types'
import * as Styles from './styles'

export const Home: NextPage = () => {
  const router = useRouter()

  const newBaseNoteNumber: number = React.useMemo(() => {
    return router.query.base_note_number ? Number(router.query.base_note_number) : 4
  }, [router.query.base_note_number])
  const newBeat: typeof Beats[number] = React.useMemo(
    () =>
      Array.isArray(router.query.beat) || !router.query.beat
        ? '4/4'
        : (router.query.beat as typeof Beats[number]),
    [router.query.beat]
  )

  const [data, setData] = React.useState<Data[]>([])
  const [chords, setChords] = React.useState<Chord[]>([])
  const [error, setError] = React.useState<{ isError: boolean; details: string }>({
    isError: false,
    details: '',
  })
  const [baseNoteNumber, setBaseNoteNumber] = React.useState<number>(4)
  const [beat, setBeat] = React.useState<typeof Beats[number]>('4/4')

  React.useEffect(() => {
    setBaseNoteNumber(newBaseNoteNumber)
  }, [newBaseNoteNumber])

  React.useEffect(() => {
    setBeat(newBeat)
  }, [newBeat])

  const onChangeData = React.useCallback((_data: Data[]) => {
    setData(_data)
  }, [])

  const onChangeChords = React.useCallback((_chords: Chord[]) => {
    setChords(_chords)
  }, [])

  const onError = React.useCallback((_error: typeof error) => {
    setError(_error)
  }, [])

  const onChangeBaseNoteNumber = React.useCallback(
    (_baseNoteNumber: number) => {
      Router.push({
        pathname: '/',
        query: { base_note_number: _baseNoteNumber, beat },
      })

      setBaseNoteNumber(_baseNoteNumber)
    },
    [beat]
  )

  const onChangeBeat = React.useCallback(
    (_beat: typeof beat) => {
      Router.push({
        pathname: '/',
        query: { base_note_number: baseNoteNumber, beat: _beat },
      })

      setBeat(_beat)
    },
    [baseNoteNumber]
  )

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
      <Styles.Error isShow={error.isError}>
        <Alert color="negative" size="S" />
        <Styles.ErrorText>
          <Text>{error.details}</Text>
        </Styles.ErrorText>
      </Styles.Error>
      <MainHeader
        baseNoteNumber={baseNoteNumber}
        onChangeBaseNoteNumber={onChangeBaseNoteNumber}
        onChangeBeat={onChangeBeat}
        beat={beat}
      />
      <Styles.InputArea>
        <InputArea
          baseNoteNumber={baseNoteNumber}
          onChangeData={onChangeData}
          onChangeChords={onChangeChords}
          onError={onError}
          beat={beat}
        />
      </Styles.InputArea>
      <Styles.ViewArea>
        <ViewArea data={data} chords={chords} baseNoteNumber={baseNoteNumber} beat={beat} />
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
