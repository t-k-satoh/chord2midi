import { Provider } from '@adobe/react-spectrum'
import { Meta, Story } from '@storybook/react/types-6-0'
import base from 'paths.macro'
import React from 'react'
import { generateTitle } from '../../../../test/utils'
import { NoteError } from '.'

export default {
  title: generateTitle(base, true),
  component: NoteError,
  includeStories: /.*Story$/,
} as Meta

const Template: Story = (args) => (
  <div style={{ height: '240px' }}>
    <NoteError {...args} />
  </div>
)

export const DefaultStory = Template.bind({})
DefaultStory.args = {}

export const DarkModeStory = (): JSX.Element => (
  <Provider colorScheme="dark">
    <div style={{ height: '240px' }}>
      <NoteError />
    </div>
  </Provider>
)

export const LightModeStory = (): JSX.Element => (
  <Provider colorScheme="light">
    <div style={{ height: '240px' }}>
      <NoteError />
    </div>
  </Provider>
)
