import { Provider } from '@adobe/react-spectrum'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import base from 'paths.macro'
import React from 'react'
import { generateTitle } from '../../../../test/utils'
import { Bar, Props } from '.'

const props: Omit<Props, 'onClick'> = {
  isHandle: false,
  isDarkMode: true,
  timeSignature: 4,
  barProgress: 0.7,
  chords: [
    {
      index: 1,
      width: 50,
      notes: [
        { index: 1, position: 1, isError: false },
        { index: 2, position: 30, isError: false },
      ],
    },
    {
      index: 2,
      width: 50,
      notes: [
        { index: 1, position: 1, isError: true },
        { index: 2, position: 30, isError: false },
      ],
    },
  ],
}

export default {
  title: generateTitle(base, true),
  component: Bar,
  includeStories: /.*Story$/,
} as Meta

const Template: Story<Props> = (args) => (
  <div style={{ height: '240px' }}>
    <Bar {...args} />
  </div>
)

export const DefaultStory = Template.bind({})
DefaultStory.args = props

export const DarkModeStory = (): JSX.Element => (
  <Provider colorScheme="dark">
    <div style={{ height: '240px' }}>
      <Bar {...props} onClick={action('onClick')} />
    </div>
  </Provider>
)

export const LightModeStory = (): JSX.Element => (
  <Provider colorScheme="light">
    <div style={{ height: '240px' }}>
      <Bar {...props} onClick={action('onClick')} />
    </div>
  </Provider>
)
