import { Provider } from '@adobe/react-spectrum'
import { storiesOf } from '@storybook/react'
import combinate from 'combinate'
import base from 'paths.macro'
import { Combination } from '../../../../test/components/combination'
import { generateTitle } from '../../../../test/utils'
import { Loading, Props } from '.'

type CombinationType<P extends Record<string | number, unknown>, U = { [K in keyof P]: P[K][] }> = U

const options: CombinationType<Props> = {
  isLoading: [true, false],
  isDarkMode: [true, false],
}

const combinations = combinate(options)

const stories = storiesOf(generateTitle(base, false), module)

combinations.forEach((combinationProps) =>
  stories
    .add(`light-${JSON.stringify(combinationProps)}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="light">
          <Loading {...combinationProps} />
        </Provider>
      </Combination>
    ))
    .add(`dark-${JSON.stringify(combinationProps)}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="dark">
          <Loading {...combinationProps} />
        </Provider>
      </Combination>
    ))
)
