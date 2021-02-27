import { Provider } from '@adobe/react-spectrum'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import combinate from 'combinate'
import base from 'paths.macro'
import { Combination } from '../../../../test/components/combination'
import { CombinationType } from '../../../../test/types'
import { generateTitle } from '../../../../test/utils'
import { Props } from './types'
import { Player } from '.'

const options: CombinationType<Props> = {
  isPlay: [true, false],
  isSetLoop: [true, false],
  canPlay: [true, false],
  canSetLoop: [true, false],
  canRewind: [true, false],
  canPause: [true, false],
  onRewind: [action('onRewind')],
  onPlay: [action('onPlay')],
  onPause: [action('onPause')],
  onSetLoop: [action('onSetLoop')],
}

const combinations = combinate(options)

const stories = storiesOf(generateTitle(base, false), module)

combinations.forEach((combinationProps, index) =>
  stories
    .add(`light-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="light">
          <Player {...combinationProps} />
        </Provider>
      </Combination>
    ))
    .add(`dark-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="dark">
          <Player {...combinationProps} />
        </Provider>
      </Combination>
    ))
)
