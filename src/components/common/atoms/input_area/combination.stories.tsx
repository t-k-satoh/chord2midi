import { Provider } from '@adobe/react-spectrum'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import combinate from 'combinate'
import base from 'paths.macro'
import { Combination } from '../../../../test/components/combination'
import { CombinationType } from '../../../../test/types'
import { generateTitle } from '../../../../test/utils'
import { Props } from './types'
import { InputArea } from '.'

const options: CombinationType<Props> = {
  isError: [true, false],
  canInput: [true, false],
  value: [''],
  onChangeValue: [action('onRewind')],
}

const combinations = combinate(options)

const stories = storiesOf(generateTitle(base, false), module)

combinations.forEach((combinationProps, index) =>
  stories
    .add(`light-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="light">
          <InputArea {...combinationProps} />
        </Provider>
      </Combination>
    ))
    .add(`dark-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="dark">
          <InputArea {...combinationProps} />
        </Provider>
      </Combination>
    ))
)
