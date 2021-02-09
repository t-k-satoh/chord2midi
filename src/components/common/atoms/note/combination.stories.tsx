import { Provider } from '@adobe/react-spectrum'
import { storiesOf } from '@storybook/react'
import combinate from 'combinate'
import base from 'paths.macro'
import { Combination } from '../../../../test/components/combination'
import { generateTitle } from '../../../../test/utils'
import { Note, Props } from '.'

type CombinationType<P extends Record<string | number, unknown>, U = { [K in keyof P]: P[K][] }> = U

const options: CombinationType<Props> = {
  position: [90, 51, 49, 90, 5, 18, 96, 43, 80, 30, 78, 39, 5, 12, 86, 55, 7],
}

const combinations = combinate(options)

const stories = storiesOf(generateTitle(base, false), module)

combinations.forEach((combinationProps) =>
  stories
    .add(`light-${JSON.stringify(combinationProps)}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="light">
          <Note {...combinationProps} />
        </Provider>
      </Combination>
    ))
    .add(`dark-${JSON.stringify(combinationProps)}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="dark">
          <Note {...combinationProps} />
        </Provider>
      </Combination>
    ))
)
