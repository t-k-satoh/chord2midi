import React from 'react'
import { StateToProps, DispatchToProps } from '../../../../containers/mobile/pages/settings'
import { PageContainer } from '../../../../containers/mobile/templates/page'
import * as utils from '../../../../utils'
import { Setting } from '../../../common/templates/settings'
import { Frame } from '../../templates/frame'

export type Props = StateToProps & DispatchToProps

export const MobileSetting: React.FC<Props> = ({
  onChangeBaseNoteNumber,
  onChangeBaseNoteSymbol,
  onChangeBeat,
  onChangeIsDarkMode,
  locale,
  chordSymbol,
  beat,
  midiNoteNumber,
  isDarkMode,
}) => {
  return (
    <PageContainer>
      <Frame>
        <Setting
          onChangeBaseNoteNumber={onChangeBaseNoteNumber}
          onChangeBaseNoteSymbol={onChangeBaseNoteSymbol}
          onChangeBeat={onChangeBeat}
          onChangeIsDarkMode={onChangeIsDarkMode}
          locale={locale}
          chordSymbol={chordSymbol.value}
          beat={beat.value}
          midiNoteNumber={midiNoteNumber.value}
          isDarkMode={utils.generateInitBool(isDarkMode.value, false)}
        />
      </Frame>
    </PageContainer>
  )
}
