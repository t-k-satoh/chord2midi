import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'

import { HowToUse, Props } from '.'

export default {
  title: `/common/${HowToUse.name}`,
  component: HowToUse,
} as Meta

const Template: Story<Props> = (args) => <HowToUse {...args} />

const props: Props = {
  isBrowser: true,
  isLoading: true,
  onLaunch: () => {
    console.log('onLaunch')
  },
}

export const Component = Template.bind({})
Component.args = props
