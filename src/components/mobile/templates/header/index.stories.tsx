import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'

import { MainHeader, Props } from '.'

export default {
  title: `/mobile/${MainHeader.name}`,
  component: MainHeader,
} as Meta

const Template: Story<Props> = (args) => <MainHeader {...args} />

const props: Props = {
  version: '0.1.0',
  isHome: false,
  isDisabledDownLoad: false,
  isDisabledShare: false,
  onClickSettings: () => {
    'clicked'
  },
  onClickDownLoad: () => {
    'clicked'
  },
  onClickShare: () => {
    'clicked'
  },
}

export const Component = Template.bind({})
Component.args = props
