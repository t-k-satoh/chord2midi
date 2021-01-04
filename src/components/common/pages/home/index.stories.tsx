import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'

import { Home, Props } from '.'

export default {
  title: `/common/${Home.name}`,
  component: Home,
} as Meta

const Template: Story<Props> = (args) => <Home {...args} />

const props: Props = {
  isBrowser: true,
  isLoading: true,
  onLaunch: () => {
    console.log('onLaunch')
  },
}

export const Component = Template.bind({})
Component.args = props
