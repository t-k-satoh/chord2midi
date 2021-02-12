import { Provider } from '@adobe/react-spectrum'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import combinate from 'combinate'
import base from 'paths.macro'
import { Combination } from '../../../../test/components/combination'
import { generateTitle } from '../../../../test/utils'
import { MainHeader, Props } from '.'

type CombinationType<P extends Record<string | number, unknown>, U = { [K in keyof P]: P[K][] }> = U

const options: CombinationType<Props> = {
  version: ['v.0.1.0'],
  isHome: [true, false],
  isDarkMode: [true, false],
  isDisabledDownLoad: [true, false],
  isDisabledShare: [true, false],
  isShowNav: [true, false],
  value: ['C'],
  beat: ['4/4', '3/4'],
  midiNoteNumber: [3],
  chordSymbol: ['C'],
  bpm: [120, 200],
  onChangeIsShowNav: [action('onChangeIsShowNav')],
}

const combinations = combinate(options)

const stories = storiesOf(generateTitle(base, false), module)

combinations.forEach((combinationProps, index) =>
  stories
    .add(`light-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="light">
          <MainHeader {...combinationProps} />
        </Provider>
      </Combination>
    ))
    .add(`dark-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="dark">
          <MainHeader {...combinationProps} />
        </Provider>
      </Combination>
    ))
)
