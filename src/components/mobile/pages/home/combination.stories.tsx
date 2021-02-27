import { Provider } from '@adobe/react-spectrum'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import combinate from 'combinate'
import base from 'paths.macro'
import { Combination } from '../../../../test/components/combination'
import { WithProvider } from '../../../../test/components/with-provider'
import { generateTitle } from '../../../../test/utils'
import { MobileHome, Props } from '.'

type CombinationType<P extends Record<string | number, unknown>, U = { [K in keyof P]: P[K][] }> = U

const options: CombinationType<Props> = {
  isDarkMode: [true, false],
  value: [
    'C',
    'C#/D6 | C C/F A | E/F A B | A B C/D | A B | A B C | A | A B C D',
    'C# | Error | C Error',
  ],
  beat: ['4/4', '3/4'],
  midiNoteNumber: [3],
  chordSymbol: ['C'],
  bpm: [120, 200],
  locale: ['ja'],
  onChangeValue: [action('onChangeValue')],
}

const combinations = combinate(options)

const stories = storiesOf(generateTitle(base, false), module)

combinations.forEach((combinationProps, index) =>
  stories
    .add(`light-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="light">
          <WithProvider>
            <MobileHome {...combinationProps} />
          </WithProvider>
        </Provider>
      </Combination>
    ))
    .add(`dark-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="dark">
          <WithProvider>
            <MobileHome {...combinationProps} />
          </WithProvider>
        </Provider>
      </Combination>
    ))
)
