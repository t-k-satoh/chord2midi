import { Provider } from '@adobe/react-spectrum'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import combinate from 'combinate'
import base from 'paths.macro'
import { Combination } from '../../../../test/components/combination'
import { generateTitle } from '../../../../test/utils'
import { Bar, Props } from '.'

type CombinationType<P extends Record<string | number, unknown>, U = { [K in keyof P]: P[K][] }> = U

const options: CombinationType<Props> = {
  isHandle: [false, true],
  isDarkMode: [false, true],
  timeSignature: [4, 3],
  barProgress: [30],
  chords: [
    [
      {
        index: 1,
        width: 50,
        notes: [
          { index: 1, position: 1, isError: false },
          { index: 2, position: 30, isError: false },
        ],
      },
      {
        index: 2,
        width: 50,
        notes: [
          { index: 1, position: 1, isError: true },
          { index: 2, position: 30, isError: false },
        ],
      },
    ],
    [
      {
        index: 1,
        width: 25,
        notes: [
          { index: 1, position: 1, isError: false },
          { index: 2, position: 30, isError: false },
        ],
      },
      {
        index: 2,
        width: 25,
        notes: [
          { index: 1, position: 1, isError: true },
          { index: 2, position: 30, isError: false },
        ],
      },
      {
        index: 3,
        width: 50,
        notes: [
          { index: 1, position: 1, isError: true },
          { index: 2, position: 30, isError: false },
        ],
      },
    ],
  ],
  onClick: [action('onClick')],
}

const combinations = combinate(options)

const stories = storiesOf(generateTitle(base, false), module)

combinations.forEach((combinationProps, index) =>
  stories
    .add(`light-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="light">
          <div style={{ height: '240px' }}>
            <Bar {...combinationProps} />
          </div>
        </Provider>
      </Combination>
    ))
    .add(`dark-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="dark">
          <div style={{ height: '240px' }}>
            <Bar {...combinationProps} />
          </div>
        </Provider>
      </Combination>
    ))
)
