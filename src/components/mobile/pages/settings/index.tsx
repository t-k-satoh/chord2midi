import React from 'react'
import { ChordSymbol, Beat, MIDINoteNumber } from '../../../../types'
import { Setting } from '../../../common/templates/settings'
import { Frame } from '../../templates/frame'
import { Page } from '../../templates/page'

export type Props = {
  locale: string
  chordSymbol: ChordSymbol
  beat: Beat
  midiNoteNumber: MIDINoteNumber
  isDarkMode: boolean
  onChangeBaseNoteSymbol: (baseNoteSymbol: ChordSymbol) => void
  onChangeBaseNoteNumber: (baseNoteNumber: MIDINoteNumber) => void
  onChangeBeat: (beat: Beat) => void
}

export const MobileSetting: React.FC<Props> = (props) => {
  return (
    <Page locale={props.locale} isDarkMode={props.isDarkMode}>
      <Frame>
        <Setting {...props} />
      </Frame>
    </Page>
  )
}
