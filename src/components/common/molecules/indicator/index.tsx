import React from 'react'
import { Beat, ExcludeInit } from '../../../../types'
import { IndicatorValue } from '../../atoms/indicator_value'
import * as Styles from './styles'

export type Props = {
  currentBar: number
  currentBeat: number
  bpm: number
  beat: ExcludeInit<Beat>
}

export const Indicator: React.VFC<Props> = React.memo(function Component({
  currentBar,
  currentBeat,
  bpm,
  beat,
}) {
  return (
    <Styles.Main>
      <Styles.Section>
        <IndicatorValue value={currentBar} title={'BAR'} />
      </Styles.Section>
      <Styles.Section>
        <IndicatorValue value={currentBeat} title={'BEAT'} />
      </Styles.Section>
      <Styles.Section>
        <IndicatorValue value={bpm} title={'BPM'} />
      </Styles.Section>
      <Styles.Section>
        <IndicatorValue value={beat} title={'TIME'} />
      </Styles.Section>
    </Styles.Main>
  )
})
