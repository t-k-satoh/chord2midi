import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'

import { Setting, Props } from '.'

export default {
  title: `/common/${Setting.name}`,
  component: Setting,
} as Meta

const Template: Story<Props> = (args) => <Setting {...args} />

const props: Props = {
  isBrowser: true,
  isLoading: true,
  onLaunch: () => {
    console.log('onLaunch')
  },
}

export const Component = Template.bind({})
Component.args = props
