import { Provider } from '@adobe/react-spectrum'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import combinate from 'combinate'
import base from 'paths.macro'
import { Combination } from '../../../../test/components/combination'
import { generateTitle } from '../../../../test/utils'
import { Player, Props } from '.'

type CombinationType<P extends Record<string | number, unknown>, U = { [K in keyof P]: P[K][] }> = U

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

combinations.forEach((combinationProps) =>
  stories
    .add(`light-${JSON.stringify(combinationProps)}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="light">
          <Player {...combinationProps} />
        </Provider>
      </Combination>
    ))
    .add(`dark-${JSON.stringify(combinationProps)}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="dark">
          <Player {...combinationProps} />
        </Provider>
      </Combination>
    ))
)
