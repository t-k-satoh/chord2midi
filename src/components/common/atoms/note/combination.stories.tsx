import { Provider } from '@adobe/react-spectrum'
import { storiesOf } from '@storybook/react'
import combinate from 'combinate'
import base from 'paths.macro'
import { Combination } from '../../../../test/components/combination'
import { CombinationType } from '../../../../test/types'
import { generateTitle } from '../../../../test/utils'
import { Props } from './types'
import { Note } from '.'

const options: CombinationType<Props> = {
  position: [90, 51, 49, 90, 5, 18, 96, 43, 80, 30, 78, 39, 5, 12, 86, 55, 7],
}

const combinations = combinate(options)

const stories = storiesOf(generateTitle(base, false), module)

combinations.forEach((combinationProps, index) =>
  stories
    .add(`light-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="light">
          <Note {...combinationProps} />
        </Provider>
      </Combination>
    ))
    .add(`dark-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="dark">
          <Note {...combinationProps} />
        </Provider>
      </Combination>
    ))
)
