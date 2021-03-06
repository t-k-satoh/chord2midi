import { Provider } from '@adobe/react-spectrum'
import { storiesOf } from '@storybook/react'
import combinate from 'combinate'
import base from 'paths.macro'
import { Combination } from '../../../../test/components/combination'
import { CombinationType } from '../../../../test/types'
import { generateTitle } from '../../../../test/utils'
import { Props } from './types'
import { IndicatorValue } from '.'

const options: CombinationType<Props> = {
  value: ['120', 120, 'long_long_long', 0.123, 1.0e20],
  title: ['Title', 'long_long_long'],
}

const combinations = combinate(options)

const stories = storiesOf(generateTitle(base, false), module)

combinations.forEach((combinationProps, index) =>
  stories
    .add(`light-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="light">
          <IndicatorValue {...combinationProps} />
        </Provider>
      </Combination>
    ))
    .add(`dark-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="dark">
          <IndicatorValue {...combinationProps} />
        </Provider>
      </Combination>
    ))
)
