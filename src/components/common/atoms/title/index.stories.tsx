import { Provider } from '@adobe/react-spectrum'
import { Meta, Story } from '@storybook/react/types-6-0'
import base from 'paths.macro'
import React from 'react'
import { generateTitle } from '../../../../test/utils'
import { Title, Props } from '.'

const props: Props = {
  text: 'title',
}

export default {
  title: generateTitle(base, true),
  component: Title,
  includeStories: /.*Story$/,
} as Meta

const Template: Story<Props> = (args) => <Title {...args} />

export const DefaultStory = Template.bind({})
DefaultStory.args = props

export const DarkModeStory = (): JSX.Element => (
  <Provider colorScheme="dark">
    <Title {...props} />
  </Provider>
)

export const LightModeStory = (): JSX.Element => (
  <Provider colorScheme="light">
    <Title {...props} />
  </Provider>
)
