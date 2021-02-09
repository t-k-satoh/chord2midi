import { Provider } from '@adobe/react-spectrum'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import base from 'paths.macro'
import React from 'react'
import { generateTitle } from '../../../../test/utils'
import { Chord, Props } from '.'

const props: Omit<Props, 'onClick'> = {
  width: 25,
  notes: [
    { index: 1, position: 1 },
    { index: 2, position: 30 },
  ],
}

export default {
  title: generateTitle(base, true),
  component: Chord,
  includeStories: /.*Story$/,
} as Meta

const Template: Story<Props> = (args) => (
  <div style={{ height: '240px' }}>
    <Chord {...args} />
  </div>
)

export const DefaultStory = Template.bind({})
DefaultStory.args = props

export const DarkModeStory = (): JSX.Element => (
  <Provider colorScheme="dark">
    <div style={{ height: '240px' }}>
      <Chord {...props} onClick={action('onClick')} />
    </div>
  </Provider>
)

export const LightModeStory = (): JSX.Element => (
  <Provider colorScheme="light">
    <div style={{ height: '240px' }}>
      <Chord {...props} onClick={action('onClick')} />
    </div>
  </Provider>
)
