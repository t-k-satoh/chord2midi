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

  return (
    <Styles.Main>
      <MainHeader />
      <Styles.InputArea>
        <InputArea onChangeData={onChangeData} onChangeChords={onChangeChords} onError={onError} />
      </Styles.InputArea>
      <Styles.ViewArea>
        <ViewArea data={data} chords={chords} />
      </Styles.ViewArea>
    </Styles.Main>
  )
}
