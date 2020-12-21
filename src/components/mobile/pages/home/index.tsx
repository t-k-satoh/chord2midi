// import { DialogContainer, AlertDialog } from '@adobe/react-spectrum'
import { Midi } from '@tonejs/midi'
import { saveAs } from 'file-saver'
import Cookies from 'js-cookie'
import _ from 'lodash'
import Router, { useRouter } from 'next/router'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { InputArea } from '../../../templates/input_area'
import { makeAllData } from '../../../templates/input_area/utils'
import { ViewArea } from '../../../templates/view_area'
import { Data, Chord, Note, Bar } from '../../../types'
import { Frame } from '../../templates/frame'
import { Page } from '../../templates/page'
import * as Styles from './styles'

type Props = {
  locale: string
}

export const MobileHome: React.FC<Props> = ({ locale }) => {
  const router = useRouter()

  const [data, setData] = React.useState<Data[]>([])
  const [chords, setChords] = React.useState<Chord[]>([])
  const [notes, setNotes] = React.useState<Note[]>([])
  const [bars, setBars] = React.useState<Bar[]>([])

  const value = React.useMemo(() => (_.isEmpty(router.query) ? '' : String(router.query.data)), [
    router.query,
  ])

  const canShare = React.useMemo(() => bars.length !== 0, [bars])

  const isDataError = React.useMemo(
    () => notes.some(({ isError }) => isError) || data.length === 0,
    [notes, data]
  )

  const onChangeValue = React.useCallback((value: string) => {
    Router.push({
      pathname: '/',
      query: { data: value },
    })
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

  const onClickShare = React.useCallback(() => {
    console.log(onClickShare)
  }, [])

  React.useEffect(() => {
    Cookies.set('value', value)

    const { data, notes, bars, chords } = makeAllData(
      Cookies.get('value'),
      {
        symbol: 'C',
        number: 3,
      },
      '4/4'
    )

    setData(data)
    setChords(chords)
    setNotes(notes)
    setBars(bars)
  }, [value])

  return (
    <Page
      locale={locale}
      onClickDownLoad={onClickDownLoad}
      onClickShare={onClickShare}
      isDisabledDownLoad={isDataError}
      isDisabledShare={!canShare}
    >
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
          <InputArea onChangeValue={onChangeValue} value={Cookies.get('value')} />
        </Styles.InputArea>
      </Frame>
    </Page>
  )
}
