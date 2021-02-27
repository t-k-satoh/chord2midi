import { Provider } from '@adobe/react-spectrum'
import { storiesOf } from '@storybook/react'
import combinate from 'combinate'
import base from 'paths.macro'
import { Combination } from '../../../../test/components/combination'
import { CombinationType } from '../../../../test/types'
import { generateTitle } from '../../../../test/utils'
import { Props } from './types'
import { Loading } from '.'

const options: CombinationType<Props> = {
  isLoading: [true, false],
  isDarkMode: [true, false],
}

const combinations = combinate(options)

const stories = storiesOf(generateTitle(base, false), module)

combinations.forEach((combinationProps, index) =>
  stories
    .add(`light-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="light">
          <Loading {...combinationProps} />
        </Provider>
      </Combination>
    ))
    .add(`dark-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="dark">
          <Loading {...combinationProps} />
        </Provider>
      </Combination>
    ))
)
