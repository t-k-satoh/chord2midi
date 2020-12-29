import React from 'react'
import { PageContainer } from '../../../../containers/mobile/templates/page'
import { ChordSymbol, Beat, MIDINoteNumber } from '../../../../types'
import { Setting } from '../../../common/templates/settings'
import { Frame } from '../../templates/frame'

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
    <PageContainer>
      <Frame>
        <Setting {...props} />
      </Frame>
    </PageContainer>
  )
}
