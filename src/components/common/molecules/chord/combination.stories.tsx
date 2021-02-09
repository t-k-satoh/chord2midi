import { Provider } from '@adobe/react-spectrum'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import combinate from 'combinate'
import base from 'paths.macro'
import { Combination } from '../../../../test/components/combination'
import { generateTitle } from '../../../../test/utils'
import { Chord, Props } from '.'

type CombinationType<P extends Record<string | number, unknown>, U = { [K in keyof P]: P[K][] }> = U

const options: CombinationType<Props> = {
  width: [25],
  notes: [
    [
      { index: 1, position: 1 },
      { index: 2, position: 30 },
    ],
  ],
  onClick: [action('onClick')],
}

const combinations = combinate(options)

const stories = storiesOf(generateTitle(base, false), module)

combinations.forEach((combinationProps) =>
  stories
    .add(`light-${JSON.stringify(combinationProps)}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="light">
          <Chord {...combinationProps} />
        </Provider>
      </Combination>
    ))
    .add(`dark-${JSON.stringify(combinationProps)}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="dark">
          <Chord {...combinationProps} />
        </Provider>
      </Combination>
    ))
)
