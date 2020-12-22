import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'

import { Nav, Props } from '.'

export default {
  title: `/mobile/${Nav.name}`,
  component: Nav,
} as Meta

const Template: Story<Props> = (args) => <Nav {...args} />

const props: Props = {
  version: '0.1.0',
  locale: 'ja',
}

export const Component = Template.bind({})
Component.args = props
