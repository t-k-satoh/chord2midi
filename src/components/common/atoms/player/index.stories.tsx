import { Provider } from '@adobe/react-spectrum'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import base from 'paths.macro'
import React from 'react'
import { generateTitle } from '../../../../test/utils'
import { Props } from './types'
import { Player } from '.'

const props: Omit<Props, 'onRewind' | 'onPlay' | 'onPause' | 'onSetLoop'> = {
  isPlay: true,
  isSetLoop: true,
  canPlay: true,
  canSetLoop: true,
  canRewind: true,
  canPause: true,
}

export default {
  title: `${generateTitle(base, true)}`,
  component: Player,
  includeStories: /.*Story$/,
} as Meta

const Template: Story<Props> = (args) => <Player {...args} />

export const DefaultStory = Template.bind({})
DefaultStory.args = props

export const DarkModeStory = (): JSX.Element => (
  <Provider colorScheme="dark">
    <Player
      {...props}
      onRewind={action('onRewind')}
      onPlay={action('onPlay')}
      onPause={action('onPause')}
      onSetLoop={action('onSetLoop')}
    />
  </Provider>
)

export const LightModeStory = (): JSX.Element => (
  <Provider colorScheme="light">
    <Player
      {...props}
      onRewind={action('onRewind')}
      onPlay={action('onPlay')}
      onPause={action('onPause')}
      onSetLoop={action('onSetLoop')}
    />
  </Provider>
)
