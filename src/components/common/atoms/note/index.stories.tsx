import { Provider } from '@adobe/react-spectrum'
import { Meta, Story } from '@storybook/react/types-6-0'
import base from 'paths.macro'
import React from 'react'
import { generateTitle } from '../../../../test/utils'
import { Note, Props } from '.'

const props: Props = {
  position: 5,
}

export default {
  title: generateTitle(base, true),
  component: Note,
  includeStories: /.*Story$/,
} as Meta

const Template: Story<Props> = (args) => <Note {...args} />

export const DefaultStory = Template.bind({})
DefaultStory.args = props

export const DarkModeStory = (): JSX.Element => (
  <Provider colorScheme="dark">
    <Note {...props} />
  </Provider>
)

export const LightModeStory = (): JSX.Element => (
  <Provider colorScheme="light">
    <Note {...props} />
  </Provider>
)
