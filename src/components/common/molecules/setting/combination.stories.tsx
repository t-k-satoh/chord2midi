import { Provider } from '@adobe/react-spectrum'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import combinate from 'combinate'
import base from 'paths.macro'
import { Combination } from '../../../../test/components/combination'
import { generateTitle } from '../../../../test/utils'
import { Setting, Props } from '.'

type CombinationType<P extends Record<string | number, unknown>, U = { [K in keyof P]: P[K][] }> = U

const options: CombinationType<Props> = {
  locale: ['ja', 'en'],
  chordSymbol: ['C', 'C#'],
  beat: ['4/4', '3/4'],
  midiNoteNumber: [35],
  isDarkMode: [true, false],
  bpm: [120, 240],
  onChangeBaseNoteSymbol: [action('onChangeBaseNoteSymbol')],
  onChangeBaseNoteNumber: [action('onChangeBaseNoteNumber')],
  onChangeBeat: [action('onChangeBeat')],
  onChangeIsDarkMode: [action('onChangeIsDarkMode')],
  onChangeBPM: [action('onChangeBPM')],
  onChangeLanguage: [action('onChangeLanguage')],
}

const combinations = combinate(options)

const stories = storiesOf(generateTitle(base, false), module)

combinations.forEach((combinationProps, index) =>
  stories
    .add(`light-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="light">
          <Setting {...combinationProps} />
        </Provider>
      </Combination>
    ))
    .add(`dark-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="dark">
          <Setting {...combinationProps} />
        </Provider>
      </Combination>
    ))
)
