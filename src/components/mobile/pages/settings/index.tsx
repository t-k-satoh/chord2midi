import React from 'react'
import { StateToProps, DispatchToProps } from '../../../../containers/mobile/pages/settings'
import { PageContainer } from '../../../../containers/mobile/templates/page'
import * as utils from '../../../../utils'
import { Setting } from '../../../common/templates/settings'
import { Frame } from '../../templates/frame'

export type Props = StateToProps & DispatchToProps

export const MobileSetting: React.FC<Props> = React.memo(function Component({
  onChangeBaseNoteNumber,
  onChangeBaseNoteSymbol,
  onChangeBeat,
  onChangeIsDarkMode,
  onChangeBPM,
  locale,
  chordSymbol,
  beat,
  midiNoteNumber,
  isDarkMode,
  bpm,
}) {
  const pickedValues = React.useMemo(
    () => utils.pickValues({ chordSymbol, beat, midiNoteNumber, isDarkMode, bpm }),
    [chordSymbol, beat, midiNoteNumber, isDarkMode, bpm]
  )
  const { hasInit } = React.useMemo(() => utils.checkInit({ ...pickedValues, locale }), [
    pickedValues,
    locale,
  ])
  const newProps = React.useMemo(() => utils.convertExcludeObject({ ...pickedValues, locale }), [
    pickedValues,
    locale,
  ])
  const newIsDarkMode = React.useMemo(
    () => utils.generateInitBool(pickedValues.isDarkMode, false),
    [pickedValues.isDarkMode]
  )

  if (hasInit) {
    return null
  }

  return (
    <PageContainer>
      <Frame>
        <Setting
          onChangeBaseNoteNumber={onChangeBaseNoteNumber}
          onChangeBaseNoteSymbol={onChangeBaseNoteSymbol}
          onChangeBeat={onChangeBeat}
          onChangeIsDarkMode={onChangeIsDarkMode}
          onChangeBPM={onChangeBPM}
          locale={newProps.locale}
          chordSymbol={newProps.chordSymbol}
          beat={newProps.beat}
          midiNoteNumber={newProps.midiNoteNumber}
          isDarkMode={newIsDarkMode}
          bpm={newProps.bpm}
        />
      </Frame>
    </PageContainer>
  )
})
