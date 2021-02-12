import { Provider } from '@adobe/react-spectrum'
import { Meta, Story } from '@storybook/react/types-6-0'
import base from 'paths.macro'
import React from 'react'
import { generateTitle } from '../../../../test/utils'
import { Nav, Props } from '.'

const props: Props = {
  locale: 'ja',
  query: {},
  isHome: true,
  version: '1.0.0',
  isDarkMode: false,
}

export default {
  title: generateTitle(base, true),
  component: Nav,
  includeStories: /.*Story$/,
} as Meta

const Template: Story<Props> = (args) => <Nav {...args} />

export const DefaultStory = Template.bind({})
DefaultStory.args = props

export const DarkModeStory = (): JSX.Element => (
  <Provider colorScheme="dark">
    <Nav {...props} />
  </Provider>
)

export const LightModeStory = (): JSX.Element => (
  <Provider colorScheme="light">
    <Nav {...props} />
  </Provider>
)
