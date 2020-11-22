import { NextPage } from 'next'
import React from 'react'
import { MainHeader } from '../../components/header'
import { InputArea } from '../../components/input_area'
import { Data, Chord } from '../../components/types'
import { ViewArea } from '../../components/view_area'
import * as Styles from './styles'

export const Home: NextPage = () => {
  const [data, setData] = React.useState<Data[]>([])
  const [chords, setChords] = React.useState<Chord[]>([])

  const onChangeData = React.useCallback((_data: Data[]) => {
    setData(_data)
  }, [])

  const onChangeChords = React.useCallback((_chords: Chord[]) => {
    setChords(_chords)
  }, [])

  return (
    <Styles.Main>
      <MainHeader />
      <Styles.Area>
        <InputArea onChangeData={onChangeData} onChangeChords={onChangeChords} />
      </Styles.Area>
      <Styles.Area>
        <ViewArea data={data} chords={chords} />
      </Styles.Area>
    </Styles.Main>
  )
}
