import { NextPage } from 'next'
import React from 'react'
import { InputArea } from '../../components/input_area'
import * as Styles from './styles'

export const Home: NextPage = () => {
  return (
    <Styles.Main>
      <Styles.Area>
        <InputArea />
      </Styles.Area>
      <Styles.Area>right</Styles.Area>
    </Styles.Main>
  )
}
