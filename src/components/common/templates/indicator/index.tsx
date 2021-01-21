import React from 'react'
import { Beat } from '../../../../types'
import * as utils from '../../../../utils'
import * as Styles from './styles'

export type Props = {
  currentBar: number
  currentBeat: number
  tempo: number
  beat: Beat
}

export const Indicator: React.VFC<Props> = React.memo(function Component({
  currentBar,
  currentBeat,
  tempo,
  beat,
}) {
  const barZero = React.useMemo(() => utils.addZero(currentBar, 3), [currentBar])
  const beatZero = React.useMemo(() => utils.addZero(currentBeat, 3), [currentBeat])
  const tempoZero = React.useMemo(() => utils.addZero(tempo, 3), [tempo])

  return (
    <Styles.Main>
      <Styles.Section>
        <Styles.SectionTop>
          <Styles.Zero>{barZero}</Styles.Zero>
          <Styles.Value>{currentBar}</Styles.Value>
        </Styles.SectionTop>
        <Styles.SectionBottom>
          <Styles.SectionTitle>BAR</Styles.SectionTitle>
        </Styles.SectionBottom>
      </Styles.Section>
      <Styles.Section>
        <Styles.SectionTop>
          <Styles.Zero>{beatZero}</Styles.Zero>
          <Styles.Value>{currentBeat}</Styles.Value>
        </Styles.SectionTop>
        <Styles.SectionBottom>
          <Styles.SectionTitle>BEAT</Styles.SectionTitle>
        </Styles.SectionBottom>
      </Styles.Section>
      <Styles.Section>
        <Styles.SectionTop>
          <Styles.Zero>{tempoZero}</Styles.Zero>
          <Styles.Value>{tempo}</Styles.Value>
        </Styles.SectionTop>
        <Styles.SectionBottom>
          <Styles.SectionTitle>TEMPO</Styles.SectionTitle>
        </Styles.SectionBottom>
      </Styles.Section>
      <Styles.Section>
        <Styles.SectionTop>
          <Styles.Value>{beat}</Styles.Value>
        </Styles.SectionTop>
        <Styles.SectionBottom>
          <Styles.SectionTitle>TIME</Styles.SectionTitle>
        </Styles.SectionBottom>
      </Styles.Section>
    </Styles.Main>
  )
})
